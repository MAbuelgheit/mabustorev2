import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductFormComponent } from './componants/forms/product-form/product-form.component';
import { ProductFormUpdateComponent } from './componants/forms/product-form-update/product-form-update.component';
import { ProductsComponent } from './componants/pages/admin/products/products.component';
import { OrdersComponent } from './componants/pages/admin/orders/orders.component';
import { LoginComponent } from './componants/pages/auth/login/login.component';
import { AuthGuardService } from './services/auth/auth-guard.service';
import { MyordersComponent } from './componants/pages/myorders/myorders.component';
import { MycartComponent } from './componants/pages/mycart/mycart.component';
import { HomeComponent } from './componants/pages/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },

  { path: 'my/orders', component: MyordersComponent },
  { path: 'my/cart', component: MycartComponent },

  { path: 'login', component: LoginComponent },

  {
    path: 'admin/orders',
    component: OrdersComponent,
    canActivate: [AuthGuardService],
    canDeactivate: ['login'],
  },
  {
    path: 'admin/products',
    component: ProductsComponent,
    //canActivate: [AuthGuardService],
  },
  {
    path: 'admin/products/new',
    component: ProductFormComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'admin/products/:ID',
    component: ProductFormUpdateComponent,
    canActivate: [AuthGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
