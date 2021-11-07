import React, { Component } from 'react';
import axios from 'axios';
import { Button } from 'semantic-ui-react'
import ProductTable from './ProductTable';
import CreateProduct from './CreateProduct';

export default class ProductHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            open: false
        };
    }

    componentDidMount() {
        this.fetchProduct();
    }

    fetchProduct = () => {
        axios
            .get("Products/GetProduct")
            .then(({ data }) => {
                this.setState({
                    products: data
                })
            })
            .catch(error => {
                if (error.response.headers['content-type'] === 'text/plain') {
                    console.log(error.response.data);
                    alert(error.response.data);
                } else
                if (error.response) {
                    console.log(error)
                    console.log(error.response)
                    Object.values(error.response.data.errors).forEach(e => {
                        console.log(e)
                        alert(e)
                    });
                } else {
                    console.log('Error', error.message);
                }
            });
    }

    openCreateModal = (value) => {
        this.setState({
            open: value
        })
    }

    render() {
        const { products, open } = this.state;
        return (
            <div>
                <Button color="blue" onClick={() => this.openCreateModal(true)}>New Product</Button>
                <CreateProduct open={open} openCreateModal={this.openCreateModal} fetchProduct={this.fetchProduct} />
                <ProductTable products={products} fetchProduct={this.fetchProduct}/>
            </div>
        )
    }
}

