import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { GET_CART, DELETE_CART_ITEM, SAVE_CART_ITEM, CART_CHANGE_PRODUCT_QUANTITY, CHECKOUT_ADD_PAYMENT, GET_PROFILE,POST_CART,GET_ERRORS} from './types';
import {getEmail} from '../Components/SignUp/helperApis';

export const getCart = () => dispatch => {
    let url = '/getCart/'+getEmail();
    let result = {};
     axios.get(url)
      .then(response =>
        { 
          let flag = Object.keys(response.data).length!==0;
          result = {data : response.data, status : flag}
          dispatch({type: GET_CART, payload: result});  
        })
      .catch(err => {
        console.log("GET CART ERROR -- ",err);
        result = {data : err, status : false}
        dispatch({type: GET_CART, payload: result})}
        );
};

export const postProductToCart = (data) => dispatch => {
  console.log("Inside post product add to cart actions")
  console.log(data);

  return axios.post('/addToCart', data)
      .then(res =>{
        console.log(res);
         dispatch({
        type: POST_CART,
        payload: res.status
    })})
      .catch(err => {
          console.log("Got an error", err);
          dispatch({
              type: GET_ERRORS,
              payload: err.response.data
          })
      }
      );
};


export const deleteCartItem = (payload) => dispatch => {
  let url = '/deleteCartItem';
  let result = {};
   axios.put(url, payload)
    .then(response =>
      { 
        let url = '/getCart/'+getEmail();
        axios.get(url)
        .then(response =>
          { 
            let flag = Object.keys(response.data).length!==0;
            result = {data : response.data, status : flag}
            dispatch({type: GET_CART, payload: result});  
          })
        .catch(err => {
          console.log("GET CART ERROR -- ",err);
          result = {data : err, status : false}
          dispatch({type: GET_CART, payload: result})}
          );
        //dispatch({type: DELETE_CART_ITEM, payload: result});  
      })
    .catch(err => {
      // console.log("GET CART ERROR -- ",err);
      // result = {data : err, status : false}
      dispatch({type: DELETE_CART_ITEM, payload: err})}
      );
};


export const saveForLater = (payload) => dispatch => {
  let url = '/saveCartItem';
  let result = {};
   axios.put(url, payload)
    .then(response =>
      { 
        let url = '/getCart/'+getEmail();
        axios.get(url)
        .then(response =>
          { 
            let flag = Object.keys(response.data).length!==0;
            result = {data : response.data, status : flag}
            dispatch({type: GET_CART, payload: result});  
          })
        .catch(err => {
          console.log("GET CART ERROR -- ",err);
          result = {data : err, status : false}
          dispatch({type: GET_CART, payload: result})}
          ); 
      })
    .catch(err => {
      //alert("ACTION ERROR===="+JSON.stringify(err));
      console.log("GET CART ERROR -- ",err);
      result = {data : err, status : false}
      dispatch({type: SAVE_CART_ITEM, payload: result})}
      );
};


export const changeQuantity = (payload) => dispatch => {
  let url = '/cartChangeProductQuantity';
  let result = {};
   axios.put(url, payload)
    .then(response =>
      { 
        let url = '/getCart/'+getEmail();
        axios.get(url)
        .then(response =>
          { 
            let flag = Object.keys(response.data).length!==0;
            result = {data : response.data, status : flag}
            dispatch({type: GET_CART, payload: result});  
          })
        .catch(err => {
          console.log("GET CART ERROR -- ",err);
          result = {data : err, status : false}
          dispatch({type: GET_CART, payload: result})}
          ); 
      })
    .catch(err => {
      console.log("GET CART ERROR -- ",err);
      result = {data : err, status : false}
      dispatch({type: CART_CHANGE_PRODUCT_QUANTITY, payload: result})}
      );
};

export const addPaymentOption = (newCard) => dispatch => {
  //alert("YYYYY"+JSON.stringify(newCard))
  //alert("ACTION DATA =="+JSON.stringify(newCard));
  axios.post('/addPaymentInfo', newCard)
      .then(res => 
      {

        axios('/getCustomerProfile',
        {
            method: 'get',
        })
        .then(res => {
            console.log(res.data);
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            })
        }
        )
        .catch(err => 
          {
            dispatch({type: CHECKOUT_ADD_PAYMENT, payload: {}})
          });

        //dispatch({type: CHECKOUT_ADD_PAYMENT, payload: res});
      })
      .catch(err => 
      {
        dispatch({type: CHECKOUT_ADD_PAYMENT, payload: {}})
      });
};