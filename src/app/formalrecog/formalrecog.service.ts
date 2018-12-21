import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
providedIn: 'root'
})

export class FormalRecogService {
   uri = window.location.origin;
   //uri="http://localhost:3003"
 constructor(public http: HttpClient) { }
 getSite(){
    var sitedata = this.http.get(`${this.uri}/divisons/getDivisions`);
    return sitedata;
  }
  getDept(){
    var deptdata = this.http.get(`${this.uri}/department/getDepartments`);
    return deptdata;
  }
  getdeptValue(){
    var deptvalue = this.http.get(`${this.uri}/values/getValues`);
    return deptvalue;
  }

  getEmp()
  {
    var employee = this.http.get(`${this.uri}/employees/getemployee`)
    return employee;
  }

  addFormalSubmission(spotsubmit, form){
    this.http.post(`${this.uri}/awardrecog/adSubmission`, spotsubmit)
    .subscribe(res => {
       form.reset();
    });
  }
}