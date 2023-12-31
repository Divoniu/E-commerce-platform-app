import {Component, OnInit} from '@angular/core';
import {MockProductsService} from "../home-page/shared/mock-products.service";
import {MockProductDetailed} from "../home-page/shared/mockProduct.model";
import {deleteFunction} from "./utilities/utilities";

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {

  visible = false;
  header = '';
  products: Array<MockProductDetailed> = [];
  mockProductsList = [];
  selectedProduct: any = [];
  rows: any = [5, 10, 15];
  row: any = 5;

  constructor(private mockProductsService: MockProductsService) {
  }

  showDialogNewProduct() {
    this.visible = true;
    this.header = 'Add new product'
  }

  showDialogEditProduct(product: any) {
    this.visible = true;
    this.header = 'Edit product'
    this.selectedProduct = product;
  }

  showDialogDeleteProduct(product: any, event: any) {
    this.visible = true;
    event.stopPropagation();
    this.header = 'Delete'
    this.selectedProduct = product;
  }

  onClose() {
    this.visible = false;
  }

  ngOnInit(): void {
    this.mockProductsService.getMockProducts().subscribe((list) => {
      this.mockProductsList = list.products.map((product: any) => {
        return {
          id: product.id,
          name: product.title,
          photos: product.images,
          price: product.price,
          rating: product.rating,
          reviews: ['No reviews available'],
          discount: product.discount,
          category: product.category,
          description: product.description,
          stock: product.stock,
        };
      });
    });
  }

  delete() {
    deleteFunction(this.mockProductsService, this.selectedProduct.id, this.products)
      .subscribe((items: Array<any>) => {
        this.products = items;
      });
  }

  selectRows(event: any) {
    this.row = +event.value;
  }
}
