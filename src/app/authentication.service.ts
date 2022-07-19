import { Injectable } from '@angular/core';
import {AngularFireAuth, AngularFireAuthModule} from "@angular/fire/compat/auth";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Observable} from "rxjs";
import {Router} from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
errorCaught: boolean = false;
  userData: Observable<any>;
  // router!: Router;
  constructor(private angularFireAuth: AngularFireAuth, private snackBar: MatSnackBar, private router: Router) {
    this.userData = angularFireAuth.authState;
  }

  SignIn(email: string, password: string) {
    this.errorCaught = false;
    this.angularFireAuth.signInWithEmailAndPassword(email,
      password).then(res => {
      this.snackBar.open('Logged in as ABI_ADMIN', 'OK', {
        duration: 3000
      });
      this.router.navigate(['/home']);
    }).catch(error => {
      console.log('Something went wrong', error);
      this.snackBar.open('Invalid Email or Password', 'OK', {
        duration: 3000
      });
      email = '';
      password = '';
    });
  }

  SignOut() {
    this.angularFireAuth
      .signOut();
  }
}
