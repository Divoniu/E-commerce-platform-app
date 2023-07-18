import { Injectable, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NavBarComponent } from '../../nav-bar/nav-bar.component';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  constructor(
    private httpClient: HttpClient,
    @Optional() public NavBarComponent: NavBarComponent
  ) {}


  private url = 'http://localhost:8081/api';

  createOrder(productId: number) {
    const url = `${this.url}/orderItems/${productId}?quantity=1`;
    return this.httpClient.post(url, {});
  }

  deleteOrderItem(productId: number) {
    const url = `${this.url}/orderItems/${productId}`;
    return this.httpClient.delete(url, {responseType: 'text'})
  }

  getOrderItems(): Observable<any> {
    const url = `${this.url}/orderItems`;
    return this.httpClient.get<any>(url);
  }

  updateOrderQuantity(productId: number, quantity: number) {
    const url = `${this.url}/orderItems/${productId}/quantity?quantity=${quantity}`;
    return this.httpClient.put(url, {}, {responseType: 'text'});
  }
}
