
import { ProductsService } from "../products.service";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ProductsApiAction, ProductsPageActions } from "./products.actions";
import { catchError, concatMap, exhaustMap, map, mergeMap, of, tap } from "rxjs";
import { Router } from "@angular/router";

@Injectable()
export class ProdcutEffects {

    ngrxOnInitEffects(){
        return ProductsPageActions.loadProducts();
    }

    constructor(
        private actions$: Actions,
        private productService: ProductsService,
        private router: Router
    ) {}

    loadProducts$ = createEffect(() => this.actions$.pipe(
        ofType(ProductsPageActions.loadProducts),
        exhaustMap(() => this.productService.getAll().pipe(
            map((products) => ProductsApiAction.productsLoadedSuccess({ products })),
            catchError((error) => of(ProductsApiAction.productsLoadedFail({message:error})))
        ))
    ))

    addProduct$ = createEffect(() => this.actions$.pipe(
        ofType(ProductsPageActions.addProducts),
        mergeMap(({product}) =>
        this.productService.add(product).pipe(
            map((newProduct) =>
                ProductsApiAction.productsAddedSuccess({product: newProduct})
            ),
            catchError((error) =>
            of(ProductsApiAction.productsAddedFail({message:error})))
        ))
    ))

    updateProduct$ = createEffect(() => this.actions$.pipe(
        ofType(ProductsPageActions.updateProducts),
        concatMap(({product}) =>
            this.productService.update(product).pipe(
                map(() =>
                    ProductsApiAction.productsUpdatedSuccess({update:{id: product.id, changes: product }})
                ),
                catchError((error) => 
                    of(ProductsApiAction.productsUpdatedFail({message:error}))
                )
            )
        )
    ))

    deleteProduct$ = createEffect(() => this.actions$.pipe(
        ofType(ProductsPageActions.deleteProducts),
        mergeMap(({id}) =>
            this.productService.delete(id).pipe(
                map(() =>
                    ProductsApiAction.productsDeletedSuccess({id})    
                ),
                catchError((error) =>
                    of(ProductsApiAction.productsDeletedFail({message:error}))
                )
            )
        )
    ))

    redirectToProductsPage$ = createEffect(() => this.actions$.pipe(
        ofType(
            ProductsApiAction.productsAddedSuccess,
            ProductsApiAction.productsUpdatedSuccess,
            ProductsApiAction.productsDeletedSuccess
        ), tap(() => this.router.navigate(['/products']))
    ),
    {dispatch: false}
    
    )
}
