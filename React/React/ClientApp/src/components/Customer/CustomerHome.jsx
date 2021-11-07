import React, { Component } from 'react';
import axios from 'axios';
import { Button } from 'semantic-ui-react'
import CustomerTable from './CustomerTable';
import CreateCustomer from './CreateCustomer';

export default class CustomerHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customers: [],
            open: false,
            entryCount: 5
        };
    }

    componentDidMount() {
        this.fetchCustomer();
    }

    fetchCustomer = () => {
        axios
            .get("Customers/GetCustomer")
            .then(({ data }) => {
                this.setState({
                    customers: data
                })
            })
            .catch(error => {
                console.log(error.response)
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
        const { customers, open, entryCount } = this.state;
        if (typeof customers !== 'undefined') {
            return (
                <div>
                    <Button color="blue" onClick={() => this.openCreateModal(true)}>New Customer</Button>
                    <CreateCustomer open={open} openCreateModal={this.openCreateModal} fetchCustomer={this.fetchCustomer} />
                    <CustomerTable customers={customers} fetchCustomer={this.fetchCustomer} entryCount={entryCount} />
                </div>
            )
        } else return (<div>Loading....</div>)

    }
}

