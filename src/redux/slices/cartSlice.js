import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const initialState = {
  listCart: [],
  amountCart: 0,
  totalPrice: 0
};

const cart = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    resetCart: () => initialState,
    emptycart: (state) => {
      state.listCart = [];
    },
    addItemCart: (state, action) => {
      const data = action.payload;
      const findItem = state.listCart.find(item => item._id == data._id);
      if (!findItem) {
        state.listCart = state.listCart.concat({ ...data, amount: 1 })
        toast.success('Plato agregado');
      } else {
        toast.error('Plato ya fue agregado!');
      }
    },
    removeMoreCart: (state, action) => {
      const data = action.payload;
      state.listCart.filter(item => item._id != data._id)
    },
    addMoreItemsCart: (state, action) => {
      const _id = action.payload;
      const findItem = state.listCart.find(item => item._id == _id)
      if (findItem) {
        findItem.amount = findItem.amount + 1;
      }
    },
    removeMoreItemsCart: (state, action) => {
      const _id = action.payload;
      const findItem = state.listCart.find(item => item._id == _id);
      if (findItem.amount === 1) {
        state.listCart = state.listCart.filter(item => item._id != _id)
      } else {
        findItem.amount = findItem.amount - 1;
      }
    },
    getAmountCart: (state) => {
      let amount = 0;
      let total = 0;
      state.listCart.forEach((item) => {
        amount += item.amount;
        total += item.price * item.amount;
      })
      state.amountCart = amount;
      state.totalPrice = total;
    }
  },
});


export const { resetCart, emptycart, addItemCart, removeItemCart, addMoreItemsCart, removeMoreItemsCart, getAmountCart } = cart.actions
export default cart.reducer