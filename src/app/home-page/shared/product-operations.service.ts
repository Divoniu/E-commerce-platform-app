import { Injectable } from '@angular/core';
import { ProductsService } from './products.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Product } from './product.model';
import { OrderItem } from './orderItem.model';
import { BasketService } from 'src/app/shopping-cart/shared/basket.service';

@Injectable({
  providedIn: 'root',
})
export class ProductOperationsService {
  constructor(
    private productsService: ProductsService,
    private router: Router,
    private authService: AuthService,
    private basketService: BasketService
  ) {}

  addToFavorite(product: Product) {
    if (this.authService.isAuthenticated()) {
      if (product.favUserIds.includes(product.userId)) {
        // if product already exists the favorite list delete it
        this.productsService
          .deleteFavoriteProduct(product.id)
          .subscribe((res) => {
            this.productsService.favoriteProductsObservable.next({
              productAction: 'delete',
              favoriteProduct: product,
            });
            product.favUserIds = product.favUserIds.filter(
              (id) => id !== product.userId
            );
          });
      } else {
        this.productsService.addFavoriteProduct(product.id).subscribe((res) => {
          this.productsService.favoriteProductsObservable.next({
            productAction: 'add',
            favoriteProduct: product,
          });

          product.favUserIds.push(product.userId);
        });
      }
    } else {
      this.router.navigate(['login']);
    }
  }

  addToCart(product: Product, basketItems: OrderItem[] = []) {
    if (this.authService.isAuthenticated()) {
      let orderItem = basketItems.filter(
        (item: OrderItem) => item.productId === product.id
      );
      if (orderItem.length) {
        if (product.unitsInStock >= orderItem[0].quantity + 1) {
          this.productsService
            .updateOrderQuantity(orderItem[0].id, orderItem[0].quantity + 1)
            .subscribe();
        } else {
          console.log('quantity exceeds stock');
          //display somehow an error message
        }
      } else {
        this.productsService.addProductToOrder(product.id, 1).subscribe();
      }
    } else {
      this.router.navigate(['login']);
    }
  }
  getProductImage(productImage: string) {
    return `http://localhost:8081/api/images/download?name=${productImage}`;
  }
}
