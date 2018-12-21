import { Component, ViewChild, OnInit, Optional, ElementRef,Input  } from '@angular/core';
import { FormGroup, Validators, FormBuilder} from '@angular/forms';
import { FormalRecogService } from '../formalrecog/formalrecog.service';
import { HttpErrorResponse } from '@angular/common/http/src/response';
import * as $ from 'jquery';
import { TagInputModule } from 'ngx-chips';

@Component({
  selector: 'app-formalreport-edit',
  templateUrl: './formalreport-edit.component.html',
  styleUrls: ['./formalreport-edit.component.css']
})
export class FormalreportEditComponent implements OnInit {
  public onForm: FormGroup;
  Division : string;
  Department : string;
  Category : string;
  Value   : string;
  Recognized : string;
  Description :string;
  Comments : string;
  siteuser : string[];
  deptusers : string[];
  deptvalues : string[];
  empString  : string[];
  filteredOptions = [];

  @Input() empId ;

  @Input() empData;

  constructor(private _fb: FormBuilder,private formalService: FormalRecogService) {
    TagInputModule.withDefaults({
      tagInput: {
        placeholder: 'Add a new tag',
        displayBy: 'EmployeeName',
        identifyBy: '_id'
        // add here other default values for tag-input
      },
      dropdown: {
        displayBy: 'EmployeeName',
        identifyBy: '_id'
        // add here other default values for tag-input-dropdown
      }
    });
   }

  @ViewChild('tags') valueInput: ElementRef; 

  ngOnInit() {
    console.log("data from the main ",this.empId);
    console.log("data from the parent ", this.empData);

    var empid ,resultData;
    empid = this.empId;
    resultData = [];

    var empResult = this.empData;

    empResult.forEach(function(res){
      if(res["_id"] != undefined && empid == res["_id"])
      {
          resultData.push(res);
          console.log("result emp", res);
      }
    });

    this.Description = resultData[0].Reason;
    this.Division  =  resultData[0].Site;
    this.Department  =  resultData[0].Department;
    this.Category  =  resultData[0].Category;
    this.Value  =  resultData[0].Value;
    this.Recognized = resultData[0].RecognitionEmployees;
    this.Comments  =  resultData[0].Comments;
    
    this.onForm = this._fb.group({
      Division: [this.Division, Optional],
      Department: [this.Department, Optional],
      Category: [this.Category, Optional],
      Value: [this.Value, Optional],
      Recognized: [this.Recognized, Optional],
      Description: [this.Description, Optional],
      Comments: [this.Comments, Optional]
    });

    console.log("form builder values",this.onForm.value);
    
    //Site
    this.formalService.getSite().subscribe(res => {
      this.siteuser = res as string[];
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
  }    

}
