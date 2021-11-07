import React, { useState } from 'react'
import { Button, Modal, Form, Icon } from 'semantic-ui-react'
import axios from 'axios';

function CreateStore(props) {
    const { open, openCreateModal, fetchStore } = props;
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");

    const createStore = () => {
        axios.post("Stores/PostStore", {
            name: name,
            address: address
        }).then(res => {
            openCreateModal(false);
            setName("");
            setAddress("");
            fetchStore();
        }).catch(error => {
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

    return (
        <Modal size="tiny" open={open}>
            <Modal.Header>Create store</Modal.Header>
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
                <Button icon labelPosition='right' color="green" onClick={createStore}>
                    Create
                    <Icon name='check' />
                </Button>

            </Modal.Actions>
        </Modal>
    )
}

export default CreateStore