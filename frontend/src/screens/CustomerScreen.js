import React, {useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'
import { Table, Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'

import { listCustomer,removeFromCustomer } from '../actions/customerActions'

function MemberScreen({ match, location, history}) {
  

    const dispatch = useDispatch()
    const customerList = useSelector(state => state.customerList)
    const { error, loading, customers } = customerList


    const redirect = '/customer'
    useEffect(() =>{
        dispatch(listCustomer())
      

    },[dispatch])
    
    const addToCustomerHandler =() =>{
        history.push('/customer/create')
    }
    const removeFromCustomerHandler = (id) => {
        dispatch(removeFromCustomer(id))
        window.location.reload()
    }
    return (
        <div>
            <h1>客戶列表</h1>
            <Button 
                onClick = {addToCustomerHandler}
                className='btn-block' 
                type='button'> 
                新增客戶
             </Button>
            {loading ? <Loader/>
            : error ? <Message variant='danger'>{error}</Message>
                : 
                <Row>
                    

                        <Table striped bordered hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>動作</th>
                                <th>ID</th>
                                <th>客戶名字</th>
                                <th>職業</th>
                                <th>電話</th>
                                <th>手機</th>
                                <th>地址</th>
                                <th>備註</th>
                               
                                
                            </tr>
                        </thead>

                        <tbody>
                            {customers.map(oneMem => (
                                <tr key={oneMem._id}>
                                    <td><Link to={`/customer/${oneMem._id}/edit`}><Button type="button"><i className='fas fa-edit'></i></Button></Link>
                                    <Button
                                    type='button'
                                    variant='danger'
                                    onClick={()=>removeFromCustomerHandler(oneMem._id)}><i className='fas fa-trash'> </i>
                                    </Button></td>
                                    
                                    <td>{oneMem._id}</td>
                                    <td>{oneMem.name}</td>
                                    <td>{oneMem.job}</td>
                                    <td>{oneMem.phone}</td>
                                    <td>{oneMem.cellphone}</td>
                                    <td>{oneMem.address}</td>
                                    <td>{oneMem.memo}</td>
                                  
                                </tr>
                            ))}
                        </tbody>
                        </Table>



                      
                        
                        
                


            </Row>
        }

            
        </div>
    )
}
export default MemberScreen
