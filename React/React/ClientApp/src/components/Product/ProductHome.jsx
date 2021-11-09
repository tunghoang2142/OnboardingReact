import React, { Component } from 'react';
import axios from 'axios';
import { Button, Select } from 'semantic-ui-react'
import ProductTable from './ProductTable';
import CreateProduct from './CreateProduct';
import TablePagination from '../Common/TablePagination';

export default class ProductHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            results: [],
            open: false,
            entryCount: 5,
            activePage: 0
        };
        this.pageChangeHandle = this.pageChangeHandle.bind(this)
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
                }, () => { this.setActivePage(1) })
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

    pageChangeHandle(e, { activePage }) {
        const { results, entryCount, products } = this.state
        results.length = 0
        for (let i = 0; i < entryCount; i++) {
            let index = (activePage - 1) * entryCount + i
            if (typeof products[index] !== 'undefined') {
                results.push(products[index])
            } else {
                break
            }

        }
        this.setState({
            results: results,
            activePage: activePage
        })
    }

    setActivePage(activePage) {
        this.pageChangeHandle(undefined, { activePage: activePage })
    }

    render() {
        const { products, open, results, entryCount, activePage } = this.state;
        return (
            <div>
                <Button color="blue" onClick={() => this.openCreateModal(true)}>New Product</Button>
                <CreateProduct open={open} openCreateModal={this.openCreateModal} fetchProduct={this.fetchProduct} />
                <ProductTable products={results} fetchProduct={this.fetchProduct} />
                <Select defaultValue={entryCount} onChange={(_e, data) => {
                    this.setState({
                        entryCount: data.value
                    }, () => { this.setActivePage(1) })
                }} options={[{ value: 1, text: '1' }, { value: 5, text: '5' }, { value: 10, text: '10' }]} />
                <TablePagination pageChangeHandle={this.pageChangeHandle} totalPages={
                    Math.ceil(products.length / entryCount)} activePage={activePage} />
            </div>
        )
    }
}

