import { Injectable, EventEmitter } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Http} from '@angular/http';
import 'rxjs';
import {environment} from '../../environments/environment';
import { Router } from '@angular/router';



@Injectable()
export class AuthService {
  BASEURL = environment.BASEURL + "/auth";

  private user:object;
  private userLoginEvent:EventEmitter<any> = new EventEmitter<any>();
  private options = {withCredentials:true};

  constructor(private http: Http, public router: Router) {
    this.isLoggedIn().subscribe();
  }

    public getLoginEventEmitter():EventEmitter<any>{
      return this.userLoginEvent;
    }

    public getUser(){
      return this.user;
    }

    private emitUserLoginEvent(user){
      this.user = user;
      this.userLoginEvent.emit(user);
      return user;
    }

    private handleError(e) {
      console.log("AUTH ERROR");
      return Observable.throw(e.json().message);
    }

    signup(username,password) {
      console.log("entrooo")
      return this.http.post(`${this.BASEURL}/signup`, {username,password}, this.options)
        .map(res => res.json())
        .map(user => this.emitUserLoginEvent(user))
        .catch(this.handleError);
    }

    login(username,password) {
      return this.http.post(`${this.BASEURL}/login`, {username,password}, this.options)
        .map(res => res.json())
        .map(user => this.emitUserLoginEvent(user))
        .catch(this.handleError);
    }

    logout() {
      return this.http.get(`${this.BASEURL}/logout`, this.options)
        .map(res => res.json())
        .map(user => this.emitUserLoginEvent(null))
        .subscribe((user) => this.router.navigate(['']))
        // .catch(this.handleError);
    }

    upload(username, password) {
    return this.http.put(`${this.BASEURL}/update`, {username, password}, this.options)
      .map(res => res.json())
      .map(user => this.emitUserLoginEvent(user))
      .catch(this.handleError);
  }


    isLoggedIn() {
      return this.http.get(`${this.BASEURL}/loggedin`, this.options)
        .map(res => res.json())
        .map(user => this.emitUserLoginEvent(user))
        .catch(this.handleError);
    }
}
