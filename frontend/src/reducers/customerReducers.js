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
 export const customerListReducers = ( state = { customers:[] }, action) =>{
    switch(action.type){
        case CUSTOMERS_LIST_REQUEST:
            return { loading : true, customers:[] }
        
        case CUSTOMERS_LIST_SUCCESS:
            return { loading : false, customers: action.payload }

        case CUSTOMERS_LIST_FAIL:
            return { loading : false, error: action.payload }

        

        default:
            return state    
    }

}


export const customerDetailsReducer = ( state = { customer:{} }, action) =>{
    switch(action.type){
        case CUSTOMER_DETAIL_REQUEST:
            return { loading : true, ...state }
        
        case CUSTOMER_DETAIL_SUCCESS:
            console.log(action.payload)
            return { loading : false, customer: action.payload }

        case CUSTOMER_DETAIL_FAIL:
            return { loading : false, error: action.payload }

        case CUSTOMER_UPDATE_RESET:
            return {
                loading : false, error: action.payload 
            }

        default:
            return state    
    }

}

export const customerAddReducers = ( state = {  }, action) =>{
    switch(action.type){
        case CUSTOMER_ADD_REQUEST:
            return { loading : true }
        
        case CUSTOMER_ADD_SUCCESS:
            return { loading : false, customer: action.payload }

        case CUSTOMER_ADD_FAIL:
            return { loading : false, error: action.payload }

        

        default:
            return state    
    }

}
export const customerUpdateReducers = ( state = { customer:{} }, action) =>{
    switch(action.type){
        case CUSTOMER_UPDATE_REQUEST:
            return { loading : true }
        
        case CUSTOMER_UPDATE_SUCCESS:
            return { loading : false, success:true, customer: action.payload }

        case CUSTOMER_UPDATE_FAIL:
            return { loading : false, error: action.payload }

        case CUSTOMER_UPDATE_RESET:
                return { customer: {} }

        default:
            return state    
    }

}

