import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { cartReducer } from './reducers/cartReducers'
import { userLoginReducers, userRegisterReducer, userDetailsReducer, userUpdateProfileReducer, userLoginGoogleReducers} from './reducers/userReducers'
import { orderCreateReducer } from './reducers/orderReducers'

import {  productListReducer, productDetailsReducer, productDeleteReducer, productCreateReducer, productUpdateReducer} from './reducers/productReducers'

import { supplierListReducers,supplierAddReducers,supplierDetailsReducer,supplierUpdateReducers } from './reducers/supplierReducers'

import { customerListReducers,customerAddReducers,customerDetailsReducer,customerUpdateReducers } from './reducers/customerReducers'

import { financeListReducers,incomeListReducers,outcomeListReducers,incomeDetailsReducer,outcomeDetailsReducer,incomeAddReducers,outcomeAddReducers,incomeUpdateReducers,outcomeUpdateReducers ,incomeSumReducers, outcomeSumReducers,outcomeFinanceListReducer} from './reducers/financeReducers'

import { incomeContributeContextListReducers,outcomeContributeContextListReducers,incomeMoneyCategoryListReducers,outcomeMoneyCategoryListReducers,incomeContributeContextAddReducers,incomeMoneyCategoryAddReducers,outcomeContributeContextAddReducers,outcomeMoneyCategoryAddReducers,incomeContributeContextUpdateReducers,incomeMoneyCategoryUpdateReducers,outcomeContributeContextUpdateReducers,outcomeMoneyCategoryUpdateReducers,outcomeContributeContextDetailsReducer,incomeContributeContextDetailsReducer,outcomeMoneyCategoryDetailsReducer,incomeMoneyCategoryDetailsReducer} from './reducers/settingReducers'

import {semesterListReducers,semesterDetailsReducer,semesterAddReducers,semesterUpdateReducers} from './reducers/semesterReducers'
const reducer = combineReducers({
    
    cart:cartReducer,
    userLogin:userLoginReducers,
    userRegister:userRegisterReducer,
    userDetails:userDetailsReducer,
    userUpdateProfile:userUpdateProfileReducer,
    userLoginGoogle:userLoginGoogleReducers,
    orderCreate:orderCreateReducer,

    productList:productListReducer,
    productDetails:productDetailsReducer,
    productDelete:productDeleteReducer,
    productCreate:productCreateReducer,
    productUpdate:productUpdateReducer,

    supplierList:supplierListReducers,
    supplierAdd:supplierAddReducers,
    supplierUpdate:supplierUpdateReducers,
    supplierDetail:supplierDetailsReducer,

    customerList:customerListReducers,
    customerAdd:customerAddReducers,
    customerUpdate:customerUpdateReducers,
    customerDetail:customerDetailsReducer,

    financeList:financeListReducers,
    incomeList:incomeListReducers,
    outcomeList:outcomeListReducers,

    incomeDetail:incomeDetailsReducer,
    outcomeDetail:outcomeDetailsReducer,
    incomeAdd:incomeAddReducers,
    outcomeAdd:outcomeAddReducers,
    incomeUpdate:incomeUpdateReducers,
    outcomeUpdate:outcomeUpdateReducers,

    incomeSum:incomeSumReducers,
    outcomeSum:outcomeSumReducers,

    incomeContributeContextList:incomeContributeContextListReducers,
    outcomeContributeContextList:outcomeContributeContextListReducers,

    incomeMoneyCategoryList:incomeMoneyCategoryListReducers,
    outcomeMoneyCategoryList:outcomeMoneyCategoryListReducers,

    incomeContributeContextAdd:incomeContributeContextAddReducers,
    incomeMoneyCategoryAdd:incomeMoneyCategoryAddReducers,

    outcomeContributeContextAdd:outcomeContributeContextAddReducers,
    outcomeMoneyCategoryAdd:outcomeMoneyCategoryAddReducers,

    incomeContributeContextUpdate:incomeContributeContextUpdateReducers,
    incomeMoneyCategoryUpdate:incomeMoneyCategoryUpdateReducers,

    outcomeContributeContextUpdate:outcomeContributeContextUpdateReducers,
    outcomeMoneyCategoryUpdate:outcomeMoneyCategoryUpdateReducers,

    incomeMoneyCategoryDetail:incomeMoneyCategoryDetailsReducer,
    outcomeMoneyCategoryDetail:outcomeMoneyCategoryDetailsReducer,
    outcomeContributeContextDetail:outcomeContributeContextDetailsReducer,
    incomeContributeContextDetail:incomeContributeContextDetailsReducer,



    semesterList:semesterListReducers,
    semesterDetail:semesterDetailsReducer,
    semesterAdd:semesterAddReducers,
    semesterUpdate:semesterUpdateReducers,


    outcomeFinanceList:outcomeFinanceListReducer,
})


const userInfoFromStorage = localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')): null

const userInfoFromGoogle =localStorage.getItem('givenName') ?
    JSON.parse(localStorage.getItem('givenName')): null

 

const initialState = {
    
    userLogin:{ userInfo : userInfoFromStorage },
    userLoginGoogle:{userGoogleInfo : userInfoFromGoogle}
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store