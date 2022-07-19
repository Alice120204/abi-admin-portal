import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../authentication.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-auth-screen',
  templateUrl: './auth-screen.component.html',
  styleUrls: ['./auth-screen.component.css']
})
export class AuthScreenComponent implements OnInit {
  inputEmail = new FormControl('', Validators.required);
  inputPassword = new FormControl('', Validators.required);
  // @ts-ignore
  snackBar: MatSnackBar;
  authForm = new FormGroup({
    inputEmail: this.inputEmail,
    inputPassword: this.inputPassword
  });
  constructor(private auth: AuthenticationService) { }

  ngOnInit(): void {
  }
  logIn(){
    this.auth.SignIn(this.inputEmail.value, this.inputPassword.value);
  }
}
