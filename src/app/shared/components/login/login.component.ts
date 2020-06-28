import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  email: string;
  password: string;

  constructor(private authenticationService: AuthService) { }

  ngOnInit(): void {
  }

  signIn() {
    this.authenticationService.login(this.email, this.password);
    this.resetCredentials();
  }

  signOut() {
    this.authenticationService.logout();
    this.resetCredentials();
  }

  resetCredentials() {
    this.email = '';
    this.password = '';
  }

}
