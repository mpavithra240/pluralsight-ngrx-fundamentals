import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ProductsState } from "./products.reducer";
import { sumProducts } from "src/app/utils/sum-products";
import { getRouterSelectors } from "@ngrx/router-store";

export const selectProductState = createFeatureSelector<ProductsState>('products');

export const selectProducts = createSelector(
    selectProductState,
    (productsState) => productsState.products
)

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
        selectProducts,
        selectRouteParams,
        (products,{id}) => products.find((product) => product.id === parseInt(id))
    )