
import {SpotreportsService} from './spotreports.service';
import { HttpErrorResponse } from '@angular/common/http/src/response';
import { Component, OnInit, ViewChild, ViewChildren, QueryList } from '@angular/core';

import { SpotrecogService } from '../spotrecog/spotrecog.service'
import { ToastrService } from 'ngx-toastr';
import { SpotreportEditComponent } from '../spotreport-edit/spotreport-edit.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-spotreports',
  templateUrl: './spotreports.component.html',
  styleUrls: ['./spotreports.component.css']
})
export class SpotreportsComponent implements OnInit {
  empString: string[];
  mdlSampleIsOpen: boolean;
  delmdlSampleIsOpen: boolean;
  spotSubmision: string[];
  spotSubmisionRecords = [];
  spotEmpId: any;
  isModelActive: boolean;
  submissionRec: any;
  searchText: string;
  editedRec: any;
  deptvalues: string[];

  @ViewChild(SpotreportEditComponent) spotreporteditcomp: SpotreportEditComponent
  @ViewChildren('pages') pages: QueryList<any>;
  itemsPerPage = 5;
  numberOfVisiblePaginators = 10;
  numberOfPaginators = 0;
  paginators: Array<any> = [];
  activePage = 1;
  firstVisibleIndex = 0;
  lastVisibleIndex: number = this.itemsPerPage;
  firstVisiblePaginator = 0;
  lastVisiblePaginator = this.numberOfVisiblePaginators;
  toSearchText = [];
  defaultInitial: boolean = true;

  constructor(public spotreportservice: SpotreportsService,public spotservice: SpotrecogService, private toastr: ToastrService, private spinner: NgxSpinnerService) { 
   
    this.getSpot();
  }
  spoteditClick(data) {
    this.openFormModal(true);
    this.onSelect(data);
    this.spotEmpId = data._id;
    this.editedRec = data;
  }

  ngOnInit() {
    
    if (this.defaultInitial) {
      this.getUserListPagination();
    }
      //nemak values
      this.spotservice.getdeptValue().subscribe(res => {
        this.deptvalues = res as string[];
      },
        (err: HttpErrorResponse) => {
          console.log(err.message);
        });
  
      //get the employees
      this.spotservice.getEmp().subscribe(res => {
        this.empString = res as string[];
      },
        (err: HttpErrorResponse) => {
          console.log(err.message);
        });
  }
  filterIt(arr, searchKey) {
    searchKey = searchKey.toLowerCase();
    var searchText = searchKey.replace(/\s/g, "");
    return arr.filter((obj) => {
      return Object.keys(obj).some((key) => {
        if (obj[key] != null && key != "RecognitionEmployees" && typeof obj[key] != "number") {
          var cat = obj[key].replace(/\s/g, "");
          cat = cat.toLowerCase();
          this.spinner.hide();
          return cat.includes(searchText);
        }
      });
    });
  }
  search() {
    var divData = [];
    if (!this.searchText){
      this.toSearchText = [];
      this.getUserListPagination();
      return this.spotSubmisionRecords;
    }
    if (this.searchText) {
      divData = this.spotSubmisionRecords;
      this.toSearchText = this.filterIt(divData, this.searchText);
      this.getUserListPagination();
      return this.filterIt(divData, this.searchText);
    }
  }

