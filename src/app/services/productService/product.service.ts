import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { product } from '../../product.interface';
import { v4 as uuidv4 } from 'uuid'; // Install uuid package
import { map } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private afs: AngularFirestore, private sb: MatSnackBar) {}

  addProduct(productData: product) {
    // Generate a unique ID
    this.afs
      .collection('products')
      .add(productData)
      .then((docRef) => {
        this.afs
          .collection('products')
          .doc(docRef.id)
          .update({ ID: docRef.id });
        this.sb.open(`Added a new product ID : ${docRef.id}`, 'hide', {
          duration: 5000,
        });
      });
  }

  getProducts() {
    return this.afs.collection('products').valueChanges(); // Observable of all documents
  }
  getProductById(productId: string) {
    return this.afs.collection('products').doc(productId).get();
  }
  updateProduct(id: string, data: any) {
    return this.afs
      .collection('products')
      .doc(id)
      .update(data)
      .then(() => {
        this.sb.open('Product updated successfully', 'Hide');
      })
      .catch((error) => {
        this.sb.open(`Error deleting document: , ${error}`, 'Hide');
      });
  }
  deleteProduct(productId: string) {
    this.afs
      .collection('products')
      .doc(productId)
      .delete()
      .then(() => {
        this.sb.open('Product deleted successfully', 'Hide');
      })
      .catch((error) => {
        this.sb.open(`Error deleting document: , ${error}`, 'Hide');
      });
  }
}
