import React, { useState, useRef, useEffect, useCallback } from 'react'
import { Button, Modal, Form, Icon } from 'semantic-ui-react'
import axios from 'axios';

function EditProduct(props) {
    const { open, openModal, fetchData, product } = props;
    const productRef = useRef(product)
    const [editedName, setName] = useCallback(useState(""));
    const [editedPrice, setPrice] = useCallback(useState(""));

    useEffect(() => {
        if (productRef.current !== product) {
            productRef.current = product;
            setName(product?.name);
            setPrice(product?.price);
        }
    })

    const editProduct = () => {
        const { id } = product;
        axios.put(`Products/PutProduct/${id}`, {
            id: id,
            name: editedName,
            price: editedPrice
        }).then(res => {
            openModal(false);
            setName("");
            setPrice("");
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
            <Modal.Header>Edit product</Modal.Header>
            <Modal.Content>
                <Modal.Description>
                    <Form>
                        <Form.Field>
                            <label>NAME</label>
                            <input onBlur={(e) => setName(e.target.value)} defaultValue={product?.name}></input>
                        </Form.Field>
                        <Form.Field>
                            <label>Price</label>
                            <input onBlur={(e) => setPrice(e.target.value)} defaultValue={product?.price}></input>
                        </Form.Field>
                    </Form>
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button color='black' onClick={() => openModal(false)}>
                    Cancel
                </Button>
                <Button icon labelPosition='right' color="green" onClick={editProduct}>
                    Edit
                    <Icon name='check' />
                </Button>
            </Modal.Actions>
        </Modal>
    )
}

export default EditProduct