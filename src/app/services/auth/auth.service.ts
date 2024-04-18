import { Injectable } from '@angular/core';
import { AuthProvider, GoogleAuthProvider } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private afAuth: AngularFireAuth,
    private sb: MatSnackBar,
    private router: Router
  ) {}
  private AuthLogin(provider: AuthProvider) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.sb.open('You have been successfully logged in!', 'Hide', {
          duration: 5000,
        });
        this.router.navigate(['/']);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  GoogleAuth() {
    return this.AuthLogin(new GoogleAuthProvider());
  }
  logOut() {
    this.afAuth.signOut();
  }
}
