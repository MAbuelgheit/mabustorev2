import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  Query,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class CategoryFilterService {
  constructor(private firestore: AngularFirestore) {}
  getItems(filterValue: string): AngularFirestoreCollection<any> {
    return this.firestore.collection('Product', (ref) =>
      ref.where('category', '==', filterValue)
    );
  }
}
