import { Component, ViewChild, OnInit, Optional, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { SpotrecogService } from './spotrecog.service'
import { HttpErrorResponse } from '@angular/common/http/src/response';
import { v4 as uuid } from 'uuid';
import { ToastrService } from 'ngx-toastr';
import * as $ from 'jquery';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-spotrecog',
  templateUrl: './spotrecog.component.html',
  styleUrls: ['./spotrecog.component.css']
})
export class SpotrecogComponent implements OnInit {
  public onSpotForm: FormGroup;
  division: any;
  users: string[];
  valueString: string[];
  empString: string[];
  deptvalues: string[];
  matchedvalueEmp: string[];
  searchValue: string = '';
  selectedEmployees = [];
  isExists: boolean = false;
  filteredOptions = [];
  validationsErr: boolean = false;
  invalidEmployee: boolean = false;


  @ViewChild('valDiv1') valueInput: ElementRef;

  constructor(private _fb: FormBuilder, public spotservice: SpotrecogService, private toastr: ToastrService, private spinner: NgxSpinnerService) { }

  ngAfterViewInit() {
  }

  ngOnInit() {
    this.spinner.show();
    this.onSpotForm = this._fb.group({
      site: ['', Optional],
      value: ['', Optional],
      reasons: ['', Optional],
      subtasks: this._fb.array([
        this.initlanguage(),
      ])
    });

    //get  the divisions
    this.getDivisions();

    //get the values 
    this.getNemakvalues();

    //get the employees
    this.getEmployees();

    //get departmenets
    this.spotservice.getdeptValue().subscribe(res => {
      this.deptvalues = res as string[];
      console.log("Nemakdept values ", this.deptvalues);
    },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      });
  }


  getDivisions() {
    this.spotservice.getDivisions().subscribe(res => {
      this.users = res as string[];
    },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      });
  }

  getNemakvalues() {
    this.spotservice.getValues().subscribe(res => {
      this.valueString = res as string[];
    },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      });
  }

  
  getEmployees() {
    this.spotservice.getEmp().subscribe(res => {
      this.empString = res as string[];
    },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      });
    this.spinner.hide();
  }

  initlanguage() {
    var task;
    task = this._fb.group({
      subtask: ['', Validators.required]
    });
    return task;
  }

  get tasksControl() {
    var subtaskform = this.onSpotForm as FormGroup;
    return subtaskform;
  }

  get subtaskControl() {
    return this.tasksControl.get('subtasks') as FormArray;
  }

  addName(i, control) {
    var val = this.onSpotForm as FormGroup,
      lastele, formval;
    formval = this.onSpotForm.value;
    if (formval.subtasks[i].subtask != "" && formval.subtasks[i].subtask != null) {

      if (val.value.subtasks && val.value.subtasks.length > 1) {
        var task = this._fb.group({
          subtask: [null]
        });
        this.subtaskControl.push(task);
      } else {
        this.subtaskControl.push(this.initlanguage());
      }
    } else {
      this.toastr.error('Please select employee');
    }
  }

  removeLanguage(i: number) {
    const control = <FormArray>this.onSpotForm.controls['languages'];
    control.removeAt(i);
  }

  removeLink(i: number) {
    this.subtaskControl.removeAt(i);
  }

  getPosts(val) {
    this.selectedEmployees.push(val.value);
  }

  onClick(e, ind) {
    var emp = this.empString;
    var formval = this.onSpotForm.value.subtasks;
    var index;
    var isUnique = true;

    for (var i = 0; i < formval.length; i++) {
      for (var j = 0; j < formval.length; j++) {
        if (i != j) {
          if (formval[i].subtask == formval[j].subtask) {
            isUnique = false
            index = i;
          }
        }
      }
    }

    if (!isUnique && index != undefined) {
      this.subtaskControl.removeAt(index);
      this.toastr.error('Employee has already selected');
    }
    this.filteredOptions = emp;

    setTimeout(function () {
      if (ind == 0) {
        $(".matAuto").addClass("indexZeros");
      }
      else if (ind == 1) {
        $(".matAuto").addClass("indexOnes");
      }
      else if (ind % 2 != 0) {
        $(".matAuto").addClass("indexOdds");
      }
      else if (ind % 2 == 0) {
        $(".matAuto").addClass("indexEvens");
      }
    });

  }

  onKey(event: KeyboardEvent, ind) {
    var isExists = this.isExists;
    var val = (<HTMLInputElement>event.target).value || '';
    if (val && val.length > 3 && this.empString) {
      const filterValue = val.toLowerCase();
      this.filteredOptions = this.empString.filter(option => option["EmployeeName"].toLowerCase().includes(filterValue));

      var formval = this.onSpotForm.value.subtasks;
      var index;
      for (var i = 0; i <= formval.length - 2; i++) {
        if (formval[i].subtask.toLowerCase().replace(/\s/g, "") == val && val != "") {
          isExists = true;
        }
      }
      if (isExists) {
        if (formval[i].subtask == val) {
          index = formval.length - 1;
          this.subtaskControl.removeAt(index);
          this.toastr.error('Employee has already selected');
        }
      }
    }
    setTimeout(function () {
      if (ind == 0) {
        $(".matAuto").addClass("indexZeros");
      }
      else if (ind == 1) {
        $(".matAuto").addClass("indexOnes");
      }
      else if (ind % 2 != 0) {
        $(".matAuto").addClass("indexOdds");
      }
      else if (ind % 2 == 0) {
        $(".matAuto").addClass("indexEvens");
      }
    });
  }

  onSpotFormValidations(formvals, subtaskArr) {
    var toastr = this.toastr;
    let validationsErr = this.validationsErr;
    let invalidEmployee = this.invalidEmployee;
    var self = this;

    if (formvals && (formvals.site != null && formvals.site.replace(/\s/g, "") != "")
      && (formvals.value != null && formvals.value.replace(/\s/g, "") != "")
      && (formvals.reasons != null && formvals.reasons.replace(/\s/g, "") != "")) {
      subtaskArr.forEach(function (val) {
        if (val && val.EmployeeName != null && val.EmployeeName.replace(/\s/g, "") != "") {
          if (self.filteredOptions && self.filteredOptions.length == 0) {
            validationsErr = true;
            invalidEmployee = true;
          }
          return;
        } else {
          validationsErr = true;
          invalidEmployee = true;
        }
      })
    } else {
      validationsErr = true;
    }

    if (validationsErr) {
      if (invalidEmployee) {
        this.spinner.hide();
        toastr.error('Please select valid employee!!');
      } else {
        this.spinner.hide();
        toastr.error('Please fill all fields!!');
      }
      return true;
    }
  }

  getApprovalUniqueNumber() {
    var date = Date.now();
    var uniqueNumber = {};
    uniqueNumber["previous"] = 0;

    if (date <= uniqueNumber["previous"]) {
      date = ++uniqueNumber["previous"];
    } else {
      uniqueNumber["previous"] = date;
    }

    return date.toString().substr(-6);
  }
  onSubmit() {
    this.spinner.show();
    var site, spotsubmit, nemakValue, selectedEmp, selectedEmpObj = [], Departments = [],
      todayTime, subtasks,
      LoginUser, LoginRole, validated;

    const formvalues = this.onSpotForm.value;
    const divisions = this.users;
    const values = this.valueString;
    const depValues = this.deptvalues;
    const employees = this.empString

    selectedEmp = this.selectedEmployees;
    subtasks = formvalues.subtasks;

    selectedEmp = [];

    if (localStorage.getItem('currentUser')) {
      LoginUser = JSON.parse(localStorage.getItem('currentUser')).username;
      LoginRole = JSON.parse(localStorage.getItem('currentUser')).Role
    }

    subtasks.forEach(function (r) {
      selectedEmpObj.push(employees.find((c) => (c["EmployeeName"] === r.subtask)));
      nemakValue = depValues.find((c) => (c["value_id"] === formvalues.value));
    })

    validated = this.onSpotFormValidations(formvalues, selectedEmpObj);

    if (!validated) {
      site = divisions.find((c) => (c["div_id"] === formvalues.site));
      nemakValue = depValues.find((c) => (c["value_id"] === formvalues.value));

      if (selectedEmpObj.length > 0) {
        selectedEmpObj.forEach(function (res) {
          res.DollarValue = 5;
          Departments.push(res.EmployeeDepartment);
          selectedEmp.push(res.EmployeeName);
        })
      }
      
      spotsubmit = {
        Submission_id: uuid(),
        Approval_id: this.getApprovalUniqueNumber(),
        Submitter_name: LoginUser,
        RecognitionNames: selectedEmp,
        Site: site["div_name"],
        Department: null,
        RecognitionDepartments: Departments,
        Category: null,
        Reason: formvalues.reasons,
        SubmitDate: new Date(),
        Comments: null,
        RecognitionType: "Spot",
        ModifiedDate: new Date(),
        ModifiedBy: LoginUser,
        Status: "Pending",
        ValueId: formvalues.value,
        Value: nemakValue.nemak_value,
        RecognitionEmployees: selectedEmpObj
      }
      //console.log("spotsubmit", spotsubmit);
      this.spinner.hide();
      this.toastr.success('Successfully submitted request');
      this.filteredOptions = [];
      this.spotservice.addSpotSubmission(spotsubmit, this.onSpotForm);
    }
  }
}
