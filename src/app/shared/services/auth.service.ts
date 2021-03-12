import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = environment.api_url;

  token = localStorage.getItem('token') ? localStorage.getItem('token') : '';
  config = {
    headers: {
      'Authorization': 'Bearer ' + this.token,
      'Content-Type': 'application/json'
    }
  };

  constructor(
    private http: HttpClient
  ) { }

  postRequest(api_url, data, type = null) {
    return new Promise((resolve, reject) => {
      this.config.headers.Authorization = localStorage.getItem('token') ? 'Bearer ' + localStorage.getItem('token') : '';
      this.config.headers['Content-Type'] = type ? 'application/x-www-form-urlencoded' : 'application/json';

      this.http.post(this.baseUrl + api_url, data, this.config).subscribe((res): any => {
        resolve(res);
      }, err => {
        reject(err);
      });
    });
  }

  getRequest(api_url, data) {
    return new Promise((resolve, reject) => {
      this.config.headers.Authorization = localStorage.getItem('token') ? 'Bearer ' + localStorage.getItem('token') : '';

      this.http.get(this.baseUrl + api_url, {
        headers: {
          'Authorization': this.config.headers.Authorization,
          'Content-Type': 'application/json'
        },
        params: data
      }).subscribe(
        res => {
          resolve(res);
        },
        err => {
          reject(err);
        });
    });
  }

  updateRequest(api_url, data) {
    return new Promise((resolve, reject) => {
      this.config.headers.Authorization = localStorage.getItem('token') ? 'Bearer ' + localStorage.getItem('token') : '';

      this.http.put(this.baseUrl + api_url, data, this.config).subscribe(res => {
        resolve(res);
      }, err => {
        reject(err);
      });
    });
  }

  deleteRequest(api_url, data) {
    const options = {
      headers: new HttpHeaders(this.config.headers),
      body: data
    }
    return new Promise((resolve, reject) => {
      this.config.headers.Authorization = localStorage.getItem('token') ? 'Bearer ' + localStorage.getItem('token') : '';

      this.http.delete(this.baseUrl + api_url, options).subscribe(res => {
        resolve(res);
      }, err => {
        reject(err);
      });
    });
  }

  fileRequest(api_url, data) {
    return new Promise((resolve, reject) => {
      // this.config.headers.Authorization = localStorage.getItem('token') ? 'Bearer ' + localStorage.getItem('token') : '';

      this.http.post(this.baseUrl + api_url, data, {
        headers: {
          'Authorization': 'Bearer ' + this.token
        }
      }).subscribe(data => {
        resolve(data);
      }, err => {
        reject(err);
      });
    });
  }
}
