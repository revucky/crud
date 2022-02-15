import { createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../services/api';

const ENDPOINT = 'posts';

const getProducts = createAsyncThunk('product/getProductsStatus', async () =>
  api.getData(ENDPOINT),
);

const createProducts = createAsyncThunk(
  'posts/createProductsStatus',
  newProduct => api.addItem(ENDPOINT, newProduct),
);
const editProducts = createAsyncThunk(
  'posts/editProductStatus',
  updatedProduct => api.editItem(ENDPOINT, updatedProduct),
);

const deleteProducts = createAsyncThunk('posts/deleteProductsStatus', id => {
  api.deleteItem(ENDPOINT, id);
  return id;
});

export { getProducts, createProducts, deleteProducts, editProducts };
