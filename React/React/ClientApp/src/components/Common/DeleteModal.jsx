import React from 'react'
import { Button, Header, Modal, Icon } from 'semantic-ui-react'
import axios from 'axios';

function DeleteModal(props) {
    const { open, openModal, fetchData, url, title } = props;

    const deleteEntity = () => {
        axios.delete(url)
            .then(({ data }) => {
                fetchData()
                alert(data)
            })
            .catch(error => {
                console.error(error.response);
                alert(error.response.data)
            })
    }

    return (
        <Modal size="tiny" open={open}>
            <Modal.Header>{title ? title : "Delete"}</Modal.Header>
            <Modal.Content>
                <Modal.Description>
                    <Header>Are you sure?</Header>
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button color='black' onClick={() => openModal(false)}>
                    Cancel
                </Button>
                <Button icon labelPosition='right' color="red" onClick={() => {
                    deleteEntity();
                    openModal(false)
                }}>
                    Delete
                    <Icon name='delete' />
                </Button>
            </Modal.Actions>
        </Modal>
    )
}

export default DeleteModal