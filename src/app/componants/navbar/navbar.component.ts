import { Component, inject } from '@angular/core';
import { UserService } from './../../services/auth/user.service';
import { AuthService } from '../../services/auth/auth.service';
import { AuthGuardService } from '../../services/auth/auth-guard.service';
import { IsAdminService } from '../../services/auth/is-admin.service';
import { ShoppingCartService } from '../../services/general/shopping-cart.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  uService = inject(UserService);
  authService = inject(AuthService);
  agService = inject(AuthGuardService);
  iAService = inject(IsAdminService);
  cartService = inject(ShoppingCartService);
  //numberOfItemsInTheCart: number = this.cartService;

  onLogOut() {
    this.authService.logOut();
  }
}
