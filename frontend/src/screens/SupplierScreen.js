import React, {useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'
import { Table, Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'
import School from '../components/School'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'

import { listSupplier,removeFromSupplier } from '../actions/supplierActions'

function SupplierScreen({ match, location, history}) {
    
    //const [name, setName] = useState('')
    //const [represent_person_name, setRepresent_person_name] = useState('')
    //const [represent_person_phone, setRepresent_person_phone] = useState('')
    

    const dispatch = useDispatch()
    const supplierList = useSelector(state => state.supplierList)
    const { error, loading, suppliers } = supplierList
    const supplierDetail = useSelector(state => state.supplierDetail)
    const { detailerror, detailloading, supplier } = supplierDetail

    const redirect = '/supplier'
    useEffect(() =>{
        dispatch(listSupplier())
      

    },[dispatch])
    
    const addToSupplierHandler =() =>{
        history.push('/supplier/create')
    }
    const removeFromSupplierHandler = (id) => {
        dispatch(removeFromSupplier(id))
        window.location.reload()
    }
    return (
        <div>
            <h1>供應商列表</h1>
            <Button 
                onClick = {addToSupplierHandler}
                className='btn-block' 
                type='button'> 
                新增供應商
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
                                <th>供應商名字</th>
                                <th>供應商聯絡人</th>
                                <th>統一編號</th>
                                <th>電話</th>
                                <th>地址</th>
                                <th>備註</th>
                            </tr>
                        </thead>

                        <tbody>
                            {suppliers.map(oneSupplier => (
                                <tr key={oneSupplier._id}>
                                    <td><Link to={`/supplier/${oneSupplier._id}/edit`}><Button type="button"><i className='fas fa-edit'></i></Button></Link>
                                    <Button
                                    type='button'
                                    variant='danger'
                                    onClick={()=>removeFromSupplierHandler(oneSupplier._id)}><i className='fas fa-trash'> </i>
                                    </Button></td>
                                    <td>{oneSupplier._id}</td>
                                    <td>{oneSupplier.name}</td>
                                    <td>{oneSupplier.person}</td>
                                    <th>{oneSupplier.unicode}</th>
                                    <td>{oneSupplier.phone}</td>
                                    <td>{oneSupplier.address}</td>
                                    <td>{oneSupplier.memo}</td>
                                   
                                </tr>
                            ))}
                        </tbody>
                        </Table>



                      
                        
                        
                


            </Row>
        }

            
        </div>
    )
}
export default SupplierScreen
