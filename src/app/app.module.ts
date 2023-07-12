import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { GalleriaModule } from 'primeng/galleria';
import { StyleClassModule } from 'primeng/styleclass';
import { CardModule } from 'primeng/card';
import { RatingModule } from 'primeng/rating';
import { HomePageComponent } from './home-page/home-page.component';

import { CarouselModule } from 'primeng/carousel';
import { TagModule } from 'primeng/tag';
import { ProductsListCarouselComponent } from './home-page/products-list-carousel/products-list-carousel.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { InputSwitchModule } from 'primeng/inputswitch';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenubarModule } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';

import { SkeletonModule } from 'primeng/skeleton';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ProductStatusComponent } from './home-page/products-list-carousel/product-status/product-status.component';

import { AdminPageComponent } from './admin-page/admin-page.component';
import { UpdateProductComponent } from './admin-page/update-product/update-product.component';
import { DialogModule } from 'primeng/dialog';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { PaginatorModule } from 'primeng/paginator';
import { ProductAllComponent } from './product-all/product-all.component';
import { SliderModule } from 'primeng/slider';
import { DropdownModule } from 'primeng/dropdown';
import { ProductCategoriesComponent } from './product-categories/product-categories.component';
import { ProductListComponent } from './product-all/product-list/product-list.component';
import { FiltersComponent } from './product-all/filters/filters.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { BasketpageComponent } from './shopping-cart/basketpage/basketpage.component';
import { TableModule } from 'primeng/table';
// import { httpInterceptorProviders } from './helpers/http.interceptor';
import { LoginComponent } from './login/login.component';
import { AuthInterceptor } from './services/auth.interceptor';
import { PanelModule } from 'primeng/panel';
import { DeleteModalComponent } from './admin-page/delete-modal/delete-modal.component';
import { RegisterComponent } from './register/register.component';
import { AccountDetailsComponent } from './account-details/account-details.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductDetailsComponent,
    HomePageComponent,
    ProductsListCarouselComponent,

    NavBarComponent,
    ProductStatusComponent,
    AdminPageComponent,
    UpdateProductComponent,
    ProductAllComponent,
    ProductListComponent,
    FiltersComponent,
    ProductCategoriesComponent,
    ShoppingCartComponent,
    BasketpageComponent,
    DeleteModalComponent,
    LoginComponent,
    RegisterComponent,
    AccountDetailsComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    MenubarModule,
    CarouselModule,
    ButtonModule,
    TagModule,
    InputSwitchModule,
    SkeletonModule,
    RatingModule,
    OverlayPanelModule,
    BadgeModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    DialogModule,
    FileUploadModule,
    ToastModule,
    TableModule,
    InputTextModule,
    DropdownModule,
    InputTextareaModule,
    InputNumberModule,
    PaginatorModule,
    SliderModule,
    RatingModule,
    CardModule,
    GalleriaModule,
    StyleClassModule,
    PanelModule,

    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,

    InputTextModule,
    ButtonModule,
    AppRoutingModule,
    HttpClientModule,
  ],

  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
