import React, { useState } from 'react'
import { Table, Button, Icon } from 'semantic-ui-react'
import EditStore from './EditStore';
import DeleteModal from '../Common/DeleteModal';

const StoreTable = (props) => {
    const { stores, fetchStore } = props;
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [store, setStore] = useState(undefined);

    const openEditModal = (value) => {
        setOpenEdit(value)
    }

    const openDeleteModal = (value) => {
        setOpenDelete(value)
    }

    return (
        <Table celled striped>
            <EditStore open={openEdit} openModal={openEditModal} fetchData={fetchStore} store={store} />
            <DeleteModal open={openDelete} openModal={openDeleteModal} fetchData={fetchStore}
                url={`Stores/DeleteStore/${store?.id}`} title={"Delete store"} />
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Address</Table.HeaderCell>
                    <Table.HeaderCell>Action</Table.HeaderCell>
                    <Table.HeaderCell>Action</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {stores.map((e) => {
                    const { id, name, address } = e;

                    return (
                        <Table.Row key={id}>
                            <Table.Cell>{name}</Table.Cell>
                            <Table.Cell>{address}</Table.Cell>
                            <Table.Cell>
                                <Button icon labelPosition='left' color="blue" onClick={() => {
                                    setStore(e);
                                    openEditModal(true);
                                }}>
                                    Edit
                                    <Icon name='edit' />
                                </Button>
                            </Table.Cell>
                            <Table.Cell>
                                <Button icon labelPosition='left' color="red" onClick={() => {
                                    setStore(e);
                                    openDeleteModal(true);
                                }}>
                                    Delete
                                    <Icon name='trash alternate outline' />
                                </Button>
                            </Table.Cell>
                        </Table.Row>
                    )
                })}
            </Table.Body>

            {/* <Table.Footer>
                <Table.Row>
                    <Table.HeaderCell colSpan='3'>
                        <Menu floated='right' pagination>
                            <Menu.Item as='a' icon>
                                <Icon name='chevron left' />
                            </Menu.Item>
                            <Menu.Item as='a'>1</Menu.Item>
                            <Menu.Item as='a'>2</Menu.Item>
                            <Menu.Item as='a'>3</Menu.Item>
                            <Menu.Item as='a'>4</Menu.Item>
                            <Menu.Item as='a' icon>
                                <Icon name='chevron right' />
                            </Menu.Item>
                        </Menu>
                    </Table.HeaderCell>
                </Table.Row>
            </Table.Footer> */}
        </Table>
    )
}

export default StoreTable