import React, { useState, useRef, useEffect, useCallback } from 'react'
import { Button, Modal, Form, Icon } from 'semantic-ui-react'
import axios from 'axios';

function EditCustomer(props) {
    const { open, openModal, fetchData, customer } = props;
    const customerRef = useRef(customer)
    const [editedName, setName] = useCallback(useState(""));
    const [editedAddress, setAddress] = useCallback(useState(""));

    useEffect(() => {
        if (customerRef.current !== customer) {
            customerRef.current = customer;
            setName(customer?.name);
            setAddress(customer?.address);
        }
    })

    const editCustomer = () => {
        const { id } = customer;
        axios.put(`Customers/PutCustomer/${id}`, {
            id: id,
            name: editedName,
            address: editedAddress
        }).then(res => {
            openModal(false);
            setName("");
            setAddress("");
            fetchData();
        }).catch(error => {
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
    return (
        <Modal size="tiny" open={open}>
            <Modal.Header>Edit customer</Modal.Header>
            <Modal.Content>
                <Modal.Description>
                    <Form>
                        <Form.Field>
                            <label>NAME</label>
                            <input onBlur={(e) => setName(e.target.value)} defaultValue={customer?.name}></input>
                        </Form.Field>
                        <Form.Field>
                            <label>ADDRESS</label>
                            <input onBlur={(e) => setAddress(e.target.value)} defaultValue={customer?.address}></input>
                        </Form.Field>
                    </Form>
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button color='black' onClick={() => openModal(false)}>
                    Cancel
                </Button>
                <Button icon labelPosition='right' color="green" onClick={editCustomer}>
                    Edit
                    <Icon name='check' />
                </Button>
            </Modal.Actions>
        </Modal>
    )
}

export default EditCustomer