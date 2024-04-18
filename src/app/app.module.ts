import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { NavbarComponent } from './componants/navbar/navbar.component';
import { ProductFormComponent } from './componants/forms/product-form/product-form.component';

import { AngularFireModule } from '@angular/fire/compat'; // Import for Angular 17
import { AngularFireAuthModule } from '@angular/fire/compat/auth'; // For AngularFire v13 or later
import { environment } from '../environments/environment';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ProductFormUpdateComponent } from './componants/forms/product-form-update/product-form-update.component';
import { ProductsComponent } from './componants/pages/admin/products/products.component';
import { OrdersComponent } from './componants/pages/admin/orders/orders.component';
import { MyordersComponent } from './componants/pages/myorders/myorders.component';
import { MycartComponent } from './componants/pages/mycart/mycart.component';
import { HomeComponent } from './componants/pages/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProductFormComponent,
    ProductFormUpdateComponent,
    ProductsComponent,
    OrdersComponent,
    MyordersComponent,
    MycartComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatCardModule,

    FormsModule,
    AngularFireModule.initializeApp({
      apiKey: 'AIzaSyA8IuDZ7zpd7tX3k8dOC4HlTmqPe6JPbEY',

      authDomain: 'store-app-fa713.firebaseapp.com',

      projectId: 'store-app-fa713',

      storageBucket: 'store-app-fa713.appspot.com',

      messagingSenderId: '1094290472284',

      appId: '1:1094290472284:web:939114ffb44e9778709599',
    }),
    AngularFireAuthModule,
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideDatabase(() => getDatabase()),
  ],
  providers: [provideClientHydration(), provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule {}
