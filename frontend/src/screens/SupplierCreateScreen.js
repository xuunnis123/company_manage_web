import React, {useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card, FormControl,FormLabel,Dropdown,DropdownButton } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'

import { listSupplier, addSupplier } from '../actions/supplierActions'

function SupplierCreateScreen({ match, location, history}) {
   
   
    const [name, setName] = useState('')
    const [person, setPerson] = useState('')
    const [unicode, setUnicode] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
   
    const [memo, setMemo] = useState('')
   
    const dispatch = useDispatch()
  
    //const redirect = location.search ? location.search.split('=')[1] :'/school'
    const redirect = '/supplier'
    const supplierAdd = useSelector(state => state.supplierAdd)
    const {error, loading, supplier} = supplierAdd
    

    useEffect(()=>{
       
        
        if(supplier){
            history.push(redirect)
        }
    },[history, supplier, redirect])

   
   
     
    const submitHandler =(e) =>{
        e.preventDefault()
        
        dispatch(addSupplier( name, person, unicode, phone, address, memo))
        
        history.push(redirect)
        
    }
    return (
        <FormContainer>
            <h1>新增供應商</h1>
            
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            
            <Form onSubmit={submitHandler}>

            <Form.Group controlId='name'>
                    <Form.Label>供應商名字</Form.Label>
                    <Form.Control
                        required
                        type='name'
                        placeholder='輸入供應商名字'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    >

                    </Form.Control>
            </Form.Group>

            <Form.Group controlId='person'>
                <Form.Label>供應商聯絡人</Form.Label>
                <Form.Control
                        required
                        type='name'
                        placeholder='輸入供應商聯絡人名字'
                        value={person}
                        onChange={(e) => setPerson(e.target.value)}
                    >
                </Form.Control>
            
            </Form.Group>
            <Form.Group controlId='unicode'>
                <Form.Label>統一編號</Form.Label>
                <Form.Control
                        
                        type='unicode'
                        placeholder='輸入統一編號'
                        value={unicode}
                        onChange={(e) => setUnicode(e.target.value)}
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
                     <Link to='/supplier'>
                     取消
                        </Link>
                </Col>
            </Row>
        </FormContainer>
    )
}
export default SupplierCreateScreen
