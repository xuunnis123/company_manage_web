import React, {useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card,Dropdown,DropdownButton } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import {  SUPPLIER_UPDATE_RESET,SUPPLIER_DETAIL_REQUEST } from '../constants/supplierConstants'

import { listSupplier, updateSupplier, supplierDetail } from '../actions/supplierActions'
function SupplierEditScreen({ match, history}) {
    
    const supplierId = match.params.id

    const [name, setName] = useState('')
    const [person, setPerson] = useState('')
    const [unicode, setUnicode] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
   
    const [memo, setMemo] = useState('')
   
    const dispatch = useDispatch()
  
    const supplierDetailReducer = useSelector(state => state.supplierDetail)
    const { error, loading, supplier } = supplierDetailReducer

    const supplierUpdate = useSelector(state => state.supplierUpdate)
    const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = supplierUpdate

    const redirect = '/supplier'

    
    useEffect(()=>{
        
       
        dispatch({type:SUPPLIER_DETAIL_REQUEST})
        dispatch(supplierDetail(supplierId))
        dispatch(listSupplier())
        if(successUpdate){
            dispatch({ type: SUPPLIER_UPDATE_RESET })
            history.push(redirect)
        }else{
            if (!supplier.name || supplier._id != Number(supplierId)){
                console.log("if")
                console.log("supplier.id=",supplier._id)
                console.log("supplierId=",supplierId)
                dispatch(listSupplier())
            }else{
                
                console.log("else")
                console.log(supplier.school)
                setName(supplier.name)
                
                setPerson(supplier.person)
               
                setPhone(supplier.phone)
                setAddress(supplier.address)
        
                setMemo(supplier.memo)
                
            }
            
        }
    },[supplier._id])
//[dispatch, history,supplierId,supplier,successUpdate,schools]
   
    
    
    const submitHandler =(e) =>{
       
        console.log(supplierId,
            name,
            person,
            unicode,
            phone,
            address,
            memo)
        e.preventDefault()
        dispatch(updateSupplier({
            _id: supplierId,
            name,
            person,
            unicode,
            phone,
            address,
            memo
        }))
        
        window.location.href = redirect
        
    }
    return (
        <FormContainer>
            <h1>修改供應商</h1>
            
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
                        required
                        type='number'
                        placeholder='輸入統一編號'
                        value={person}
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
                    存檔
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
export default SupplierEditScreen
