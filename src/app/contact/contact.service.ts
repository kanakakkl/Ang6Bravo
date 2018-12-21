import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
     uri = window.location.origin;
     //uri="http://localhost:3003";
  constructor(public http: HttpClient) { }

  addSubmitQuery(querysubmit, form){
    this.http.post(`${this.uri}/query/addQuery`, querysubmit)
    .subscribe(res => {
       form.reset();
    });

  }
}
