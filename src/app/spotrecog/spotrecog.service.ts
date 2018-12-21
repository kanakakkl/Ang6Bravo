import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SpotrecogService {

   uri = window.location.origin;
   //uri="http://localhost:3003"

  constructor(public http: HttpClient) { }

  getDivisions(){
    var data = this.http.get(`${this.uri}/divisons/getDivisions`);
    return data;
  }
 

  getValues()
  {
    var value = this.http.get(`${this.uri}/values/getValues`);
    return value;
  }

  getEmp()
  {
    var employee = this.http.get(`${this.uri}/employees/getemployee`) 
    return employee;
  }

  getdeptValue(){
    var deptvalue = this.http.get(`${this.uri}/values/getValues`);
    return deptvalue;
  }

  
  addSpotSubmission(spotsubmit, form){
    this.http.post(`${this.uri}/awardrecog/adSubmission`, spotsubmit)
    .subscribe(res => {
       form.reset();
    });

  }


}
