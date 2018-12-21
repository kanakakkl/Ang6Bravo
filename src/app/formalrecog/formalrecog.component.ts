import { Component, ViewChild, OnInit, Optional, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FormalRecogService } from './formalrecog.service';
import { HttpErrorResponse } from '@angular/common/http/src/response';
import { v4 as uuid } from 'uuid';
import * as $ from 'jquery';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-formalrecog',
  templateUrl: './formalrecog.component.html',
  styleUrls: ['./formalrecog.component.css']
})
export class FormalrecogComponent implements OnInit {

  siteusers: string[];
  deptusers: string[];
  deptvalues: string[];
  empString: string[];
  matchedvalueEmp = [];
  selectedCategory = "";
  selectedEmployees = [];
  isExists: boolean = false;
  filteredOptions = [];
  validationsErr: boolean = false;
  invalidEmployee: boolean = false;
  editing: boolean = false;
  @ViewChild('valDiv1') valueInput: ElementRef;

  categories = [
    { value: 1, name: 'Quality', checked: false },
    { value: 2, name: 'Cost/ Productivity', checked: false },
    { value: 3, name: 'Morale', checked: false },
    { value: 4, name: 'Community Involvement', checked: false },
    { value: 5, name: 'Safety', checked: false },
    { value: 6, name: 'Delivery', checked: false },
    { value: 7, name: 'Environment', checked: false },
    { value: 8, name: 'Others', checked: false }
  ];

  public formalForm: FormGroup;
  division: any;
  constructor(private _fb: FormBuilder, private toastr: ToastrService, private formalService: FormalRecogService,  private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show();
    this.selectedCategory = "";
    this.formalForm = this._fb.group({
      site: ['', Optional],
      department: ['', Optional],
      value: ['', Optional],
      category: ['', Optional],
      reasons: ['', Optional],
      subtasks: this._fb.array([
        this.initlanguage(),
      ])
    });

    //site
    this.formalService.getSite().subscribe(res => {
      this.siteusers = res as string[];
    },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      });

