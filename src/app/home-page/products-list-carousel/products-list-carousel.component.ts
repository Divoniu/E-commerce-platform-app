import { Component, Input, SimpleChanges } from '@angular/core';
import { Product } from '../shared/product.model';
import { ProductsService } from '../shared/products.service';
import { Router } from '@angular/router';
import { OrderItem } from '../shared/orderItem.model';

@Component({
  selector: 'app-products-list-carousel',
  templateUrl: './products-list-carousel.component.html',
  styleUrls: ['./products-list-carousel.component.css'],
})
export class ProductsListCarouselComponent {
  constructor(
    private productsService: ProductsService,
    private router: Router
  ) {}
  @Input() productsToDisplay!: Product[];

  public dataLoaded: boolean = false;
  private orderItems: OrderItem[] = [];
  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (this.productsToDisplay && this.productsToDisplay.length > 0) {
      this.dataLoadingStatus();
    }
  }
  dataLoadingStatus() {
    this.dataLoaded = true;
  }
  addToCart(product: Product) {
    // tb sa verific in lista de orderItems daca exista deja produsul asta
    // cand adaug in cart am nevoie sa verific daca produsul exista deja, daca exista incrementeaza cantitatea ca cantitatea pe care o transmit, daca nu fa post request si updateaza-mi lista de produse.
    // ca sa updatez lista de produse cred ca trebuie sa o fac manual, sa updatez eu frontendul????
    // iar probabil la reload o sa se modifice din be
    this.productsService.addProductToOrder(product.id, 1).subscribe((res) => {
    });

    //track shopping cart through local storage
    // const shoppingCartList: Product[] = JSON.parse(
    //   localStorage.getItem('shoppingCart') || '[]'
    // );
    // if (shoppingCartList.some((element) => element.id === product.id)) {
    //   //TODO change quantity
    // } else shoppingCartList.push(product);
    // localStorage.setItem('shoppingCart', JSON.stringify(shoppingCartList));
    // this.productsService.shoppingCartObservable.next(shoppingCartList);
    // if product already exists don't add it
  }
  addToFavorite(product: Product) {
    const favoriteProductsList: Product[] = JSON.parse(
      localStorage.getItem('favoriteProducts') || '[]'
    );
    if (favoriteProductsList.some((element) => element.id === product.id)) {
      //TODO change quantity
    } else favoriteProductsList.push(product);

    localStorage.setItem(
      'favoriteProducts',
      JSON.stringify(favoriteProductsList)
    );
    this.productsService.favoriteProductsObservable.next(favoriteProductsList);
  }
  getProductDetails(id: number) {
    this.router.navigate([`product-details/${id}`]);
  }
  getStock(stock: number) {
    return stock > 50
      ? 'In stock'
      : stock <= 50 && stock > 10
      ? 'Limited stock'
      : stock <= 10 && stock > 1
      ? 'Last ' + stock + ' pieces'
      : stock === 1
      ? 'Last piece available'
      : 'Out of stock';
  }
}
// <!-- notificare ca am adaugat in cos -->
// <!-- notificare ca am adaugat la favorite plus update badge-->
