import axios from 'axios'
import {
    CUSTOMERS_LIST_REQUEST,
    CUSTOMERS_LIST_SUCCESS,
    CUSTOMERS_LIST_FAIL,


    CUSTOMER_ADD_REQUEST,
    CUSTOMER_ADD_SUCCESS,
    CUSTOMER_ADD_FAIL,

    CUSTOMER_UPDATE_REQUEST,
    CUSTOMER_UPDATE_SUCCESS,
    CUSTOMER_UPDATE_FAIL,

    CUSTOMER_DETAIL_REQUEST,
    CUSTOMER_DETAIL_SUCCESS,
    CUSTOMER_DETAIL_FAIL,
    CUSTOMER_UPDATE_RESET,

    CUSTOMER_DELETE_REQUEST,
    CUSTOMER_DELETE_SUCCESS,
    CUSTOMER_DELETE_FAIL,

} from '../constants/customerConstants'
export const listCustomer = () => async(dispatch) =>{
    try {
        dispatch({
            type: CUSTOMERS_LIST_REQUEST
        })

        const {data} = await axios.get('/api/customer/customers/') 
        
        dispatch({
            type:CUSTOMERS_LIST_SUCCESS,
            payload:data
        })

    }catch(error){
        dispatch({ 
            type: CUSTOMERS_LIST_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
            
        })
    }
}

export const customerDetail = (id) => async(dispatch) =>{
    try {
        dispatch({
            type: CUSTOMER_DETAIL_REQUEST
        })
        console.log(id)
        const {data} = await axios.get(`/api/customer/${id}`) 
        
        dispatch({
            type:CUSTOMER_DETAIL_SUCCESS,
            payload:data
        })

    }catch(error){
        dispatch({ 
            type: CUSTOMER_DETAIL_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
            
        })
    }
}


export const addCustomer = ( name, job, phone, cellphone, address, memo) => async(dispatch,getState) =>{
    try{
        dispatch({

                type: CUSTOMER_ADD_REQUEST
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
             '/api/customer/create/',
             {'job': job, 'name': name ,'phone':phone,'cellphone':cellphone,'address':address,'memo':memo},
             config
             ) 
         
         dispatch({
             type:CUSTOMER_ADD_SUCCESS,
             payload:data
         })

         

    }catch(error){
        dispatch({ 
            type: CUSTOMER_ADD_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
            
        })
    }
}



export const updateCustomer = (customer) => async(dispatch,getState) =>{
    try{
        dispatch({

                type: CUSTOMER_UPDATE_REQUEST
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
        
        const {data} = await axios.put(
             `/api/customer/update/${customer._id}`,
             customer,
             config
             ) 
         
         dispatch({
             type:CUSTOMER_UPDATE_SUCCESS,
             payload:data
         })

         dispatch({
            type:CUSTOMER_DETAIL_SUCCESS,
            payload:data
        })

    }catch(error){
        dispatch({ 
            type: CUSTOMER_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
            
        })
    }
}


export const removeFromCustomer = (id) => async(dispatch, getState) => {
    try{
        console.log("into delete")
    dispatch({
        type: CUSTOMER_DELETE_REQUEST,
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
         `/api/customer/delete/${id}`,
         config
         ) 
        
        dispatch({
            type:CUSTOMER_DELETE_SUCCESS,
            payload:data
        })
    
    }catch(error){
        dispatch({ 
            type: CUSTOMER_DELETE_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
            
        })
    }
    
}

