import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Product } from 'src/app/home-page/shared/product.model';
import { ProductsService } from 'src/app/home-page/shared/products.service';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css'],
})
export class DeleteModalComponent {
  @Output() deleteEmitter = new EventEmitter();
  @Output() closeEmitter = new EventEmitter();
  @Input() selectedProduct?: Product;
  @Input() header: any;
  @Input() deleteV: any;
  @Input() tokenDelete: any;
  deleteVisible = false;

  constructor(private productsService: ProductsService) {}

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes['deleteV'].currentValue);
    this.deleteVisible = changes['deleteV'].currentValue;
  }

  delete(selectedProduct: any) {
    console.log(this.tokenDelete);
    this.productsService.delete(selectedProduct!.id).subscribe();
    this.deleteEmitter.emit(selectedProduct?.id);
  }

  close() {
    this.deleteVisible = false;
    this.closeEmitter.emit(this.deleteVisible);
  }
}