import React, { useState, useEffect, useRef } from 'react'
import { Table, Button, Icon } from 'semantic-ui-react'
import EditSale from './EditSale';
import DeleteModal from '../Common/DeleteModal';
import { GetProduct, GetCustomer, GetStore } from '../Common/CommonFunction';
import moment from 'moment';

const SalesTable = (props) => {
    const { sales, fetchSales } = props;
    const salesRef = useRef(undefined)
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [sale, setSale] = useState(undefined);
    const [data, setData] = useState([])

    useEffect(() => {
        if (typeof sales !== undefined && sales.length > 0 && salesRef.current !== sales) {
            console.log(sales)
            salesRef.current = sales
            getData()
        }
    })

    const openEditModal = (value) => {
        setOpenEdit(value)
    }

    const openDeleteModal = (value) => {
        setOpenDelete(value)
    }

    const getData = () => {
        data.length = 0
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
            data.push({ id, product, customer, store, dateSold })
            setData([...data])
        })
    }

    return (
        <Table celled striped>
            <EditSale open={openEdit} openModal={openEditModal} fetchData={fetchSales} sale={sale} />
            <DeleteModal open={openDelete} openModal={openDeleteModal} fetchData={fetchSales}
                url={`Sales/DeleteSales/${sale?.id}`} title={"Delete sale"} />
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Customer</Table.HeaderCell>
                    <Table.HeaderCell>Product</Table.HeaderCell>
                    <Table.HeaderCell>Store</Table.HeaderCell>
                    <Table.HeaderCell>Date Sold</Table.HeaderCell>
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

export default SalesTable