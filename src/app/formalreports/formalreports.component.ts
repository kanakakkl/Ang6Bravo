import { Component, OnInit, ViewChildren, QueryList, ViewChild } from '@angular/core';
import { FormalreportsService } from './formalreports.service'
import { HttpErrorResponse } from '@angular/common/http/src/response';
import { FormalreportEditComponent } from '../formalreport-edit/formalreport-edit.component';
import { FormalRecogService } from '../formalrecog/formalrecog.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-formalreports',
  templateUrl: './formalreports.component.html',
  styleUrls: ['./formalreports.component.css']
})
export class FormalreportsComponent implements OnInit {
  Formalsubmissions: string[];
  empString: string[];
  mdlSampleIsOpen: boolean;
  delmdlSampleIsOpen: boolean;
  isModelActive: boolean;
  formalSubmissionRecords = [];
  dataId: string;
  submissionRec: any;
  empArr = [];
  recogArr = [];
  searchText: string;
  divData: any;
  editedRec: any;
  deptvalues: string[];

  @ViewChild(FormalreportEditComponent) formalreporteditcomp: FormalreportEditComponent;
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

  constructor(public formalReportsService: FormalreportsService, private formalService: FormalRecogService,  private toastr: ToastrService,private spinner: NgxSpinnerService) {
    this.getformal();
  }
  editClick(data) {
    this.openModal(true);
    this.onSelect(data);
    this.dataId = data._id;
    this.editedRec = data;
  }

  openModal(open: boolean): void {
    this.mdlSampleIsOpen = open;
    this.isModelActive = open;
  }
  openDelModal(open: boolean, data): void {
    this.delmdlSampleIsOpen = open;
    if (data != null) {
      this.submissionRec = data;
    }
  }
  onSelect(selectedItem: any) {
    this.isModelActive = true;

  }

  ngOnInit() {
    if (this.defaultInitial) {
      this.getFormalListPagination();
    }
    //nemak values
    this.formalService.getdeptValue().subscribe(res => {
      this.deptvalues = res as string[];
    },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      });

    //get the employees
    this.formalService.getEmp().subscribe(res => {
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
    if (!this.searchText) {
      this.toSearchText = [];
      this.getFormalListPagination();
      return this.formalSubmissionRecords;

    }
    if (this.searchText) {
      divData = this.formalSubmissionRecords;
      this.toSearchText = this.filterIt(divData, this.searchText)
      this.getFormalListPagination();
      return this.filterIt(divData, this.searchText);
    }
  }

  getformal() {
    this.spinner.show();
    this.formalSubmissionRecords = [];
    var formalSubmissionRecords = this.formalSubmissionRecords;
    this.formalReportsService.getformalSubmissions().subscribe(res => {
      this.Formalsubmissions = res as string[];
      this.Formalsubmissions.forEach(function (resData) {
        if (resData["RecognitionType"] == 'Formal') {
          formalSubmissionRecords.push(resData);
        }
      })
      console.log("formal submssions", this.Formalsubmissions, formalSubmissionRecords);
      this.paginators = [];
      this.getPaginations();
    },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      });
  }

   
  getRecog(val){
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

  updateFormalInfo() {
    var formval = this.formalreporteditcomp.onForm.value;
    formval._id = this.dataId;
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
        res.DollarValue = 10;
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
      Site: formval.Division,
      Department: formval.Department,
      RecognitionDepartments: Departments,
      Category: formval.Category,
      Reason: formval.Description,
      SubmitDate: editedRec.SubmitDate,
      Comments: formval.Comments,
      RecognitionType: "Formal",
      ModifiedDate: new Date(),
      ModifiedBy: LoginUser,
      Status: "Pending",
      ValueId: nemakValue.value_id,
      Value: formval.Value,
      RecognitionEmployees: selectedEmpObj,
      _id: this.dataId
    }
    this.formalReportsService.updateBook(formalsubmit).subscribe(data => {
      this.formalreporteditcomp.onForm.setValue({
        Category: formval.Category,
        Comments: formval.Comments,
        Department: formval.Department,
        Description: formval.Description,
        Division: formval.Division,
        Recognized: formval.Recognized || "",
        Value: formval.Value
      });
      this.getformal();
      this.firstPage();
      this.openModal(false);
    });
  }

  updateDelInfo() {
    if (this.submissionRec != undefined) {
      this.formalReportsService.deleteBook(this.submissionRec._id)
        .subscribe(res => {
          this.getformal();
          this.firstPage();
          this.openDelModal(false, null);
        }, (err) => {
          console.log(err);
        });
    }
  }

  getFormalListPagination() {
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
      if (this.searchText.length < 2) {
        this.firstPage();
      }
      this.spinner.hide();
    } else if (this.toSearchText.length == 0) {
      if (this.searchText == undefined || this.searchText == "") {
        return this.getPaginations();
      }
      this.numberOfPaginators = 0;
      this.paginators = [];
    } else {
      this.getPaginations();
    }
  }


  getPaginations() {
    if (this.formalSubmissionRecords && this.formalSubmissionRecords.length != undefined) {
      if (this.formalSubmissionRecords && (this.formalSubmissionRecords.length - 1) % this.itemsPerPage === 0) {
        this.numberOfPaginators = Math.floor((this.formalSubmissionRecords.length - 1) / this.itemsPerPage);
      } else {
        this.numberOfPaginators = Math.floor((this.formalSubmissionRecords.length - 1) / this.itemsPerPage + 1);
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
