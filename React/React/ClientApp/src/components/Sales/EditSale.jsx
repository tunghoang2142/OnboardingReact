import React, { useState, useRef, useEffect } from 'react'
import { Button, Modal, Form, Icon, Select } from 'semantic-ui-react'
import axios from 'axios';
import { GetProducts, GetCustomers, GetStores } from '../Common/CommonFunction'
import moment from 'moment';

function EditSale(props) {
    const { open, openModal, fetchData, sale } = props;
    const saleRef = useRef(sale)
    const [customers, setCustomers] = useState(undefined);
    const [customer, setCustomer] = useState("");
    const [products, setProducts] = useState(undefined);
    const [product, setProduct] = useState("");
    const [stores, setStores] = useState(undefined);
    const [store, setStore] = useState("");
    const [dateSold, setDateSold] = useState("");

    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        if (saleRef.current !== sale) {
            saleRef.current = sale;
            setCustomer(sale?.customer?.id)
            setProduct(sale?.product?.id)
            setStore(sale?.store?.id)
            setDateSold(sale?.dateSold)
        }
    })

    const editProduct = () => {
        const { id } = sale;
        axios.put(`Sales/PutSales/${id}`, {
            id: id,
            productId: product,
            customerId: customer,
            storeId: store,
            dateSold: new Date(moment(dateSold, "MM/DD/YYYY").format("YYYY-MM-DD"))
        }).then(() => {
            openModal(false);
            setCustomer(undefined)
            setProduct(undefined)
            setStore(undefined)
            setDateSold(undefined)
            fetchData();
        }).catch(error => {
            if (error.response.headers['content-type'] === 'text/plain') {
                console.log(error.response.data);
                alert(error.response.data);
            } else
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

    const getData = () => {
        GetProducts().then(data => {
            setProducts(data)
        }).catch(() => {
            setProducts(undefined)
        })

        GetCustomers().then(data => {
            setCustomers(data)
        }).catch(() => {
            setCustomers(undefined)
        })

        GetStores().then(data => {
            setStores(data)
        }).catch(() => {
            setStores(undefined)
        })
    }

    const customerOption = () => {
        if (typeof customers === 'undefined') return undefined
        return customers.map(e => {
            return { key: e.id, value: e.id, text: e.name }
        })
    }

    const productOption = () => {
        if (typeof products === 'undefined') return undefined
        return products.map(e => {
            return { key: e.id, value: e.id, text: e.name }
        })
    }

    const storeOption = () => {
        if (typeof stores === 'undefined') return undefined
        return stores.map(e => {
            return { key: e.id, value: e.id, text: e.name }
        })
    }

    return (
        <Modal size="tiny" open={open}>
            <Modal.Header>Edit product</Modal.Header>
            <Modal.Content>
                <Modal.Description>
                    <Form>
                        <Form.Field>
                            <label>Date sold</label>
                            <input onBlur={(e) => setDateSold(e.target.value)} defaultValue={moment(sale?.dateSold).format("MM/DD/YYYY")} />
                        </Form.Field>
                        <Form.Field>
                            <label>Customer</label>
                            <Select placeholder={sale?.customer.name} onChange={(_e, data) => {
                                setCustomer(data.value)
                            }} options={customerOption()} />
                        </Form.Field>
                        <Form.Field>
                            <label>Product</label>
                            <Select placeholder={sale?.product.name} onChange={(_e, data) => {
                                setProduct(data.value)
                            }} options={productOption()} />
                        </Form.Field>
                        <Form.Field>
                            <label>Store</label>
                            <Select placeholder={sale?.store.name} onChange={(_e, data) => {
                                setStore(data.value)
                            }} options={storeOption()} />
                        </Form.Field>
                    </Form>
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button color='black' onClick={() => openModal(false)}>
                    Cancel
                </Button>
                <Button icon labelPosition='right' color="green" onClick={editProduct}>
                    Edit
                    <Icon name='check' />
                </Button>
            </Modal.Actions>
        </Modal>
    )
}

export default EditSale