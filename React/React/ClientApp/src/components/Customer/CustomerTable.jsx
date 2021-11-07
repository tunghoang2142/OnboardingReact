import React, { useState, useReducer, useRef } from 'react'
import { Table, Button, Icon, Menu, Select } from 'semantic-ui-react'
import EditCustomer from './EditCustomer';
import DeleteModal from '../Common/DeleteModal';
import TablePagination from '../Common/TablePagination';
import _ from 'lodash'

const CustomerTable = (props) => {
    const { customers, fetchCustomer, entryCount } = props;
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [customer, setCustomer] = useState(undefined);
    const customersRef = useRef(customers)

    console.log(customers)
    const openEditModal = (value) => {
        setOpenEdit(value)
    }

    const openDeleteModal = (value) => {
        setOpenDelete(value)
    }

    function sortReducer(state, action) {
        switch (action.type) {
            case 'CHANGE_SORT':
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
            default:
                throw new Error()
        }
    }

    const initSort = () => {
        return {
            data: customers
        }
    }

    if (customersRef.current !== customers) {
        customersRef.current = customers
        initSort()
    }

    const sortReducerRef = useReducer(sortReducer, {
        column: null,
        data: null,
        direction: null,
    }, initSort)

    const [state, dispatch] = sortReducerRef
    const { column, data, direction } = state

    function pageChangeHandle(e, { activePage }) {
        console.log(activePage)
    }

    // console.log(sortReducerRef)

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
                        sorted={column === 'name' ? direction : null}
                        onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'name' })}
                    >Address</Table.HeaderCell>
                    <Table.HeaderCell>Action</Table.HeaderCell>
                    <Table.HeaderCell>Action</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {/* {data.map((e) => { */}
                {customers.map((e) => {
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
            <Table.Footer>
                {/* <Select defaultValue='5' onChange={(_e, data) => {
                    this.setState({
                        entryCount: data.value
                    })
                }} options={[{ value: 1, text: '1' }, { value: 5, text: '5' }, { value: 10, text: '10' }]} /> */}
                {/* <TablePagination pageChangeHandle={pageChangeHandle} /> */}
            </Table.Footer>
        </Table>
    )
}

export default CustomerTable