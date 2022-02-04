import React, { useState, useEffect } from 'react'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps'
import { createOrder } from '../actions/orderActions'
import { ORDER_CREATE_RESET } from '../constants/orderConstants'

function OrderDetailScreen({ history }) {

    const orderCreate = useSelector(state => state.orderCreate)
    const { order, error, success } = orderCreate
    
    const dispatch = useDispatch()
    /*
    const cart = useSelector(state => state.cart)
    
    cart.itemsPrice = cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    cart.shippingPrice = (cart.itemsPrice > 1000 ? 0 : 150)
    cart.taxPrice = Number((0.082) * cart.itemsPrice)

    cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice))
    */
    
    useEffect(() => {
        if (success) {
            history.push(`/order/${order._id}`)
            dispatch({ type: ORDER_CREATE_RESET })
        }
    }, [success, history])

    const placeOrder = () => {
        console.log("into")
        
        dispatch(createOrder({
            orderItems: "cart.cartItems",
            shippingAddress: "cart.shippingAddress",
            itemsPrice: "cart.itemsPrice",
            shippingPrice: "cart.shippingPrice",
            taxPrice: "cart.taxPrice",
            totalPrice: "cart.totalPrice",
        }))
        
    }

    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4 />
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                       
                        <ListGroup.Item>
                            <h2>訂單清單</h2>
                            
                           
                                    <ListGroup variant='flush'>
                                       
                                    
                                    </ListGroup>
                            
                        </ListGroup.Item>

                    </ListGroup>

                </Col>

                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>訂單總結</h2>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>項目:</Col>
                                    <Col></Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>運費:</Col>
                                    <Col></Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>稅率:</Col>
                                    <Col></Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>總金額:</Col>
                                    <Col></Col>
                                </Row>
                            </ListGroup.Item>


                            <ListGroup.Item>
                                {error && <Message variant='danger'>{error}</Message>}
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Button
                                    type='button'
                                    className='btn-block'
                                    disabled= "false"
                                    onClick={placeOrder}
                                >
                                    結帳
                                </Button>
                            </ListGroup.Item>

                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default OrderDetailScreen
