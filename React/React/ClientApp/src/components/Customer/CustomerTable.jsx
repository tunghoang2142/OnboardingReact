import React, { useState, useReducer, useEffect, useRef } from 'react'
import { Table, Button, Icon } from 'semantic-ui-react'
import EditCustomer from './EditCustomer';
import DeleteModal from '../Common/DeleteModal';
import _ from 'lodash'

const CustomerTable = (props) => {
    const { customers, fetchCustomer } = props;
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [customer, setCustomer] = useState(undefined);
    const customersRef = useRef(undefined)

    console.log(customers)
    useEffect(() => {
        if (typeof customers !== 'undefined' && customers.length > 0 && !_.isEqual(customersRef.current, customers)) {
            customersRef.current = [...customers]
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
            data: customers
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
            <EditCustomer open={openEdit} openModal={openEditModal} fetchData={fetchCustomer} customer={customer} />
            <DeleteModal open={openDelete} openModal={openDeleteModal} fetchData={fetchCustomer}
                url={`Customers/DeleteCustomer/${customer?.id}`} title={"Delete customer"} />
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
                    // {customers.map((e) => {
                    const { id, name, address } = e;

                    return (
                        <Table.Row key={id}>
                            <Table.Cell>{name}</Table.Cell>
                            <Table.Cell>{address}</Table.Cell>
                            <Table.Cell>
                                <Button icon labelPosition='left' color="blue" onClick={() => {
                                    setCustomer(e);
                                    openEditModal(true);
                                }}>
                                    Edit
                                    <Icon name='edit' />
                                </Button>
                            </Table.Cell>
                            <Table.Cell>
                                <Button icon labelPosition='left' color="red" onClick={() => {
                                    setCustomer(e);
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

export default CustomerTable