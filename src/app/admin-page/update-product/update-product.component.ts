import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {MockProductsService} from "../../home-page/shared/mock-products.service";
import {MockProductDetailed} from "../../home-page/shared/mockProduct.model";
import {MessageService} from "primeng/api";
import {HttpClient} from "@angular/common/http";

interface UploadEvent {
  originalEvent: Event;
  files: File[];
}

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css'],
  providers: [MessageService]
})
export class UpdateProductComponent implements OnInit {
  @Input() selectedProduct?: MockProductDetailed;
  @Input() show: any;
  @Input() header: any;
  @Output() closeEmitter = new EventEmitter();
  @Output() deleteEmitter = new EventEmitter();
  categories:any=[];
  visible = false;
  photos: any = [];
  selectedFile: any = [];
  message: string = '';
  mockProductsList:any=[];
  uploadedFiles: any[] = [];

  constructor(private fb: FormBuilder,
              private mockProduct: MockProductsService,
              private messageService: MessageService,
              private httpClient: HttpClient) {
  }

  newEditForm = this.fb.group({
    name: [''],
    photos: [['']],
    price: [0],
    category: [''],
    description: [''],
    stock: [0],
  })

  ngOnInit() {
    this.mockProduct.getMockProducts().subscribe((list) => {
      this.mockProductsList = list.products.map((product: any) => {
        this.categories=[...this.categories,product.category]
        this.categories = this.categories.filter((el:any, i:any, a:any) => i === a.indexOf(el))
      });
    });
  }


  newProductForm = this.fb.group({
    name: [''],
    photos: [''],
    price: [0],
    category: [''],
    description: [''],
    stock: [0],
  })


  ngOnChanges(changes: SimpleChanges) {
    if (changes['show'].currentValue != changes['show'].previousValue) {
      this.visible = changes['show'].currentValue;
      this.newEditForm.controls.name.setValue(this.selectedProduct!.name)
      this.newEditForm.controls.category.setValue(this.selectedProduct!.category)
      this.newEditForm.controls.price.setValue(this.selectedProduct!.price)
      this.newEditForm.controls.description.setValue(this.selectedProduct!.description)
      this.newEditForm.controls.stock.setValue(this.selectedProduct!.stock)
      this.newEditForm.controls.photos.setValue(this.selectedProduct!.photos)
    }
  }
  onClose(event: any) {

    this.newProductForm.controls.name.setValue('')
    this.newProductForm.controls.photos.setValue(null)
    this.newProductForm.controls.price.setValue(0)
    this.newProductForm.controls.category.setValue('')
    this.newProductForm.controls.description.setValue('')
    this.newProductForm.controls.stock.setValue(0)
    this.visible=false;
    this.closeEmitter.emit(this.visible)
  }

  onSubmit() {
    const product: MockProductDetailed = {
      name: this.newProductForm.controls.name.value!,
      price: +this.newProductForm.controls.price.value!,
      photos: this.newProductForm.controls.photos.value,
      description: this.newProductForm.controls.description.value!,
      category: this.newProductForm.controls.category.value!
    } as unknown as MockProductDetailed
    this.mockProduct.saveMockProducts(product)
      .subscribe(()=>this.visible=false);

  }

  onFileChanged(event: any) {
    this.selectedFile = event.target.files[0];
    // this.photos.push(this.file);
    // this.newProductForm.controls.photos.setValue(this.photos)
    // console.log(this.newProductForm.controls.photos.value)
    // this.newProductForm.patchValue({
    //   photos: file
    // });
    // console.log('asta e this.photos'+this.photos)
    // // this.newProductForm.get('photos')!.updateValueAndValidity()
    // const reader = new FileReader();
    // reader.onload = () => {
    //   this.imageURL = reader.result as string;
    // }
    // reader.readAsDataURL(file)
    // this.uploadedFiles.push(event);
    // this.messageService.add({severity: 'info', summary: 'Success', detail: 'File Uploaded with Basic Mode'});
    // console.log(this.newProductForm.controls.photos.value);
  }

  // onUpload() {
  //   console.log(this.selectedFile);
  //   const uploadImageData = new FormData();
  //   uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
  //   this.httpClient.post('http://localhost:4200/image/upload', uploadImageData, {observe: 'response'})
  //     .subscribe((response) => {
  //         if (response.status === 200) {
  //           this.message = 'Image uploaded successfully';
  //         } else {
  //           this.message = 'Image not uploaded successfully';
  //         }
  //       }
  //     );
  // }

  onUpload(event:UploadEvent) {
    for(let file of event.files) {
      this.uploadedFiles.push(file);
    }

    this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
  }

  onEditSubmit(id: any) {
    let updatedProduct: MockProductDetailed = {
      title: this.newEditForm.controls.name.value,
      price: this.newEditForm.controls.price.value,
      stock: this.newEditForm.controls.stock.value,
      description: this.newEditForm.controls.description.value,
      category: this.newEditForm.controls.category.value,
    } as unknown as MockProductDetailed
    console.log(this.newEditForm.controls.name.value)
    this.mockProduct.updateProduct(updatedProduct, id)
      .subscribe(() => this.visible=false)
  }

  delete(selectedProduct: MockProductDetailed | undefined) {
    this.deleteEmitter.emit(selectedProduct?.id);
    this.visible=false;
  }

  close(){
    this.visible=false;
    this.closeEmitter.emit(this.visible)
  }
}
