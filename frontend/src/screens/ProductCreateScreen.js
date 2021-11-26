import React, {useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card, Dropdown,DropdownButton } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import {  listSupplier } from '../actions/supplierActions'
import {  addProduct } from '../actions/productActions'
function ProductCreateScreen({ match, location, history}) {
    /*name = models.CharField(max_length=200, null=True, blank=True)
    model = models.CharField(max_length=200, null=True, blank=True)
    unit = models.CharField(max_length=200, null=True, blank=True)
    supplier = models.ForeignKey(Supplier, on_delete=models.SET_NULL, null=True)
    category = models.CharField(max_length=200, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    price = models.IntegerField(null=True, blank=True)
    cost = models.IntegerField(null=True, blank=True)
    countInStock = models.IntegerField(null=True, blank=True, default=0)
    createdAt = models.DateTimeField(auto_now_add=True)
    modifiedAt = models.DateTimeField(auto_now = True) */
    const [supplierTitle,setSupplierTitle] = useState('請選擇供應商')
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [cost, setCost] = useState(0)
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [model, setModel] = useState('')
    const [unit, setUnit] = useState('')
    const [supplier, setSupplier] = useState('')
    

    const dispatch = useDispatch()
  
    //const redirect = location.search ? location.search.split('=')[1] :'/school'
    const redirect = '/product'

    const supplierList = useSelector(state => state.supplierList)
    const { supplier_error, supplier_loading, suppliers } = supplierList

    const productAdd = useSelector(state => state.productAdd)
    const {error, loading, product} = productAdd

    useEffect(()=>{
        dispatch(listSupplier())
        if(product){
            
            history.push(redirect)
        }
        
    },[history, product, redirect])
    const handleSelect=(e)=>{
        
        var splitSupplier = e.split(',');
        
        setSupplier(splitSupplier[0])

        setSupplierTitle(splitSupplier[1]);  
      }

    //dispatch(listSchool())
    const submitHandler =(e) =>{
        e.preventDefault()
        
        dispatch(addProduct(name, price, cost, supplier, model, category, countInStock, unit))
        
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

                            <Form.Group controlId='supplier'>
                                <Form.Label>供應商</Form.Label>
                                <DropdownButton
                                aligndown="true"
                                title= {supplierTitle}
                                id="dropdown-menu-align-down"
                                onSelect={handleSelect}
                                    >

                            {suppliers.map((supplier,index) =>{
                            
                            return <Dropdown.Item eventKey={[supplier._id,supplier.name]} key={index}>{supplier.name}</Dropdown.Item>
                            })}
                                    
                            </DropdownButton>
                            
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

                            <Form.Group controlId='model'>
                                <Form.Label>型號</Form.Label>
                                <Form.Control

                                    type='text'
                                    placeholder='輸入型號'
                                    value={model}
                                    onChange={(e) => setModel(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='unit'>
                                <Form.Label>單位</Form.Label>
                                <Form.Control

                                    type='text'
                                    placeholder='輸入單位'
                                    value={unit}
                                    onChange={(e) => setUnit(e.target.value)}
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
