import React, { Component } from 'react';
import axios from 'axios';
import { Button } from 'semantic-ui-react'
import StoreTable from './StoreTable';
import CreateStore from './CreateStore';

export default class StoreHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stores: [],
            open: false
        };
    }

    componentDidMount() {
        this.fetchStore();
    }

    fetchStore = () => {
        axios
            .get("Stores/GetStore")
            .then(({ data }) => {
                this.setState({
                    stores: data
                })
            })
            .catch(error => {
                if (error.response.headers['content-type'] === 'text/plain') {
                    console.log(error.response.data);
                    alert(error.response.data);
                }
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
        const { stores, open } = this.state;
        return (
            <div>
                <h1>Store</h1>
                <Button color="blue" onClick={() => this.openCreateModal(true)}>New Store</Button>
                <CreateStore open={open} openCreateModal={this.openCreateModal} fetchStore={this.fetchStore} />
                <StoreTable stores={stores} fetchStore={this.fetchStore}/>
            </div>
        )
    }
}

