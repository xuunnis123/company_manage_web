import React, { useState, useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import { listProducts, deleteProduct, addProduct } from '../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'

function OrderListScreen({ history, match }) {

    const dispatch = useDispatch()

    const orderList = useSelector(state => state.orderList)
    const { loading, error, orders } = orderList

    const productDelete = useSelector(state => state.productDelete)
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete

   

    let keyword = history.location.search
    useEffect(() => {
        dispatch({ type: PRODUCT_CREATE_RESET })
        dispatch(listProducts())
    
        /*
        if (successCreate) {
            history.push(`/product/${createdProduct._id}/edit`)
        } else {
            dispatch(listProducts(keyword))
            
        }
        */

    }, [dispatch, history, successDelete, keyword])


    const deleteHandler = (id) => {

        if (window.confirm('是否確定要刪除訂單？')) {
            dispatch(deleteProduct(id))
        }
    }

    const createOrderHandler = () => {
        history.push('/order/create')
    }

    return (
        <div>
            <Row className='align-items-center'>
                <Col>
                    <h1>訂單</h1>
                </Col>

                
            </Row>
            <Col className='text-right'>
                    <Button className='my-3' onClick={createOrderHandler}>
                        <i className='fas fa-plus'></i> 新增訂單
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
                                        <th>單號</th>
                                        <th>時間</th>
                                        <th>買方</th>
                                        <th>總金額</th>
                                        <th>項目</th>
                                        <th>動作</th>
                                    
                                    </tr>
                                </thead>

                                <tbody>
                                    

                                             {orders.map(oneProduct => (
                                        <tr key={orders._id}>
                                            <td>{orders.no}</td>
                                            <td>{orders.datetime}</td>
                                            <td>{orders.customer}</td>
                                            <td>{orders.amount}</td>
                                            <td>
                                            <LinkContainer to={`/orderitems/${orders.no}/edit`}>
                                                    <Button variant='light' className='btn-sm'>
                                                        <i className='fas fa-edit'></i>
                                                    </Button>
                                                </LinkContainer>
                                            </td>
                                            

                                            <td>
                                        
                                                <LinkContainer to={`/order/${oneProduct._id}/edit`}>
                                                    <Button variant='light' className='btn-sm'>
                                                        <i className='fas fa-plus-square'></i>
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

export default OrderListScreen