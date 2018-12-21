import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  
    uri = window.location.origin;
   //uri="http://localhost:3003";

  constructor(public http: HttpClient) { }

  getNemakDivisions(){
    var data = this.http.get(`${this.uri}/divisons/getDivisions`);
    return data;
  }
}
