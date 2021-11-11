import React, { Component } from 'react';
import axios from 'axios';
import { Button, Select } from 'semantic-ui-react'
import CustomerTable from './CustomerTable';
import CreateCustomer from './CreateCustomer';
import TablePagination from '../Common/TablePagination';

export default class CustomerHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customers: [],
            results: [],
            open: false,
            entryCount: 5,
            activePage: 0
        };
        this.pageChangeHandle = this.pageChangeHandle.bind(this)
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
                }, () => {
                    this.setActivePage(1)
                    console.log(data)
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

    pageChangeHandle(e, { activePage }) {
        const { results, entryCount, customers } = this.state
        results.length = 0
        for (let i = 0; i < entryCount; i++) {
            let index = (activePage - 1) * entryCount + i
            if (typeof customers[index] !== 'undefined') {
                results.push(customers[index])
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
        const { open, results, entryCount, customers, activePage } = this.state;

        if (typeof customers !== 'undefined') {
            return (
                <div>
                    <Button color="blue" onClick={() => this.openCreateModal(true)}>New Customer</Button>
                    <CreateCustomer open={open} openCreateModal={this.openCreateModal} fetchCustomer={this.fetchCustomer} />
                    <CustomerTable customers={results} fetchCustomer={this.fetchCustomer} entryCount={entryCount} />
                    <Select defaultValue={entryCount} onChange={(_e, data) => {
                        this.setState({
                            entryCount: data.value
                        }, () => { this.setActivePage(1) })
                    }} options={[{ value: 1, text: '1' }, { value: 5, text: '5' }, { value: 10, text: '10' }]} />
                    <TablePagination pageChangeHandle={this.pageChangeHandle} totalPages={
                        Math.ceil(customers.length / entryCount)} activePage={activePage} />
                </div>
            )
        } else return (<div>Loading....</div>)

    }
}

