import { Component, OnInit,Optional } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { v4 as uuid } from 'uuid';
import { ContactService } from './contact.service'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  public contactForm: FormGroup;
  constructor(private fb: FormBuilder, public contactservice : ContactService,private toastr: ToastrService) { } 

  ngOnInit() {
    this.contactForm = this.fb.group({
      toWhom: ['', Optional],
      queryType: ['', Optional],
      Description: ['', Optional],
    });
  }

  showSuccess()
  {
    var Querysubmit;
    const formvalues = this.contactForm.value;

    Querysubmit = {
      SubmissionId      :uuid(),
      EmployeeName      : formvalues.toWhom,
      QueryType         : formvalues.queryType,
      QueryDescription  :formvalues.Description

    }
    if (formvalues.toWhom != "" &&  formvalues.toWhom != undefined && formvalues.queryType != "" && formvalues.queryType != undefined && formvalues.Description != "" && formvalues.Description != undefined  )
    {
      this.contactservice.addSubmitQuery(Querysubmit, this.contactForm);
      this.toastr.success('Successfully submitted request');
      this.contactForm.reset();
    }
    else
    {
      this.toastr.error("Please fill all the fileds");
    }
    
  }
}
