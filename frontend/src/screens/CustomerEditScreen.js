import React, {useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card,Dropdown,DropdownButton } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import {  CUSTOMER_UPDATE_RESET,CUSTOMER_DETAIL_REQUEST } from '../constants/customerConstants'

import { listCustomer, updateCustomer, customerDetail } from '../actions/customerActions'
function CustomerEditScreen({ match, history}) {

    const customerId = match.params.id
    
    const [name, setName] = useState('')
    const [job, setJob] = useState('')
    const [phone, setPhone] = useState('')
    const [cellphone, setCellphone] = useState('')
    const [address, setAddress] = useState('')
   
    const [memo, setMemo] = useState('')
   

    const dispatch = useDispatch()
  
    
    const redirect = '/customer'

    const customerDetailReducer = useSelector(state => state.customerDetail)
    const { error, loading, customer } = customerDetailReducer

    const customerUpdate = useSelector(state => state.customerUpdate)
    const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = customerUpdate


    
    const customerList = useSelector(state => state.customerList)
    const { errorList, loadingList, customers } = customerList
    
    useEffect(()=>{
        
       
        dispatch({type:CUSTOMER_DETAIL_REQUEST})
        dispatch(customerDetail(customerId))
        dispatch(listCustomer())
        if(successUpdate){
            dispatch({ type: CUSTOMER_UPDATE_RESET })
            history.push(redirect)
        }else{
            if (!customer.name || customer._id != Number(customerId)){
                console.log("if")
                console.log(customer)
                console.log("member.id=",customer._id)
                console.log("memberId=",customerId)
                dispatch(listCustomer())
            }else{
                

                setName(customer.name)
                setJob(customer.job)
                setPhone(customer.phone)
                setCellphone(customer.cellphone)
                setAddress(customer.address)
                
                
                setMemo(customer.memo)
                
            }
            
        }
    },[customer._id])

    
    
    const submitHandler =(e) =>{
        console.log("look data")
       
       
        e.preventDefault()
        dispatch(updateCustomer({
            _id:customerId,
            name,
            job, 
            phone, 
            cellphone,
            address, 
            memo
        }))
        
        window.location.href = redirect
        
    }
    return (
        <FormContainer>
            <h1>????????????</h1>
            
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            
            <Form onSubmit={submitHandler}>

            

            <Form.Group controlId='name'>
                    <Form.Label>????????????</Form.Label>
                    <Form.Control
                        required
                        type='name'
                        placeholder='??????????????????'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    >

                    </Form.Control>
            </Form.Group>

            <Form.Group controlId='phone'>
                    <Form.Label>????????????</Form.Label>
                    <Form.Control
                        required
                        type='phone'
                        placeholder='????????????'
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    >

                    </Form.Control>
            </Form.Group>
            <Form.Group controlId='cellphone'>
                    <Form.Label>??????</Form.Label>
                    <Form.Control
                        required
                        type='cellphone'
                        placeholder='????????????'
                        value={cellphone}
                        onChange={(e) => setCellphone(e.target.value)}
                    >

                    </Form.Control>
            </Form.Group>
            <Form.Group controlId='address'>
                    <Form.Label>????????????</Form.Label>
                    <Form.Control
                        required
                        type='address'
                        placeholder='????????????'
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    >

                    </Form.Control>
            </Form.Group>
            <Form.Group controlId='job'>
                    <Form.Label>??????</Form.Label>
                    <Form.Control
                        required
                        type='job'
                        placeholder='????????????'
                        value={job}
                        onChange={(e) => setJob(e.target.value)}
                    >

                    </Form.Control>
            </Form.Group>

            <Form.Group controlId='memo'>
                    <Form.Label>??????</Form.Label>
                    <Form.Control
                        type='memo'
                        placeholder='??????'
                        value={memo}
                        onChange={(e) => setMemo(e.target.value)}
                    >

                    </Form.Control>
            </Form.Group>
           
        
           
                <Button type='submit' variant='primary'>
                    ??????
                </Button>
            </Form>
        
            <Row className='py-3'>
                <Col>
                     <Link to='/member'>
                     ??????
                        </Link>
                </Col>
            </Row>
        </FormContainer>
    )
}
export default CustomerEditScreen
