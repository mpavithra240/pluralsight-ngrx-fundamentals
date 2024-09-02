import { createAction, createReducer, on } from '@ngrx/store';
import { ProductsApiAction, ProductsPageActions } from './products.actions';
import { Product } from '../product.model';

export interface ProductsState {
  showProductCode: boolean;
  loading: boolean;
  products: Product[];
  errorMessage: string;
}

const intitialState: ProductsState = {
  showProductCode: true,
  loading: false,
  products: [],
  errorMessage: ''
};

export const productsReducer = createReducer(
  intitialState,
  on(ProductsPageActions.toggleShowProductCode, (state) => ({
    ...state,
    showProductCode: !state.showProductCode,
  })),
  on(ProductsPageActions.loadProducts, (state) => ({
    ...state,
    loading: true,
    errorMessage: '',
    products: [],
  })),
  on(ProductsApiAction.productsLoadedSuccess, (state, { products }) => ({
    ...state,
    loading: false,
    errorMessage: '',
    products,

  })),
  on(ProductsApiAction.productsLoadedFail,(state, {message}) => ({
    ...state,
    products:[],
    errorMessage:message
  })),
  on(ProductsPageActions.addProducts,(state) => ({
    ...state,
    loading:true,
    errorMessage:''
  })),
  on(ProductsApiAction.productsAddedSuccess,(state,{product}) => ({
    ...state,
    loading:false,
    products: [...state.products,product]
  })),
  on(ProductsApiAction.productsAddedFail, (state,{message}) => ({
    ...state,
    loading:false,
    errorMessage:message
  })),
  on(ProductsPageActions.updateProducts,(state) => ({
    ...state,
    loading:true,
    errorMessage:'',
  })),
  on(ProductsApiAction.productsUpdatedSuccess,(state,{product})=>({
    ...state,
    loading:false,
    products:state.products.map((existingProduct) =>
      existingProduct.id === product.id?product:existingProduct
    )
  })),
  on(ProductsApiAction.productsUpdatedFail,(state,{message}) => ({
    ...state,
    loading:false,
    errorMessage:message
  })),
  on(ProductsPageActions.deleteProducts,(state) => ({
    ...state,
    loading:true,
    errorMessage:'',
  })),
  on(ProductsApiAction.productsDeletedSuccess,(state,{id})=>({
    ...state,
    loading:false,
    products: state.products.filter((existingProduct) => existingProduct.id !== id)
  })),
  on(ProductsApiAction.productsDeletedFail,(state,{message}) => ({
    ...state,
    loading:false,
    errorMessage:message
  }))
);
