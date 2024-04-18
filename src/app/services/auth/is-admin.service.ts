import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UserService } from './user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
export interface user {
  isAdmin: boolean;
}
@Injectable({
  providedIn: 'root',
})
export class IsAdminService implements OnInit {
  isAdmin: boolean = false;

  constructor(
    private afs: AngularFirestore,
    private uService: UserService,
    private sb: MatSnackBar
  ) {
    this.uService.getUserId().subscribe((id) => {
      if (id != '') {
        this.afs
          .collection('users')
          .doc(id)
          .get()
          .subscribe((doc) => {
            if (doc.exists) {
              const userData = doc.data() as user;
              this.isAdmin = userData.isAdmin;
            } else {
              sb.open('User not logged in', 'hide', {
                duration: 1000,
              });
            }
          });
      }
    });
  }

  ngOnInit() {}
}
