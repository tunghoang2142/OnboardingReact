import React, { Component } from 'react';
import axios from 'axios';
import { Button } from 'semantic-ui-react'
import SalesTable from './SalesTable';
import CreateSale from './CreateSale';

export default class SalesHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sales: [],
            open: false
        };
    }

    componentDidMount() {
        this.fetchSales();
    }

    fetchSales = () => {
        axios
            .get("Sales/GetSales")
            .then(({ data }) => {
                this.setState({
                    sales: data
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
        const { sales, open } = this.state;
        return (
            <div>
                <Button color="blue" onClick={() => this.openCreateModal(true)}>New Sale</Button>
                <CreateSale open={open} openCreateModal={this.openCreateModal} fetchSales={this.fetchSales} />
                <SalesTable sales={sales} fetchSales={this.fetchSales}/>
            </div>
        )
    }
}

