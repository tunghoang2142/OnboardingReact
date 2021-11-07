import React, { useState, useRef, useEffect, useCallback } from 'react'
import { Button, Modal, Form, Icon } from 'semantic-ui-react'
import axios from 'axios';

function EditStore(props) {
    const { open, openModal, fetchData, store } = props;
    const storeRef = useRef(store)
    const [editedName, setName] = useCallback(useState(""));
    const [editedAddress, setAddress] = useCallback(useState(""));

    useEffect(() => {
        if (storeRef.current !== store) {
            storeRef.current = store;
            setName(store?.name);
            setAddress(store?.address);
        }
    })

    const editStore = () => {
        const { id } = store;
        axios.put(`Stores/PutStore/${id}`, {
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
            <Modal.Header>Edit store</Modal.Header>
            <Modal.Content>
                <Modal.Description>
                    <Form>
                        <Form.Field>
                            <label>NAME</label>
                            <input onBlur={(e) => setName(e.target.value)} defaultValue={store?.name}></input>
                        </Form.Field>
                        <Form.Field>
                            <label>ADDRESS</label>
                            <input onBlur={(e) => setAddress(e.target.value)} defaultValue={store?.address}></input>
                        </Form.Field>
                    </Form>
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button color='black' onClick={() => openModal(false)}>
                    Cancel
                </Button>
                <Button icon labelPosition='right' color="green" onClick={editStore}>
                    Edit
                    <Icon name='check' />
                </Button>
            </Modal.Actions>
        </Modal>
    )
}

export default EditStore