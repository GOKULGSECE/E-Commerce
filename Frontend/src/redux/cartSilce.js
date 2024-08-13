import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name:"Cart",
    initialState:{
        cartItems: [],
        count: 0,
        totalamount:0,
        product:0
    },
    reducers:{
        addProduct:(state,action)=>{
            state.cartItems.push({...action.payload,quantity:1});
        },
        increment1:(state,action)=>{
            state.count+=action.payload;
        },
        decrement:(state,action)=>{
            state.count-=action.payload;
        },
        addcartitemsquantity:(state,action)=>{
            const select = state.cartItems.find((item)=>item.id === action.payload.id);
            select.quantity+=1
            },
        decreasecartitemquantity:(state,action)=>{
            const select = state.cartItems.find((item)=>item.id === action.payload.id);
            select.quantity-=1
        },
        producttotalamount:(state,action)=>{
            const select = state.cartItems.find((item)=>item.id === action.payload.id);
            state.totalamount += Math.ceil(select.price)
        },
        productcountincrement:(state,action)=>{
            state.count += action.payload
        },
        producttotalamountdecrement:(state,action)=>{
            const select = state.cartItems.find((item)=>item.id === action.payload.id);
            state.totalamount -= Math.ceil(select.price)
        },
        removecart:(state,action)=>{
            state.cartItems = state.cartItems.filter((item)=>item.id !== action.payload.id);
        },
        }
})

export const{addProduct,increment1,decrement,addcartitems,addcartitemsquantity,decreasecartitemquantity,producttotalamount,productcountdecrement,productcountincrement,producttotalamountdecrement,removecart} = cartSlice.actions;
export default cartSlice.reducer