  getSpot() {
    this.spinner.show();
    this.spotSubmisionRecords = [];
    var spotSubmisionRecords = this.spotSubmisionRecords;
    this.spotreportservice.getSubmissions().subscribe(res => {
      this.spotSubmision = res as string[];
      this.spotSubmision.forEach(function (resData) {
        if (resData["RecognitionType"] == 'Spot') {
          spotSubmisionRecords.push(resData);
        }
      })
      console.log("spotsubmission", this.spotSubmision, this.spotSubmisionRecords);
      this.paginators = [];
      this.getPaginations();
    },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      });
  }

  private openFormModal(open: boolean): void {
    this.mdlSampleIsOpen = open;
    this.isModelActive = open;
  }

  onSelect(selectedItem: any) {
    this.isModelActive = true;
  }

  openFormDelModal(open: boolean, data): void {
    this.delmdlSampleIsOpen = open;
    if (data != null) {
      this.submissionRec = data;
    }
  }

  getspotRecog(val){
    let result = Array();
    if(val.length > 1){
       val.forEach(function(res){
         result.push(res.EmployeeName + "/" +res.EmployeeDepartment);
        });
        return result.join(", ");
    }else{
      return  val[0].EmployeeName + "/" + val[0].EmployeeDepartment;
    }
  }
  
  updateSpotInfo() {
    var formval = this.spotreporteditcomp.onForm.value;
    formval._id = this.spotEmpId;
    var editedRec = this.editedRec, LoginUser, LoginRole, nemakValue,
     selectedEmpObj = [],  Departments = [], selectedEmp=[];

    if (localStorage.getItem('currentUser')) {
      LoginUser = JSON.parse(localStorage.getItem('currentUser')).username;
      LoginRole = JSON.parse(localStorage.getItem('currentUser')).Role
    }
    nemakValue = this.deptvalues.find((c) => (c["nemak_value"] === formval.Value));
 
    selectedEmpObj = formval.Recognized;

    if (selectedEmpObj.length > 0) {
      selectedEmpObj.forEach(function (res) {
        res.DollarValue = 5;
        Departments.push(res.EmployeeDepartment);
        selectedEmp.push(res.EmployeeName);
      })
    }else{
      this.toastr.error('Please select employee');
      return;
    }
    var formalsubmit = {
      Submission_id: editedRec.Submission_id,
      Submitter_name: LoginUser,
      RecognitionNames: selectedEmp,
      Site: formval.Site,
      Department: null,
      RecognitionDepartments: Departments,
      Category: null,
      Reason: formval.Description,
      SubmitDate: editedRec.SubmitDate,
      Comments: formval.Comments || "",
      RecognitionType: "Spot",
      ModifiedDate: new Date(),
      ModifiedBy: LoginUser,
      Status: "Pending",
      ValueId: nemakValue.value_id,
      Value: formval.Value,
      RecognitionEmployees: selectedEmpObj,
      _id: this.spotEmpId
    }
    this.spotreportservice.updateBook(formalsubmit).subscribe(data => {
      this.spotreporteditcomp.onForm.setValue({
        Comments: formval.Comments || "",
        Description: formval.Description,
        Site: formval.Site,
        Recognized: formval.Recognized || "",
        Value: formval.Value
      });
      this.getSpot();
      this.firstPage();
      this.openFormModal(false);
    });
  }

  updateDelInfo() {
    if (this.submissionRec != undefined) {
      this.spotreportservice.deleteRec(this.submissionRec._id)
        .subscribe(res => {
          this.getSpot();
          this.firstPage();
          this.openFormDelModal(false, null);
        }, (err) => {
          console.log(err);
        });
    }
  }

  
  getUserListPagination() {
    this.defaultInitial = false;
    this.spinner.show();
    this.numberOfPaginators = 0;
    this.paginators = [];
    if (this.toSearchText && this.toSearchText.length > 0) {
      if (this.toSearchText.length == 1) {
        if (this.toSearchText && this.toSearchText.length % this.itemsPerPage === 0) {
          this.numberOfPaginators = Math.floor(this.toSearchText.length / this.itemsPerPage);
        } else {
          this.numberOfPaginators = Math.floor(this.toSearchText.length / this.itemsPerPage + 1);
        }
      } else {
        if (this.toSearchText && (this.toSearchText.length - 1) % this.itemsPerPage === 0) {
          this.numberOfPaginators = Math.floor((this.toSearchText.length - 1) / this.itemsPerPage);
        } else {
          this.numberOfPaginators = Math.floor((this.toSearchText.length - 1) / this.itemsPerPage + 1);
        }
      }
      for (let i = 1; i <= this.numberOfPaginators; i++) {
        this.paginators.push(i);
      }
     
      if(this.searchText.length < 2){
        this.firstPage();
      }
      this.spinner.hide();
    } else if (this.toSearchText.length == 0) {
      if(this.searchText == undefined || this.searchText == ""){
      
        return this.getPaginations();
      }
      this.numberOfPaginators = 0;
      this.paginators = [];
    } else {
     
      this.getPaginations();
    } 
    
  }

  getPaginations() {
    if (this.spotSubmisionRecords && this.spotSubmisionRecords.length != undefined) {
      if (this.spotSubmisionRecords && (this.spotSubmisionRecords.length - 1) % this.itemsPerPage === 0) {
        this.numberOfPaginators = Math.floor((this.spotSubmisionRecords.length - 1) / this.itemsPerPage);
      } else {
        this.numberOfPaginators = Math.floor((this.spotSubmisionRecords.length - 1) / this.itemsPerPage + 1);
      }
      for (let i = 1; i <= this.numberOfPaginators; i++) {
        this.paginators.push(i);
      }
      this.spinner.hide();
    }
    
  }

  changePage(event: any) {
    if (event.target.text > 1 && event.target.text <= this.numberOfPaginators) {
      this.activePage = +event.target.text;
      this.firstVisibleIndex = this.activePage * this.itemsPerPage - this.itemsPerPage + 1;
      this.lastVisibleIndex = this.activePage * this.itemsPerPage;
    } else if (event.target.text >= 1 && event.target.text <= this.numberOfPaginators) {
      this.activePage = +event.target.text;
      this.firstVisibleIndex = this.activePage * this.itemsPerPage - this.itemsPerPage;
      this.lastVisibleIndex = this.activePage * this.itemsPerPage;
    }
  }

  nextPage(event: any) {
    if (this.pages.last.nativeElement.classList.contains('active')) {
      if ((this.numberOfPaginators - this.numberOfVisiblePaginators) >= this.lastVisiblePaginator) {
        this.firstVisiblePaginator += this.numberOfVisiblePaginators;
        this.lastVisiblePaginator += this.numberOfVisiblePaginators;
      } else {
        this.firstVisiblePaginator += this.numberOfVisiblePaginators;
        this.lastVisiblePaginator = this.numberOfPaginators;
      }
    }

    this.activePage += 1;
    this.firstVisibleIndex = this.activePage * this.itemsPerPage - this.itemsPerPage + 1;
    this.lastVisibleIndex = this.activePage * this.itemsPerPage;
  }

  previousPage(event: any) {
    if (this.pages.first.nativeElement.classList.contains('active')) {
      if ((this.lastVisiblePaginator - this.firstVisiblePaginator) === this.numberOfVisiblePaginators) {
        this.firstVisiblePaginator -= this.numberOfVisiblePaginators;
        this.lastVisiblePaginator -= this.numberOfVisiblePaginators;
      } else {
        this.firstVisiblePaginator -= this.numberOfVisiblePaginators;
        this.lastVisiblePaginator -= (this.numberOfPaginators % this.numberOfVisiblePaginators);
      }
    }

    this.activePage -= 1;
    this.firstVisibleIndex = this.activePage * this.itemsPerPage - this.itemsPerPage + 1;
    this.lastVisibleIndex = this.activePage * this.itemsPerPage;
  }

  firstPage() {
    this.activePage = 1;
    this.firstVisibleIndex = this.activePage * this.itemsPerPage - this.itemsPerPage;
    this.lastVisibleIndex = this.activePage * this.itemsPerPage;
    this.firstVisiblePaginator = 0;
    this.lastVisiblePaginator = this.numberOfVisiblePaginators;
  }

  lastPage() {
    this.activePage = this.numberOfPaginators;
    this.firstVisibleIndex = this.activePage * this.itemsPerPage - this.itemsPerPage + 1;
    this.lastVisibleIndex = this.activePage * this.itemsPerPage;

    if (this.numberOfPaginators % this.numberOfVisiblePaginators === 0) {
      this.firstVisiblePaginator = this.numberOfPaginators - this.numberOfVisiblePaginators;
      this.lastVisiblePaginator = this.numberOfPaginators;
    } else {
      this.lastVisiblePaginator = this.numberOfPaginators;
      this.firstVisiblePaginator = this.lastVisiblePaginator - (this.numberOfPaginators % this.numberOfVisiblePaginators);
    }
  }

 
}





