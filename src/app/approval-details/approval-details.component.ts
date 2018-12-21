import { Component, OnInit, Input, Optional } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-approval-details',
  templateUrl: './approval-details.component.html',
  styleUrls: ['./approval-details.component.css']
})
export class ApprovalDetailsComponent implements OnInit {
  public DetailsForm: FormGroup;
  Division: String;
  Department: string;
  Category: string;
  Value: string;
  Recognized: string;
  Comments: string;

  @Input() aprId;
  @Input() aprData;


  constructor(private _fb: FormBuilder) { }

  ngOnInit() {
    debugger;
    console.log("apr data", this.aprData);
    console.log("id", this.aprId);

    var Aprid, resultData;
    Aprid = this.aprId;
    resultData = [];

    var aprResult = this.aprData;

    aprResult.forEach(function (res) {
      if (res["Approval_id"] != undefined && Aprid == res["Approval_id"]) {
        resultData.push(res);
        console.log("result data", res);
      }
    });


    this.Division = resultData[0].Site;
    this.Department = resultData[0].Department;
    this.Category = resultData[0].Category;
    this.Value = resultData[0].Value;
    this.Recognized = resultData[0].RecognitionNames;
    this.Comments = resultData[0].Comments;

    this.DetailsForm = this._fb.group({
      Division: [this.Division, Optional],
      Department: [this.Department, Optional],
      Category: [this.Category, Optional],
      Value: [this.Value, Optional],
      Recognized: [this.Recognized, Optional],
      Comments: [this.Comments, Optional]
    });

    console.log("form builder values", this.DetailsForm.value);
  }


}
