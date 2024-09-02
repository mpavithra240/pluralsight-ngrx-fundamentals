import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ProductsState } from "./products.reducer";
import { sumProducts } from "src/app/utils/sum-products";
import { getRouterSelectors } from "@ngrx/router-store";
import * as fromProducts from './products.reducer';

// chaged after adding enitity
//export const selectProductState = createFeatureSelector<ProductsState>('products');

// export const selectProducts = createSelector(
//     selectProductState,
//     (productsState) => productsState.products
// )
export const selectProductState = createFeatureSelector<fromProducts.ProductsState>('products')

export const selectProducts = createSelector(
    selectProductState,
    fromProducts.selectProducts
  );

export const selectProductsEntity = createSelector(
selectProductState,
fromProducts.selectProductsEntities
);
export const selectProductsLoading = createSelector(
    selectProductState,
    (productsState) => productsState.loading
)

export const selectProductsShowProductCode = createSelector(
    selectProductState,
    (productsState) => productsState.showProductCode
)

export const selectProductsErrorMessage = createSelector(
    selectProductState,
    (produtsState) => produtsState.errorMessage
)

export const selectProductsTotal = createSelector(
    selectProducts,
    sumProducts
)

// export const selectProductById = (id: string) => createSelector(
//     selectProducts,
//     (products) => products.find((product) => product.id === parseInt(id))
// )

export const { selectRouteParams } = getRouterSelectors();

export const selectProductById = createSelector(
        selectProductsEntity,
        selectRouteParams,
        (productEntities, { id }) => productEntities[id]
        // (products,{id}) => products.find(product) => product.id === parseInt(id))
    )

