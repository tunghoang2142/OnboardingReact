import React, { useState, useEffect, useRef, useReducer } from 'react'
import { Table, Button, Icon } from 'semantic-ui-react'
import EditSale from './EditSale';
import DeleteModal from '../Common/DeleteModal';
import { GetProduct, GetCustomer, GetStore } from '../Common/CommonFunction';
import moment from 'moment';
import _ from 'lodash'

const SalesTable = (props) => {
    const { sales, fetchSales } = props;
    const salesRef = useRef(undefined)
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [sale, setSale] = useState(undefined);
    const [salesInfo, setSalesInfo] = useState([])

    useEffect(() => {
        if (typeof sales !== 'undefined' && sales.length > 0 && !_.isEqual(salesRef.current, sales)) {
            salesRef.current = [...sales]
            getSalesInfo()
            dispatch({ type: 'INIT' })
        }
    })

    const openEditModal = (value) => {
        setOpenEdit(value)
    }

    const openDeleteModal = (value) => {
        setOpenDelete(value)
    }

    const getSalesInfo = () => {
        salesInfo.length = 0
        sales.map(async (e) => {
            const { id, productId, customerId, storeId, dateSold } = e;
            let product, customer, store;

            await GetProduct(productId).then(data => {
                product = data
            }).catch(() => {
                product = undefined
            })

            await GetCustomer(customerId).then(data => {
                customer = data
            }).catch(() => {
                customer = undefined
            })

            await GetStore(storeId).then(data => {
                store = data
            }).catch(() => {
                store = undefined
            })
            e.productName = product.name
            e.customerName = customer.name
            salesInfo.push({
                id, product, customer, store, dateSold
            })
            setSalesInfo([...salesInfo])
        })
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
                switch (action.column) {
                    case 'customer': {
                        return {
                            column: action.column,
                            data: _.sortBy(state.data, (obj) => { return obj.customer.name }),
                            direction: 'ascending',
                        }
                    }
                    case 'product': {
                        return {
                            column: action.column,
                            data: _.sortBy(state.data, (obj) => { return obj.product.name }),
                            direction: 'ascending',
                        }
                    }
                    case 'store': {
                        return {
                            column: action.column,
                            data: _.sortBy(state.data, (obj) => { return obj.store.name }),
                            direction: 'ascending',
                        }
                    }
                    case 'date': {
                        return {
                            column: action.column,
                            data: _.sortBy(state.data, (obj) => { return new Date(obj.dateSold); }),
                            direction: 'ascending',
                        }
                    }
                    default: {
                        return {
                            column: action.column,
                            data: _.sortBy(state.data, [action.column]),
                            direction: 'ascending',
                        }
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
            data: salesInfo
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
            <EditSale open={openEdit} openModal={openEditModal} fetchData={fetchSales} sale={sale} />
            <DeleteModal open={openDelete} openModal={openDeleteModal} fetchData={fetchSales}
                url={`Sales/DeleteSales/${sale?.id}`} title={"Delete sale"} />
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell
                        sorted={column === 'customer' ? direction : null}
                        onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'customer' })}
                    >Customer</Table.HeaderCell>
                    <Table.HeaderCell
                        sorted={column === 'product' ? direction : null}
                        onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'product' })}
                    >Product</Table.HeaderCell>
                    <Table.HeaderCell
                        sorted={column === 'store' ? direction : null}
                        onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'store' })}
                    >Store</Table.HeaderCell>
                    <Table.HeaderCell
                        sorted={column === 'date' ? direction : null}
                        onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'date' })}
                    >Date Sold</Table.HeaderCell>
                    <Table.HeaderCell>Action</Table.HeaderCell>
                    <Table.HeaderCell>Action</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {data.map((e) => {
                    const { id, product, customer, store, dateSold } = e;
                    return (
                        <Table.Row key={id}>
                            <Table.Cell>{customer?.name}</Table.Cell>
                            <Table.Cell>{product?.name}</Table.Cell>
                            <Table.Cell>{store?.name}</Table.Cell>
                            <Table.Cell>{moment(dateSold).format("DD MMM YYYY")}</Table.Cell>
                            <Table.Cell>
                                <Button icon labelPosition='left' color="blue" onClick={() => {
                                    setSale(e);
                                    openEditModal(true);
                                }}>
                                    Edit
                                    <Icon name='edit' />
                                </Button>
                            </Table.Cell>
                            <Table.Cell>
                                <Button icon labelPosition='left' color="red" onClick={() => {
                                    setSale(e);
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

export default SalesTable