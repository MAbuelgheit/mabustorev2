import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private afs: AngularFirestore) {}

  getCategories() {
    return this.afs
      .collection('categories')
      .valueChanges()
      .pipe(map((documents) => documents.map((doc) => (doc as any).name))); // Observable of all documents
  }
}
