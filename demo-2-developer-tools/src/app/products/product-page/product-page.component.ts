import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from '../product.model';
import { ProductsService } from '../products.service';
import { Store } from '@ngrx/store';
import { selectProductById, selectProductsLoading } from '../state/products.selector';
import { ProductsPageActions } from '../state/products.actions';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css'],
})
export class ProductPageComponent {
  // product$: Observable<Product> | undefined;

  // to use router args 
  product$ = this.store.select(selectProductById)
  loading$ = this.store.select(selectProductsLoading)
  constructor(
    private productsService: ProductsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private store: Store,
    
  ) {}

  ngOnInit() {
    // removed after adding ngrx router selector
    // const productId = parseInt(this.activatedRoute.snapshot.params['id']);
    // this.getProduct(productId);
  }

  // getProduct(id: number) {
  //   this.product$ = this.productsService.getById(id);
  // }

  

  addProduct(product: Product) {
    // this.productsService.add(product).subscribe(this.goToProductsPage);
    this.store.dispatch(ProductsPageActions.addProducts({product}))
  }

  updateProduct(product: Product) {
    this.store.dispatch(ProductsPageActions.updateProducts({product}))
    // this.productsService.update(product).subscribe(this.goToProductsPage);
  }

  deleteProduct(id: number) {
    this.store.dispatch(ProductsPageActions.deleteProducts({id}))
    // this.productsService.delete(id).subscribe(this.goToProductsPage);
  }

  goToProductsPage = () => this.router.navigate(['/products']);

  
}
