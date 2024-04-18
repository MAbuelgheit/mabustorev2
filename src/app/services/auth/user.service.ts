import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore'; // For AngularFire v13 or later
import { MatSnackBar } from '@angular/material/snack-bar';
import { getAuth, User } from 'firebase/auth';
import { BehaviorSubject, map, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  currentUser: User | null = null;
  username: string | null = null;
  email: string | null = null;
  userImgURL: string | null = null;
  userID = new BehaviorSubject<string>('');

  constructor(private firestore: AngularFirestore, private sb: MatSnackBar) {
    getAuth().onAuthStateChanged((user) => {
      this.currentUser = user;
      if (user) {
        this.username = user.displayName;
        this.email = user.email;
        this.userImgURL = user.photoURL;
        this.userID.next(user.uid);
        this.getUserId();
      } else {
        sb.open('No User Logged in', 'Hide', { duration: 500 });
      }
    });
  }

  getUserId(): Observable<string> {
    return this.userID;
  }
}
