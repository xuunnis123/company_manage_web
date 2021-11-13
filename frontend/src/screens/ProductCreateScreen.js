import React, {useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'

import {  addProduct } from '../actions/productActions'

function ProductCreateScreen({ match, location, history}) {
    
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [cost, setCost] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [company, setCompany] = useState('')
    const [memo, setMemo] = useState('')

    const dispatch = useDispatch()
  
    //const redirect = location.search ? location.search.split('=')[1] :'/school'
    const redirect = '/product'
    const productAdd = useSelector(state => state.productAdd)
    const {error, loading, product} = productAdd

    useEffect(()=>{
        
        if(product){
            
            history.push(redirect)
        }
        
    },[history, product, redirect])

    //dispatch(listSchool())
    const submitHandler =(e) =>{
        e.preventDefault()
        
        dispatch(addProduct(name, price, cost, company, category, countInStock, memo))
        
        history.push(redirect)
        
    }
    return (
        <FormContainer>
            <h1>新增品項</h1>
            
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            
            <Form onSubmit={submitHandler}>

            <Form.Group controlId='name'>
                                <Form.Label>品項名稱</Form.Label>
                                <Form.Control

                                    type='name'
                                    placeholder='輸入品項'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='price'>
                                <Form.Label>售價</Form.Label>
                                <Form.Control

                                    type='number'
                                    placeholder='輸入售價'
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>


                            <Form.Group controlId='cost'>
                                <Form.Label>成本</Form.Label>
                                <Form.Control

                                    type='text'
                                    placeholder='輸入成本價'
                                    value={cost}
                                    onChange={(e) => setCost(e.target.value)}
                                >
                                </Form.Control>

                    
                               

                            </Form.Group>


                            <Form.Group controlId='category'>
                                <Form.Label>類型</Form.Label>
                                <Form.Control

                                    type='text'
                                    placeholder='輸入類型'
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='countinstock'>
                                <Form.Label>庫存</Form.Label>
                                <Form.Control

                                    type='number'
                                    placeholder='輸入庫存'
                                    value={countInStock}
                                    onChange={(e) => setCountInStock(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='company'>
                                <Form.Label>公司</Form.Label>
                                <Form.Control

                                    type='text'
                                    placeholder='輸入公司'
                                    value={company}
                                    onChange={(e) => setCompany(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='memo'>
                                <Form.Label>備註</Form.Label>
                                <Form.Control

                                    type='text'
                                    placeholder='輸入備註'
                                    value={memo}
                                    onChange={(e) => setMemo(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                <Button type='submit' variant='primary'>
                    建立
                </Button>
            </Form>
        
            <Row className='py-3'>
                <Col>
                     <Link to='/school'>
                     取消
                        </Link>
                </Col>
            </Row>
        </FormContainer>
    )
}
export default ProductCreateScreen