      //departments
    this.formalService.getDept().subscribe(res => {
      this.deptusers = res as string[];
    },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      });
    
      //nemak values
    this.formalService.getdeptValue().subscribe(res => {
      this.deptvalues = res as string[];
      console.log("Nemakdept values ", this.deptvalues);
    },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      });

    //get the employees
    this.formalService.getEmp().subscribe(res => {
      this.empString = res as string[];
      console.log("Nemak employess ", this.empString);
    },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      });

      this.spinner.hide();
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.matchedvalueEmp.filter(option => option["EmployeeName"].toLowerCase().includes(filterValue));
  }

  initlanguage() {
    return this._fb.group({
      subtask: ['', Validators.required]
    });
  }
  get tasksControl() {
    return this.formalForm as FormGroup;
  }

  get subtaskControl() {
    return this.tasksControl.get('subtasks') as FormArray;
  }

  onClick(e, ind) {
    var emp = this.empString;
    var formval = this.formalForm.value.subtasks;
    var index;

    var isUnique = true

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

    setTimeout(function () {
      if (ind == 0) {
        $(".AutoMat").addClass("indexZero");
      }
      else if (ind == 1) {
        $(".AutoMat").addClass("indexOne");
      }
      else if (ind % 2 != 0) {
        $(".AutoMat").addClass("indexOdd");
      }
      else if (ind % 2 == 0) {
        $(".AutoMat").addClass("indexEven");
      }
    });
    this.filteredOptions = emp;
  }

  onKey(event: KeyboardEvent, ind) {
    var val = (<HTMLInputElement>event.target).value || '';
    if (val && val.length > 3 && this.empString) {
      const filterValue = val.toLowerCase();
      this.filteredOptions = this.empString.filter(option => option["EmployeeName"].toLowerCase().includes(filterValue));
    }

    var isExists = this.isExists;
    var formval = this.formalForm.value.subtasks;
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
    setTimeout(function () {
      if (ind == 0) {
        $(".AutoMat").addClass("indexZero");
      }
      else if (ind == 1) {
        $(".AutoMat").addClass("indexOne");
      }
      else if (ind % 2 != 0) {
        $(".AutoMat").addClass("indexOdd");
      }
      else if (ind % 2 == 0) {
        $(".AutoMat").addClass("indexEven");
      }
    });
  }

  addName(i, control) {
    var val = this.formalForm as FormGroup,
      lastele, formval;
    formval = this.formalForm.value;
    if (formval.subtasks[i].subtask != "" && formval.subtasks[i].subtask != null) {
      if (val.value.subtasks && val.value.subtasks.length > 1) {
        var task = this._fb.group({
          subtask: [null]
        });
        this.subtaskControl.push(task);
      } else {
        this.subtaskControl.push(this.initlanguage());
      }
    }
    else {
      this.toastr.error('Please select employee');
    }
  }

  getPosts(val) {
    this.selectedEmployees.push(val.value);
  }

  removeLanguage(i: number) {
    const control = <FormArray>this.formalForm.controls['languages'];
    control.removeAt(i);
  }

  removeLink(i: number) {
    this.subtaskControl.removeAt(i);
  }
  showSuccess() {
    this.toastr.success('Hello world!', 'Toastr fun!');
  }

  changeCheckbox(i, categories, name, checkedval) {
    categories.forEach(function (res, index) {
      if (i != index) {
        res.checked = false;
      }
    })
    if (this.selectedCategory == name && checkedval) {
      this.selectedCategory = "";
    } else {
      this.selectedCategory = categories[i].name;
    }
    return categories[i].checked = true;
  }

  onFormalFormValidations(formvals, subtaskArr, category) {
    var toastr = this.toastr;
    var validationsErr = this.validationsErr;
    let invalidEmployee = this.invalidEmployee;
    var self = this;

    if (formvals && (formvals.site != null && formvals.site.replace(/\s/g, "") != "")
      && (formvals.department != null && formvals.department.replace(/\s/g, "") != "")
      && (formvals.value != null && formvals.value.replace(/\s/g, "") != "")
      && (formvals.reasons != null && formvals.reasons.replace(/\s/g, "") != "")
      && (category && category != null && category.replace(/\s/g, "") != "")) {
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
    var site, department, nemakValue, formalsubmit, selectedEmp, selectedEmpObj = [], Departments = [],
      todayTime, subtasks, LoginUser, LoginRole;

    const formvalues = this.formalForm.value;
    const divisions = this.siteusers;
    const values = this.deptusers;
    const depValues = this.deptvalues;
    const employees = this.empString;
    let validated = this.validationsErr;

    selectedEmp = this.selectedEmployees;
    subtasks = formvalues.subtasks;

    selectedEmp = [];

    if (localStorage.getItem('currentUser')) {
      LoginUser = JSON.parse(localStorage.getItem('currentUser')).username;
      LoginRole = JSON.parse(localStorage.getItem('currentUser')).Role
    }

    subtasks.forEach(function (r) {
      selectedEmpObj.push(employees.find((c) => (c["EmployeeName"] === r.subtask)));
    })

    validated = this.onFormalFormValidations(formvalues, selectedEmpObj, this.selectedCategory);

    if (!validated) {
      site = divisions.find((c) => (c["div_id"] === formvalues.site));
      department = values.find((c) => (c["dept_id"] === formvalues.department));
      nemakValue = depValues.find((c) => (c["value_id"] === formvalues.value));

      if (selectedEmpObj.length > 0) {
        selectedEmpObj.forEach(function (res) {
          res.DollarValue = 10;
          Departments.push(res.EmployeeDepartment);
          selectedEmp.push(res.EmployeeName);
        })
      }

      formalsubmit = {
        Submission_id: uuid(),
        Approval_id: this.getApprovalUniqueNumber(),
        Submitter_name: LoginUser,
        RecognitionNames: selectedEmp,
        Site: site["div_name"],
        Department: department["dept_name"],
        RecognitionDepartments: Departments,
        Category: this.selectedCategory,
        Reason: formvalues.reasons,
        SubmitDate: new Date(),
        Comments: null,
        RecognitionType: "Formal",
        ModifiedDate: new Date(),
        ModifiedBy: LoginUser,
        Status: "Pending",
        ValueId: formvalues.value,
        Value: nemakValue.nemak_value,
        RecognitionEmployees: selectedEmpObj
      }
       //console.log('formalsubmit', formalsubmit);
      this.spinner.hide();
      this.toastr.success('Successfully submitted request');
      this.selectedCategory = "";
      this.formalService.addFormalSubmission(formalsubmit, this.formalForm);
    }
  }
}


