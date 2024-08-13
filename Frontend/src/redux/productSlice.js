import {createSlice} from '@reduxjs/toolkit'

const productSlice = createSlice({
    name:"product",
    initialState:{
        products: [],
    },
    reducers:{
        addProductsDetails:(state,action)=>{
            state.products = action.payload;
        }
    }
})

export const{addProductsDetails} = productSlice.actions;
export default productSlice.reducer;