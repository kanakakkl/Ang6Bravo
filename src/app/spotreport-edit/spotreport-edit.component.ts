import { Component, ViewChild, OnInit, Optional, ElementRef, Input } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { SpotrecogService } from '../spotrecog/spotrecog.service';
import { HttpErrorResponse } from '@angular/common/http/src/response';
import { TagInputModule } from 'ngx-chips';

@Component({
  selector: 'app-spotreport-edit',
  templateUrl: './spotreport-edit.component.html',
  styleUrls: ['./spotreport-edit.component.css']
})
export class SpotreportEditComponent implements OnInit {
  public onForm: FormGroup;
  users: string[];
  valueString: string[];
  Site: string;
  Value: string;
  Recognized: string;
  Description: string;
  Comments: string;
  empString: string[];

  @Input() myData;
  @Input() spotempId;
  constructor(private fb: FormBuilder, public spotservice: SpotrecogService) {
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
    console.log("data from the main ", this.spotempId);
    console.log("formvalues", this.myData);
    var empid, resultData;
    empid = this.spotempId;
    resultData = [];

    var empResult = this.myData;

    empResult.forEach(function (res) {
      if (res["_id"] != undefined && empid == res["_id"]) {
        resultData.push(res);
        console.log("result emp", res);
      }
    });
    this.Description = resultData[0].Reason;
    this.Site = resultData[0].Site;
    this.Recognized = resultData[0].RecognitionEmployees;
    this.Value = resultData[0].Value;
    this.Comments = resultData[0].Comments;

    this.onForm = this.fb.group({
      Site: [this.Site, Optional],
      Value: [this.Value, Optional],
      Recognized: [this.Recognized, Optional],
      Description: [this.Description, Optional],
      Comments: [this.Comments, Optional]
    });
    //sites
    this.getDivisions();

    //nemak values
    this.getNemakvalues();

    //get the employees
    this.spotservice.getEmp().subscribe(res => {
      this.empString = res as string[];
      console.log("Nemak employess ", this.empString);
    },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      });
  }
  //sites
  getDivisions() {
    this.spotservice.getDivisions().subscribe(res => {
      this.users = res as string[];
    },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      });
  }

  //nemak values 

  getNemakvalues() {
    this.spotservice.getValues().subscribe(res => {
      this.valueString = res as string[];
    },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      });
  }
}
