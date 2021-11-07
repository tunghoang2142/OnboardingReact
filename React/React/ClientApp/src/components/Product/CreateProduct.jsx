import React, { useState } from 'react'
import { Button, Modal, Form, Icon } from 'semantic-ui-react'
import axios from 'axios';

function CreateProduct(props) {
    const { open, openCreateModal, fetchProduct } = props;
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");

    const createProduct = () => {
        axios.post("Products/PostProduct", {
            name: name,
            price: price
        }).then(res => {
            openCreateModal(false);
            setName("");
            setPrice("");
            fetchProduct();
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
            <Modal.Header>Create product</Modal.Header>
            <Modal.Content>
                <Modal.Description>
                    <Form>
                        <Form.Field>
                            <label>NAME</label>
                            <input onBlur={(e) => setName(e.target.value)} />
                        </Form.Field>
                        <Form.Field>
                            <label>Price</label>
                            <input onBlur={(e) => setPrice(e.target.value)} />
                        </Form.Field>
                    </Form>
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button color='black' onClick={() => openCreateModal(false)}>
                    Cancel
                </Button>
                <Button icon labelPosition='right' color="green" onClick={createProduct}>
                    Create
                    <Icon name='check' />
                </Button>

            </Modal.Actions>
        </Modal>
    )
}

export default CreateProduct