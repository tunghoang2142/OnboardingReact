import React, { useState } from 'react'
import { Table, Button, Icon } from 'semantic-ui-react'
import EditProduct from './EditProduct';
import DeleteModal from '../Common/DeleteModal';

const ProductTable = (props) => {
    const { products, fetchProduct } = props;
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [product, setProduct] = useState(undefined);

    const openEditModal = (value) => {
        setOpenEdit(value)
    }

    const openDeleteModal = (value) => {
        setOpenDelete(value)
    }

    return (
        <Table celled striped>
            <EditProduct open={openEdit} openModal={openEditModal} fetchData={fetchProduct} product={product} />
            <DeleteModal open={openDelete} openModal={openDeleteModal} fetchData={fetchProduct}
                url={`Products/DeleteProduct/${product?.id}`} title={"Delete product"} />
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Price</Table.HeaderCell>
                    <Table.HeaderCell>Action</Table.HeaderCell>
                    <Table.HeaderCell>Action</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {products.map((e) => {
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

export default ProductTable