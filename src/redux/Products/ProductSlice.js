import { createSlice } from '@reduxjs/toolkit';
import {
  getProducts,
  createProducts,
  deleteProducts,
  editProducts,
} from './ProductOperation';

const initialState = {
  data: {
    items: [],
    loading: false,
    error: null,
  },
};
const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getProducts.pending, state => {
        state.data.loading = true;
        state.data.error = null;
      })
      .addCase(getProducts.fulfilled, (state, { payload }) => {
        state.data.loading = false;
        state.data.items = payload;
      })
      .addCase(getProducts.rejected, (state, { payload }) => {
        state.data.loading = false;
        state.data.error = payload;
      })
      //add
      .addCase(createProducts.pending, state => {
        state.data.loading = true;
        state.data.error = null;
      })
      .addCase(createProducts.fulfilled, (state, { payload }) => {
        state.data.loading = false;
        state.data.items = [...state.data.items, payload];
      })
      .addCase(createProducts.rejected, (state, { payload }) => {
        state.data.loading = false;
        state.data.error = payload;
      })
      //edit
      .addCase(editProducts.pending, state => {
        state.data.loading = true;
        state.data.error = null;
      })
      .addCase(editProducts.fulfilled, (state, { payload }) => {
        state.data.loading = false;
        const inx = state.data.items.findIndex(prod => prod.id === payload.id);
        state.data.items[inx] = payload;
      })
      .addCase(editProducts.rejected, (state, { payload }) => {
        state.data.loading = false;
        state.data.error = payload;
      })
      //delete
      .addCase(deleteProducts.pending, state => {
        state.data.loading = true;
        state.data.error = null;
      })
      .addCase(deleteProducts.fulfilled, (state, { payload }) => {
        state.data.loading = false;
        const inx = state.data.items.findIndex(prod => prod.id === payload);
        state.data.items.splice(inx, 1);
      })
      .addCase(deleteProducts.rejected, (state, { payload }) => {
        state.data.loading = false;
        state.data.error = payload;
      });
  },
});

export default productsSlice;
