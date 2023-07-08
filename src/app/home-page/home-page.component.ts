import { Component } from '@angular/core';

import { ProductsService } from './shared/products.service';
import { Product } from './shared/product.model';
import { AuthService } from '../helpers/auth.service';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent {
  public productsList!: Product[];
  public productsWithDiscountApplied: Product[] = [];
  public mostSelledProducts: Product[] = [];
  public isLoggedIn: boolean = true; //set to default true just for display purposes

  constructor(
    private productsService: ProductsService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.setToken();
    // getting mock list of products and mapping it according to my interface
    this.productsService.getProducts().subscribe((list) => {
      this.productsList = list;
      if (this.productsList) {
        this.productsWithDiscountApplied = this.productsList.filter(
          (product) => product.discountPercentage > 0
        );

        this.mostSelledProducts = this.productsList.filter(
          (product) => product.price < 200
        );
      }
    });
  }
}
