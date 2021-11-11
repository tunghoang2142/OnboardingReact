import React, { useState, useReducer, useEffect, useRef } from 'react'
import { Table, Button, Icon } from 'semantic-ui-react'
import EditStore from './EditStore';
import DeleteModal from '../Common/DeleteModal';
import _ from 'lodash'

const StoreTable = (props) => {
    const { stores, fetchStore } = props;
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [store, setStore] = useState(undefined);
    const storesRef = useRef(undefined)

    useEffect(() => {
        if (typeof stores !== 'undefined' && stores.length > 0 && !_.isEqual(storesRef.current, stores)) {
            storesRef.current = [...stores]
            dispatch({ type: 'INIT' })
        }
    })

    const openEditModal = (value) => {
        setOpenEdit(value)
    }

    const openDeleteModal = (value) => {
        setOpenDelete(value)
    }

    function sortReducer(state, action) {
        switch (action.type) {
            case 'CHANGE_SORT': {
                if (state.column === action.column) {
                    return {
                        ...state,
                        data: state.data.slice().reverse(),
                        direction:
                            state.direction === 'ascending' ? 'descending' : 'ascending',
                    }
                }

                return {
                    column: action.column,
                    data: _.sortBy(state.data, [action.column]),
                    direction: 'ascending',
                }
            }
            case 'INIT': {
                return initSort()
            }
            default:
                throw new Error()
        }
    }

    const initSort = () => {
        return {
            data: stores
        }
    }

    const sortReducerRef = useReducer(sortReducer, {
        column: null,
        data: null,
        direction: null,
    }, initSort)

    const [state, dispatch] = sortReducerRef
    const { column, data, direction } = state

    return (
        <Table sortable celled striped fixed>
            <EditStore open={openEdit} openModal={openEditModal} fetchData={fetchStore} store={store} />
            <DeleteModal open={openDelete} openModal={openDeleteModal} fetchData={fetchStore}
                url={`Stores/DeleteStore/${store?.id}`} title={"Delete store"} />
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell
                        sorted={column === 'name' ? direction : null}
                        onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'name' })}
                    >Name</Table.HeaderCell>
                    <Table.HeaderCell
                        sorted={column === 'address' ? direction : null}
                        onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'address' })}
                    >Address</Table.HeaderCell>
                    <Table.HeaderCell>Action</Table.HeaderCell>
                    <Table.HeaderCell>Action</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {data.map((e) => {
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
        </Table>
    )
}

export default StoreTable