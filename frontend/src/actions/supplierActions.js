import axios from 'axios'
import {
    SUPPLIERS_LIST_REQUEST,
    SUPPLIERS_LIST_SUCCESS,
    SUPPLIERS_LIST_FAIL,


    SUPPLIER_ADD_REQUEST,
    SUPPLIER_ADD_SUCCESS,
    SUPPLIER_ADD_FAIL,

    SUPPLIER_UPDATE_REQUEST,
    SUPPLIER_UPDATE_SUCCESS,
    SUPPLIER_UPDATE_FAIL,

    SUPPLIER_DETAIL_REQUEST,
    SUPPLIER_DETAIL_SUCCESS,
    SUPPLIER_DETAIL_FAIL,
    SUPPLIER_UPDATE_RESET,

    SUPPLIER_DELETE_REQUEST,
    SUPPLIER_DELETE_SUCCESS,
    SUPPLIER_DELETE_FAIL,

} from '../constants/supplierConstants'
export const listSupplier = () => async(dispatch) =>{
    try {
        dispatch({
            type: SUPPLIERS_LIST_REQUEST
        })

        const {data} = await axios.get('/api/supplier/suppliers/') 
        
        dispatch({
            type:SUPPLIERS_LIST_SUCCESS,
            payload:data
        })

    }catch(error){
        dispatch({ 
            type: SUPPLIERS_LIST_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
            
        })
    }
}

export const supplierDetail = (id) => async(dispatch) =>{
    try {
        dispatch({
            type: SUPPLIER_DETAIL_REQUEST
        })
        console.log(id)
        const {data} = await axios.get(`/api/supplier/${id}`) 
        
        dispatch({
            type:SUPPLIER_DETAIL_SUCCESS,
            payload:data
        })

    }catch(error){
        dispatch({ 
            type: SUPPLIER_DETAIL_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
            
        })
    }
}


export const addSupplier = (name, person ,unicode,phone, address, memo) => async(dispatch,getState) =>{
    try{
        dispatch({

                type: SUPPLIER_ADD_REQUEST
            })
            const {
                userLogin: { userInfo },
            } = getState()
    
            const config = {
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${userInfo.access}`
                }
            }
        const {data} = await axios.post(
             '/api/supplier/create/',
             {'person': person, 'name': name ,'phone':phone,'address':address,'unicode':unicode,'memo':memo},
             config
             ) 
         localStorage.setItem("supplier",data.id)
         dispatch({
             type:SUPPLIER_ADD_SUCCESS,
             payload:data
             
         })

         

    }catch(error){
        dispatch({ 
            type: SUPPLIER_ADD_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
            
        })
    }
}



export const updateSupplier = (supplier) => async(dispatch,getState) =>{
    try{
        dispatch({

                type: SUPPLIER_UPDATE_REQUEST
            })
            const {
                userLogin: { userInfo },
            } = getState()
    
            const config = {
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${userInfo.access}`
                }
            }
        console.log({supplier})
        const {data} = await axios.put(
             `/api/studsupplierent/update/${supplier.id}`,
             supplier,
             config
             ) 
         
         dispatch({
             type:SUPPLIER_UPDATE_SUCCESS,
             payload:data
         })

         dispatch({
            type:SUPPLIER_DETAIL_SUCCESS,
            payload:data
        })

    }catch(error){
        dispatch({ 
            type: SUPPLIER_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
            
        })
    }
}


export const removeFromSupplier = (id) => async(dispatch, getState) => {
    try{
        console.log("into delete")
    dispatch({
        type: SUPPLIER_DELETE_REQUEST,
    })
        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.access}`
            }
        }
        const {data} = await axios.delete(
         `/api/supplier/delete/${id}`,
         config
         ) 
        
        dispatch({
            type:SUPPLIER_DELETE_SUCCESS,
            payload:data
        })
    
    }catch(error){
        dispatch({ 
            type: SUPPLIER_DELETE_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
            
        })
    }
    
}

