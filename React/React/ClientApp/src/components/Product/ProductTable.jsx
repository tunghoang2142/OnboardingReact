import React, { useState, useReducer, useEffect, useRef } from 'react'
import { Table, Button, Icon } from 'semantic-ui-react'
import EditProduct from './EditProduct';
import DeleteModal from '../Common/DeleteModal';
import _ from 'lodash'

const ProductTable = (props) => {
    const { products, fetchProduct } = props;
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [product, setProduct] = useState(undefined);
    const productsRef = useRef(undefined)

    useEffect(() => {
        if (typeof products !== 'undefined' && products.length > 0 && !_.isEqual(productsRef.current, products)) {
            productsRef.current = [...products]
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
            data: products
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
            <EditProduct open={openEdit} openModal={openEditModal} fetchData={fetchProduct} product={product} />
            <DeleteModal open={openDelete} openModal={openDeleteModal} fetchData={fetchProduct}
                url={`Products/DeleteProduct/${product?.id}`} title={"Delete product"} />
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell
                        sorted={column === 'name' ? direction : null}
                        onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'name' })}
                    >Name</Table.HeaderCell>
                    <Table.HeaderCell
                        sorted={column === 'price' ? direction : null}
                        onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'price' })}
                    >Price</Table.HeaderCell>
                    <Table.HeaderCell>Action</Table.HeaderCell>
                    <Table.HeaderCell>Action</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {data.map((e) => {
                    const { id, name, price } = e;

                    return (
                        <Table.Row key={id}>
                            <Table.Cell>{name}</Table.Cell>
                            <Table.Cell>{price}</Table.Cell>
                            <Table.Cell>
                                <Button icon labelPosition='left' color="blue" onClick={() => {
                                    setProduct(e);
                                    openEditModal(true);
                                }}>
                                    Edit
                                    <Icon name='edit' />
                                </Button>
                            </Table.Cell>
                            <Table.Cell>
                                <Button icon labelPosition='left' color="red" onClick={() => {
                                    setProduct(e);
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

export default ProductTable