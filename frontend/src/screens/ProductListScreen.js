import React, { useState, useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import { listProducts, deleteProduct, addProduct } from '../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'

function ProductListScreen({ history, match }) {

    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const { loading, error, products } = productList

    const productDelete = useSelector(state => state.productDelete)
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete

   

    let keyword = history.location.search
    useEffect(() => {
        dispatch({ type: PRODUCT_CREATE_RESET })
        console.log("dd")
        dispatch(listProducts())
        console.log("ee")
        /*
        if (successCreate) {
            history.push(`/product/${createdProduct._id}/edit`)
        } else {
            dispatch(listProducts(keyword))
            
        }
        */

    }, [dispatch, history, successDelete, keyword])


    const deleteHandler = (id) => {

        if (window.confirm('是否確定要刪除品項？')) {
            dispatch(deleteProduct(id))
        }
    }

    const createProductHandler = () => {
        history.push('/product/create')
    }

    return (
        <div>
            <Row className='align-items-center'>
                <Col>
                    <h1>品項</h1>
                </Col>

                
            </Row>
            <Col className='text-right'>
                    <Button className='my-3' onClick={createProductHandler}>
                        <i className='fas fa-plus'></i> 新增品項
                    </Button>
            </Col>
            {loadingDelete && <Loader />}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}


         

            {loading
                ? (<Loader />)
                : error
                    ? (<Message variant='danger'>{error}</Message>)
                    : (
                        <div>
                            <Table striped bordered hover responsive className='table-sm'>
                                <thead>
                                    <tr>
                                        
                                        <th>商品名稱</th>
                                        <th>價格</th>
                                        <th>成本價</th>
                                        <th>分類</th>
                                        <th>數量</th>
                                        <th>單位</th>
                                        <th>經銷商</th>
                                        <th>備註</th>
                                        <th></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    

                                    {products.map(oneProduct => (
                                        <tr key={oneProduct._id}>
                                            
                                            <td>{oneProduct.name}</td>
                                            <td>{oneProduct.price}</td>
                                            <td>{oneProduct.cost}</td>
                                            <td>{oneProduct.category}</td>
                                            <td>{oneProduct.countInStock}</td>
                                            <td>{oneProduct.unit}</td>
                                            <td>{oneProduct.supplier}</td>
                                            <td>{oneProduct.memo}</td>

                                            <td>
                                        
                                                <LinkContainer to={`/product/${oneProduct._id}/edit`}>
                                                    <Button variant='light' className='btn-sm'>
                                                        <i className='fas fa-edit'></i>
                                                    </Button>
                                                </LinkContainer>

                                                <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(oneProduct._id)}>
                                                    <i className='fas fa-trash'></i>
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                            <Paginate pages='' page='' isAdmin={true} />
                        </div>
                    )}
        </div>
    )
}

export default ProductListScreen