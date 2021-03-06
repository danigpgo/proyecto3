import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signupform',
  templateUrl: './signupform.component.html',
  styleUrls: ['./signupform.component.css']
})
export class SignupformComponent implements OnInit {
  formInfo = {
    username: "",
    password: ""
  }

  message: string;
  user: object;
  constructor(public auth: AuthService, public router: Router) {
    this.user = this.auth.getUser();
    this.auth.getLoginEventEmitter()
      .subscribe(user => this.user = user);
  }

  ngOnInit() {
  }

  signup() {
    const {username, password} = this.formInfo;
    if (username != "" && password != "") {
      console.log(`Signup with ${username} ${password}`)
      this.auth.signup(username, password)
        .map(user => console.log(user))
        .subscribe((user) => this.router.navigate(['/kpi']),
        (err) => this.message = err);
    } else {
      this.message = "You must set a username and a password";
    }
  }
}
