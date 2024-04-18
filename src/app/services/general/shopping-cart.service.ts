import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { product } from './../../product.interface';
import { Cart } from '../../cart.interface';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService implements OnInit {
  constructor(private afs: AngularFirestore) {
    this.getOrCreateCart();
  }
  ngOnInit(): void {}
  numberOfItemsInTheCart: number = 0;
  cartID: string | null = null;
  private async createCart() {
    let cartRef = await this.afs
      .collection('shoppingCarts')
      .add({ ID: '', items: 0 });
    cartRef.update({
      ID: cartRef.id,
    });
    this.cartID = cartRef.id;
  }
  getOrCreateCart() {
    //this.cartID = localStorage.getItem('cartID');
    if (this.cartID) {
      console.log(this.cartID);
    }
  }
  addToCart(product: product) {}
}
