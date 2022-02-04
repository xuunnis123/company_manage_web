import React, {useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card, Dropdown,DropdownButton } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import {  listCustomer } from '../actions/customerActions'
import { listProducts } from '../actions/productActions'
import ProductEditScreen from './ProductEditScreen'
function OrderCreateScreen({ match, location, history}) {
   
    const [customerTitle,setCustomerTitle] = useState('請選擇客戶')
    const [productTitle,setProductTitle] = useState('請選擇品項')
    const [deliveryDate, setDeliveryDate] = useState('')
    const [price, setPrice] = useState(0)
    const [cost, setCost] = useState(0)
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [model, setModel] = useState('')
    const [unit, setUnit] = useState('')
    const [supplier, setSupplier] = useState('')
    const [memo, setMemo] = useState('')

    const dispatch = useDispatch()
  
    //const redirect = location.search ? location.search.split('=')[1] :'/school'
    const redirect = '/order'

    const customerList = useSelector(state => state.customerList)
    const { customer_error, customer_loading, customers } = customerList

    const productList = useSelector(state => state.productList)
    const { product_error, product_loading, products } = productList

    const orderAdd = useSelector(state => state.orderAdd)
    const {error, loading, order} = orderAdd

    useEffect(()=>{
        dispatch(listCustomer())
        dispatch(listProducts())
       
       if(order){
        history.push(redirect)
       }

    },[history,order,redirect])
    const handleSelect=(e)=>{
        
        var splitSupplier = e.split(',');
        
        setSupplier(splitSupplier[0])

        setCustomerTitle(splitSupplier[1]);  
      }
    const handleSelectProduct=(e)=>{
        
        var splitSupplier = e.split(',');
        
        setSupplier(splitSupplier[0])

        setProductTitle(splitSupplier[1]);  
      }
    //dispatch(listSchool())
    const submitHandler =(e) =>{
        e.preventDefault()
        
        //dispatch(addOrder(name, price, cost, supplier, model, category, countInStock, unit, memo))
        
        history.push(redirect)
        
    }
    return (
        <FormContainer>
            <h1>新增訂單</h1>
            
            {customer_error && <Message variant='danger'>{customer_error}</Message>}
            {customer_loading && <Loader />}
            
            <Form onSubmit={submitHandler}>
                            <Form.Group controlId='product'>
                                <Form.Label>品項</Form.Label>
                                <DropdownButton
                                aligndown="true"
                                title= {productTitle}
                                id="dropdown-menu-align-down"
                                onSelect={handleSelectProduct}
                                >

                            {products.map((product,index) =>{
                            
                            return <Dropdown.Item eventKey={[product._id,product.name]} key={index}>{product.name}</Dropdown.Item>
                            })}
                                    
                            </DropdownButton>
                            
                            </Form.Group>
                



                            <Form.Group controlId='customer'>
                                <Form.Label>客戶</Form.Label>
                                <DropdownButton
                                aligndown="true"
                                title= {customerTitle}
                                id="dropdown-menu-align-down"
                                onSelect={handleSelect}
                                    >

                            {customers.map((customer,index) =>{
                            
                            return <Dropdown.Item eventKey={[customer._id,customer.name]} key={index}>{customer.name}</Dropdown.Item>
                            })}
                                    
                            </DropdownButton>
                            
                            </Form.Group>
                            <Form.Group controlId='delivery_date'>
                                <Form.Label>出貨日</Form.Label>
                                <Form.Control

                                    type='text'
                                    placeholder='輸入出貨日'
                                    value={deliveryDate}
                                    onChange={(e) => setMemo(e.target.value)}
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
                     <Link to='/order'>
                     取消
                        </Link>
                </Col>
            </Row>
        </FormContainer>
    )
}
export default OrderCreateScreen
