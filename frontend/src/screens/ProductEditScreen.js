import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Form, Button,DropdownButton,Dropdown } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { listProductDetails, updateProduct } from '../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'
import { listSupplier } from '../actions/supplierActions'

function ProductEditScreen({ match, history }) {

    const productId = match.params.id

    /*<td>{product._id}</td>
      <td>{product.name}</td>
      <td>${product.price}</td>
      <td>${product.cost}</td>
      <td>{product.category}</td>
      <td>${product.stock}</td>
      <td>${product.company}</td>
      <td>{product.memo}</td> */
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [cost, setCost] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [supplierName,setSupplierName] = useState('請選擇供應商')
    const [supplier, setSupplier] = useState('')
    const [memo, setMemo] = useState('')
    //const [uploading, setUploading] = useState(false)

    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const { error, loading, product } = productDetails

    const productUpdate = useSelector(state => state.productUpdate)
    const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = productUpdate

    const supplierList = useSelector(state => state.supplierList)
    const { errorList, loadingList, suppliers } = supplierList

    useEffect(() => {
        dispatch(listSupplier())
        console.log("edit")
        if (successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET })
            history.push('/product')
        } else {
            console.log("edit")
            if (!product.name || product._id !== Number(productId)) {
                dispatch(listProductDetails(productId))
            } else {
                setName(product.name)
                setPrice(product.price)
                setCost(product.cost)
                setSupplier(product.supplier)
                setCategory(product.category)
                setCountInStock(product.countInStock)
                setMemo(product.memo)
                setSupplierName(product.supplier)
            }
        }



    }, [dispatch, product, productId, history, successUpdate])
    const handleSelectSupplier=(e)=>{
        
        var splitSupplier = e.split(',');
        var stringId = splitSupplier[0]
        setSupplier(parseInt(stringId, 10))

        setSupplierName(splitSupplier[1]);  
        
      }
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateProduct({
            _id: productId,
            name,
            price,
            cost,
            supplier,
            category,
            countInStock,
            memo
        }))
    }

   
    return (
        <div>
            <Link to='/product'>
                回上一頁
            </Link>

            <FormContainer>
                <h1>Edit Product</h1>
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}

                {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>
                    : (
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

                            <Form.Group controlId='supplier'>
                                <Form.Label>供應商</Form.Label>
                                <DropdownButton
                                aligndown="true"
                                title= {supplierName}
                                id="dropdown-menu-align-down"
                                onSelect={handleSelectSupplier}
                                    >
                                 {suppliers.map((supplier,index) =>{
                            
                            return <Dropdown.Item eventKey={[supplier._id,supplier.name]} key={index}>{supplier.name}</Dropdown.Item>
                            })}
                            </DropdownButton>
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
                                更新資料
                        </Button>

                        </Form>
                    )}

            </FormContainer >
        </div>

    )
}

export default ProductEditScreen