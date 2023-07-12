import { Component } from '@angular/core';
import { ProductsService } from './shared/products.service';
import { Product } from './shared/product.model';
import { AuthService } from '../services/auth.service';

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
    //todo: commented out. check!!!
    // this.authService.setToken();

    // getting mock list of products and mapping it according to my interface
    this.productsService.getProducts().subscribe((list) => {
      this.productsList = list.map((item: Product) => {
        return { ...item, rating: this.getAverageRating(item) };
      });

      if (this.productsList) {
        this.productsWithDiscountApplied = this.productsList.filter(
          (product) => product.discountPercentage > 0
        );

        this.mostSelledProducts = this.productsList.filter(
          (product) => product.price < 200
        );
      }

      console.log(this.productsList);
    });
  }

  getAverageRating(product: Product) {
    // tb sa fac getproductreviews si de acolo iau fiecare rating
    // ori am nevoie sa calculeze backendul average rating
    //
    //ori sa puna reviewurile intr un array in product
    const initialValue = 0;

    const sumOfRatings = product.reviews.reduce(
      (acc, currVal) => acc + currVal.rating,
      initialValue
    );
    const averageRating = sumOfRatings / product.reviews.length;
    product.rating = averageRating;
  }
}
