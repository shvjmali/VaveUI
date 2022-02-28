import { Injectable, NgZone, OnInit } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { debounce } from 'rxjs/operator/debounce';
import { Router } from '@angular/router';
import { debug } from 'util';
import { Jsonp } from '@angular/http/src/http';
import { DataService } from '../_core/data.service';
import { Constants } from '../_shared/constant';
import { Observable } from 'rxjs';
import { User } from '../_shared/model/DemoUser';

@Injectable()
export class UserService implements OnInit {
  constants: any;
  userInfo: any;
  constructor(
    private dataService: DataService,
    private http: Http,
    private ngZone: NgZone,
    private router: Router,
  ) {
    this.constants = Constants;
  }
  ngOnInit() {}
  GetUser() {
    return this.dataService.getData('User/GetUser').map(response => {
      return response;
    });
  }
  AddUser(user: User): Observable<any> {
    return this.dataService.postElement('User', user).map(response => {
      return response;
    });
  }
  Verify(Id: string): Observable<any> {
    const headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    const options = new RequestOptions({ headers: headers });
    return this.http
      .get(this.constants.BASE_URL + 'User/Verify/' + Id, options)
      .map(res => {
        const data = res.json();
        return data;
      });
  }
  CreateTenant(Id: string): Observable<any> {
    const headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    const options = new RequestOptions({ headers: headers });
    return this.http
      .get(this.constants.BASE_URL + 'Company/CreateTenant/' + Id, options)
      .map(res => {
        const data = res.json();
        return data;
      });
  }
  Login(userName: string): Observable<any> {
    const user: User = new User();
    return this.dataService
      .getDataLogin('Login/GetLoginUserDetails/' + userName)
      .map(res => {
        const data = res;
        return data;
      });
  }
  ForgotPassword(resetPassword: any): Observable<any> {
    const headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    const options = new RequestOptions({ headers: headers });
    const body = 'email=' + resetPassword.email;
    const url = 'User/ForgotPassword';
    return this.http
      .post(this.constants.BASE_URL + url, body, options)
      .map(res => {
        const data = res.json();
        return data;
      });
  }
  Changepassword(Changepassword: any): Observable<any> {
    const headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    headers.append(
      'Authorization',
      'Bearer ' + sessionStorage.getItem('AccessToken')
    );
    const options = new RequestOptions({ headers: headers });
    const body =
      'oldPassword=' +
      Changepassword.oldPassword +
      '&newPassword=' +
      Changepassword.password;
    const url = 'User/ChangePassword';
    return this.http
      .post(this.constants.BASE_URL + url, body, options)
      .map(res => {
        const data = res.json();
        return data;
      });
  }
  UpdateUser(user: User): Observable<any> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append(
      'Authorization',
      'Bearer ' + sessionStorage.getItem('AccessToken')
    );
    const options = new RequestOptions({ headers: headers });
    const body = user;
    return this.http
      .put(this.constants.BASE_URL + 'User', body, options)
      .map(res => {
        const data = res.json();
        return data;
      });
  }
  DeleteUser(id: string): Observable<any> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append(
      'Authorization',
      'Bearer ' + sessionStorage.getItem('AccessToken')
    );
    const options = new RequestOptions({ headers: headers });
    return this.http
      .delete(this.constants.BASE_URL + 'User/' + id, options)
      .map(res => {
        const data = res.json();
        return data;
      });
  }

  GetGenralUser(id: string): Observable<any> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append(
      'Authorization',
      'Bearer ' + sessionStorage.getItem('AccessToken')
    );
    const options = new RequestOptions({ headers: headers });
    return this.http
      .get(this.constants.BASE_URL + 'User/GetGenralUser/' + id, options)
      .map(res => {
        const data = res.json();
        return data;
      });
  }
  GetCompany(): Observable<any> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append(
      'Authorization',
      'Bearer ' + sessionStorage.getItem('AccessToken')
    );
    const options = new RequestOptions({ headers: headers });
    return this.http
      .get(this.constants.BASE_URL + 'Company/GetCompany', options)
      .map(res => {
        const data = res.json();
        return data;
      });
  }
}
