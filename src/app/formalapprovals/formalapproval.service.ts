import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class FormalapprovalService {
    uri = window.location.origin;
   //uri="http://localhost:3003";

  constructor(public http: HttpClient) { }

  getCommnents(){
    var data = this.http.get(`${this.uri}/comment/getComments`);
    return data;
  }

  addcomments(aceptQuery){
    this.http.post(`${this.uri}/comment/addComments`, aceptQuery).subscribe();
  }

  updateSubmissionStatus(aceptQuery){
    this.http.post(`${this.uri}/awardrecog/updateuser`, aceptQuery).subscribe();
  }
  
}
