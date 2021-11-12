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
 export const supplierListReducers = ( state = { suppliers:[] }, action) =>{
    switch(action.type){
        case SUPPLIERS_LIST_REQUEST:
            return { loading : true, suppliers:[] }
        
        case SUPPLIERS_LIST_SUCCESS:
            return { loading : false, suppliers: action.payload }

        case SUPPLIERS_LIST_FAIL:
            return { loading : false, error: action.payload }

        

        default:
            return state    
    }

}


export const supplierDetailsReducer = ( state = { supplier:{} }, action) =>{
    switch(action.type){
        case SUPPLIER_DETAIL_REQUEST:
            return { loading : true, ...state }
        
        case SUPPLIER_DETAIL_SUCCESS:
            console.log(action.payload)
            return { loading : false, supplier: action.payload }

        case SUPPLIER_DETAIL_FAIL:
            return { loading : false, error: action.payload }

        case SUPPLIER_UPDATE_RESET:
            return {
                loading : false, error: action.payload 
            }

        default:
            return state    
    }

}

export const supplierAddReducers = ( state = {  }, action) =>{
    switch(action.type){
        case SUPPLIER_ADD_REQUEST:
            return { loading : true }
        
        case SUPPLIER_ADD_SUCCESS:
            return { loading : false, supplier: action.payload }

        case SUPPLIER_ADD_FAIL:
            return { loading : false, error: action.payload }

        

        default:
            return state    
    }

}
export const supplierUpdateReducers = ( state = { supplier:{} }, action) =>{
    switch(action.type){
        case SUPPLIER_UPDATE_REQUEST:
            return { loading : true }
        
        case SUPPLIER_UPDATE_SUCCESS:
            return { loading : false, success:true, supplier: action.payload }

        case SUPPLIER_UPDATE_FAIL:
            return { loading : false, error: action.payload }

        case SUPPLIER_UPDATE_RESET:
                return { supplier: {} }

        default:
            return state    
    }

}

