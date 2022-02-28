// import { Injectable } from '@angular/core';
// import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
// import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Response, Headers, RequestOptions, URLSearchParams, Http, ResponseContentType } from '@angular/http';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
// import { tap, catchError } from 'rxjs/operators';
import { Constants } from '../_shared/constant';
import { Observable } from 'rxjs';

@Injectable()
export class DataService {
  tempData: Response;
  temp = [];
  data = [];
  serviceURL = Constants;
  constructor(private http: Http) {}
  
  // getTests(methodName): Observable<any> {
  //   const headers = new HttpHeaders()
  //     .append('Content-Type', 'application/json')
  //     .append('Access-Control-Allow-Headers', 'Content-Type')
  //     .append('Access-Control-Allow-Methods', 'GET')
  //     .append('Access-Control-Allow-Origin', '*');
  // }

  getData(methodName): Observable<any> {
    
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Cache-control': 'no-cache',
      //"Access-Control-Allow-Origin": "*",
      //"Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
      Expires: '0',
      Pragma: 'no-cache'
    });
    // headers.append('Access-Control-Allow-Headers', 'Content-Type');
    // headers.append('Access-Control-Allow-Methods', 'GET');
    // headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Authorization', 'Bearer ' + sessionStorage.getItem('AccessToken'));
    const options = new RequestOptions({ headers: headers });
    const Url = this.serviceURL.BASE_URL + methodName;
    return this.http.get(Url, options).map(res => {
      return res.json();
    });
  }
  getElementThroughAnyParam(methodName, model): Observable<any> {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Cache-control': 'no-cache',
      Expires: '0',
      Pragma: 'no-cache'
    });
    headers.append('Authorization', 'Bearer ' + sessionStorage.getItem('AccessToken'));
    const options = new RequestOptions({ headers: headers });
    const body = JSON.stringify(model);
    const params = new URLSearchParams();
    // tslint:disable-next-line:forin
    for (const key in model) {
      params.set(key, model[key]);
    }
    const Url = this.serviceURL.BASE_URL + methodName + '/' + 'searchItems' + '?' + params.toString();
    return this.http.get(Url, options).map(res => {
      return res.json();
    });
  }
  postElement(methodName, data): Observable<any> {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Cache-control': 'no-cache',
      Expires: '0',
      Pragma: 'no-cache'
    });
    headers.append('Authorization', 'Bearer ' + sessionStorage.getItem('AccessToken'));
    const options = new RequestOptions({ headers: headers });
    const body = JSON.stringify(data);
    const Url = this.serviceURL.BASE_URL + methodName;

    return this.http.post(Url, body, options).map(res => res.json());
  }

  getElementThroughId(methodName, id): Observable<any> {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Cache-control': 'no-cache',
      Expires: '0',
      Pragma: 'no-cache'
    });
    headers.append('Authorization', 'Bearer ' + sessionStorage.getItem('AccessToken'));
    const Url = this.serviceURL.BASE_URL + methodName + '/' + id;
    const options = new RequestOptions({ headers: headers });
    return this.http.get(Url, options).map(res => {
      return res.json();
    });
  }

  deleteElement(methodName, id): Observable<any> {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Cache-control': 'no-cache',
      Expires: '0',
      Pragma: 'no-cache'
    });
    headers.append('Authorization', 'Bearer ' + sessionStorage.getItem('AccessToken'));
    const Url = this.serviceURL.BASE_URL + methodName + '/' + id;
    const options = new RequestOptions({ headers: headers });
    return this.http.delete(Url, options).map(res => res.json());
  }

  updateElement(methodName, data): Observable<any> {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Cache-control': 'no-cache',
      Expires: '0',
      Pragma: 'no-cache'
    });
    headers.append('Authorization', 'Bearer ' + sessionStorage.getItem('AccessToken'));
    const body = JSON.stringify(data);
    const Url = this.serviceURL.BASE_URL + methodName + '/' + data.id;
    const options = new RequestOptions({ headers: headers });

    return this.http.put(Url, body, options).map(res => res.json());
  }

  getDataLogin(methodName): Observable<any> {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Cache-control': 'no-cache',
      Expires: '0',
      Pragma: 'no-cache'
    });
    //  headers.append('Authorization', 'Bearer ' + sessionStorage.getItem('AccessToken'));
    const options = new RequestOptions({ headers: headers });
    const Url = this.serviceURL.BASE_URL + methodName;
    return this.http.get(Url, options).map(res => {
      return res.json();
    });
  }

  transformXmlFile(methodName): Observable<any> {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Cache-control': 'no-cache',
      Expires: '0',
      Pragma: 'no-cache'
    });
     headers.append('Authorization', 'Bearer ' + sessionStorage.getItem('AccessToken'));
    const options = new RequestOptions({ headers: headers });
    const Url = this.serviceURL.BASE_URL + methodName;
    return this.http.post(Url, options).map(res => {
      return res.json();
    });
  }

  addComponentCode(methodName): Observable<any> {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Cache-control': 'no-cache',
      Expires: '0',
      Pragma: 'no-cache'
    });
    //  headers.append('Authorization', 'Bearer ' + sessionStorage.getItem('AccessToken'));
    const options = new RequestOptions({ headers: headers });
    const Url = this.serviceURL.BASE_URL + methodName;
    return this.http.post(Url, options).map(res => {
      return res.json();
    });
  }

  getElementForLogin(methodName, user) {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Cache-control': 'no-cache',
      Expires: '0',
      Pragma: 'no-cache'
    });
    const Url = this.serviceURL.BASE_URL + methodName;
    const options = new RequestOptions({ headers: headers });
    const body = JSON.stringify(user);
    return this.http.post(Url, body, options).map(res => {
      return res.json();
    });
  }

  UploadFile(methodName, file): Observable<any> {
    const headers = new Headers();
    const Url = this.serviceURL.BASE_URL + methodName;
    const options = new RequestOptions({ headers: headers });
    return this.http.post(Url, file, options).map(res => {
      return res.json();
    });
  }

  UploadFilePartCode(methodName, file): Observable<any> {
    const headers = new Headers();
    const Url = this.serviceURL.BASE_URL + methodName;
    const options = new RequestOptions({ headers: headers });
    return this.http.post(Url, file, options).map(res => {
      return res.json();
    });
  }

  GetFile(methodName): Observable<any> {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Cache-control': 'no-cache',
      Expires: '0',
      Pragma: 'no-cache'
    });
    const Url = this.serviceURL.BASE_URL + methodName;
    const options = new RequestOptions({ responseType: ResponseContentType.Blob, headers: headers });
    return this.http.get(Url, options).map(res => {
      return res.json();
    });
  }

  GetLogFile(methodName): Observable<any> {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Cache-control': 'no-cache',
      Expires: '0',
      Pragma: 'no-cache'
    });
    const Url = this.serviceURL.BASE_URL + methodName;
    const options = new RequestOptions({ responseType: ResponseContentType.Blob, headers: headers });
    return this.http.get(Url, options).map(res => {
      return res.json();
    });
  }

  GetSelectedFile(methodName, list): Observable<any> {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Cache-control': 'no-cache',
      Expires: '0',
      Pragma: 'no-cache'
    });
    const Url = this.serviceURL.BASE_URL + methodName;
    const options = new RequestOptions({ responseType: ResponseContentType.Blob, headers: headers });
    const body = JSON.stringify(list);
    return this.http.post(Url, body , options).map(res => {
      return res.json();
    });
  }
}
