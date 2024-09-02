import { createAction, createReducer, on } from '@ngrx/store';
import { ProductsApiAction, ProductsPageActions } from './products.actions';
import { Product } from '../product.model';

import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';

export interface ProductsState extends EntityState<Product> {
  showProductCode: boolean;
  loading: boolean;
  // removed after adding entity 
  // products: Product[];
  errorMessage: string;
}

const adapter: EntityAdapter<Product> = createEntityAdapter<Product>({})


const intitialState: ProductsState = adapter.getInitialState( {
  showProductCode: true,
  loading: false,
  // products: [],
  errorMessage: ''
});

export const productsReducer = createReducer(
  intitialState,
  on(ProductsPageActions.toggleShowProductCode, (state) => ({
    ...state,
    showProductCode: !state.showProductCode,
  })),
  on(ProductsPageActions.loadProducts, (state) => adapter.setAll([], {
    ...state,
    loading: true,
    errorMessage: ''
  })),
  on(ProductsApiAction.productsLoadedSuccess, (state, 
    { products }) => adapter.setAll(products, {
    ...state,
    loading: false,
    errorMessage: '',
    

  })),
  on(ProductsApiAction.productsLoadedFail,(state, {message}) => adapter.setAll([], {
    ...state,
    errorMessage:message
  })),
  on(ProductsPageActions.addProducts,(state) => ({
    ...state,
    loading:true,
    errorMessage:''
  })),

  on(ProductsApiAction.productsAddedSuccess,(state,{product}) => adapter.addOne(product,{
    ...state,
    loading:false
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
  on(ProductsApiAction.productsUpdatedSuccess,(state,{update
  })=> adapter.updateOne(update, {
    ...state,
    loading:false,
   
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
  on(ProductsApiAction.productsDeletedSuccess,(state,{id})=> adapter.removeOne(id,{
    ...state,
    loading:false,
  // 
    // products: state.products.filter((existingProduct) => existingProduct.id !== id)
  })),
  on(ProductsApiAction.productsDeletedFail,(state,{message}) => ({
    ...state,
    loading:false,
    errorMessage:message
  }))
);

const {
  selectAll,
  selectEntities
} = adapter.getSelectors();

export const selectProductsEntities = selectEntities;

export const selectProducts = selectAll;