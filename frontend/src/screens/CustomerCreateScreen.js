import React, {useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card, FormControl,FormLabel,Dropdown,DropdownButton } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'

import { listCustomer, addCustomer } from '../actions/customerActions'



function CustomerCreateScreen({ match, location, history}) {
   
   
    const [name, setName] = useState('')
    const [job, setJob] = useState('')
    const [phone, setPhone] = useState('')
    const [cellphone, setCellphone] = useState('')
    const [address, setAddress] = useState('')
    const [memo, setMemo] = useState('')

    
    const dispatch = useDispatch()
  
    //const redirect = location.search ? location.search.split('=')[1] :'/school'
    const redirect = '/customer'
    const customerAdd = useSelector(state => state.customerAdd)
    const {error, loading, customer} = customerAdd
    
    const customerList = useSelector(state => state.customerList)
    const { errorList, loadingList, customers } = customerList

    useEffect(()=>{
        dispatch(listCustomer())
        
        if(customer){
            history.push(redirect)
        }
    },[history, customer, redirect])

   
   
   
    const submitHandler =(e) =>{
        e.preventDefault()
        
        dispatch(addCustomer( name,job, phone,cellphone, address, memo))
        
        history.push(redirect)
        
    }
    return (
        <FormContainer>
            <h1>新增客戶</h1>
            
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            
            <Form onSubmit={submitHandler}>

            <Form.Group controlId='name'>
                    <Form.Label>客戶名字</Form.Label>
                    <Form.Control
                        required
                        type='name'
                        placeholder='輸入客戶名字'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    >

                    </Form.Control>
            </Form.Group>

       
            
            <Form.Group controlId='phone'>
                    <Form.Label>聯絡電話</Form.Label>
                    <Form.Control
                        required
                        type='phone'
                        placeholder='輸入電話'
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    >

                    </Form.Control>
            </Form.Group>
            <Form.Group controlId='cellphone'>
                    <Form.Label>手機號碼</Form.Label>
                    <Form.Control
                        required
                        type='cellphone'
                        placeholder='輸入手機'
                        value={cellphone}
                        onChange={(e) => setPhone(e.target.value)}
                    >

                    </Form.Control>
            </Form.Group>
            <Form.Group controlId='address'>
                    <Form.Label>聯絡地址</Form.Label>
                    <Form.Control
                        required
                        type='address'
                        placeholder='輸入地址'
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    >

                    </Form.Control>
            </Form.Group>
            <Form.Group controlId='job'>
                    <Form.Label>職業</Form.Label>
                    <Form.Control
                        required
                        type='job'
                        placeholder='輸入職業'
                        value={job}
                        onChange={(e) => setJob(e.target.value)}
                    >

                    </Form.Control>
            </Form.Group>
            

            
            
            <Form.Group controlId='memo'>
                    <Form.Label>備註</Form.Label>
                    <Form.Control
                        type='memo'
                        placeholder='備註'
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
                     <Link to='/member'>
                     取消
                        </Link>
                </Col>
            </Row>
        </FormContainer>
    )
}
export default CustomerCreateScreen
