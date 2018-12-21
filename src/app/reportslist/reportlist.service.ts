import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReportlistService {
    //uri="http://localhost:3003"
   uri = window.location.origin;

  constructor(public http: HttpClient) { }

  getSubmissions(){
    var data = this.http.get(`${this.uri}/awardrecog/getSubmissions`);
    return data;
  }
}
