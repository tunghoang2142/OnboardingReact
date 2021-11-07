import React, { useState } from 'react'
import { Button, Modal, Form, Icon } from 'semantic-ui-react'
import axios from 'axios';

function CreateCustomer(props) {
    const { open, openCreateModal, fetchCustomer } = props;
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");

    const createCustomer = () => {
        axios.post("Customers/PostCustomer", {
            name: name,
            address: address
        }).then(res => {
            openCreateModal(false);
            setName("");
            setAddress("");
            fetchCustomer();
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
            <Modal.Header>Create customer</Modal.Header>
            <Modal.Content>
                <Modal.Description>
                    <Form>
                        <Form.Field>
                            <label>NAME</label>
                            <input onBlur={(e) => setName(e.target.value)} />
                        </Form.Field>
                        <Form.Field>
                            <label>ADDRESS</label>
                            <input onBlur={(e) => setAddress(e.target.value)} />
                        </Form.Field>
                    </Form>
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button color='black' onClick={() => openCreateModal(false)}>
                    Cancel
                </Button>
                <Button icon labelPosition='right' color="green" onClick={createCustomer}>
                    Create
                    <Icon name='check' />
                </Button>

            </Modal.Actions>
        </Modal>
    )
}

export default CreateCustomer