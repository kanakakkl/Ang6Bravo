import { Component, OnInit, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import * as $ from 'jquery';
import {IMyDrpOptions, IMyDateRangeModel} from 'mydaterangepicker';
import {FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import { HeaderService } from './header.service'
import { HttpErrorResponse } from '@angular/common/http/src/response';
import { Adal6Service } from 'adal-angular6';

const config= {                           
  tenant: 'bdef9893-87ef-40e4-97a4-c7d985698696',                      
  clientId: 'e60bae2d-b8dc-4b02-8d2f-101c9ef28146'
} 

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  today: number = Date.now();

  paratext : string;
  headertext : string;
  isReports: boolean;
  isHome: boolean = true;
  isSpot: boolean;
  isFormal: boolean;
  isSpotReports : boolean;
  isFormalReports : boolean;
  isHelp: boolean;
  isContact: boolean;
  isFormalApproval : boolean;
  dateOptionsSelect= [];
  selectedValue : string ="";
  myDateRange : string = "";
  divisions:  string []; 
  filteredStatus = [];
  userName: string;
  
  selectedModule: any = null;

  myDateRangePickerOptions: IMyDrpOptions = {
    dateFormat: 'dd.mm.yyyy',
  };

  private model: any = {};
  myForm: FormGroup;
  
  @Output() valueChange = new EventEmitter();
  @ViewChild('plantVal') valueInput: any;
  @ViewChild('contentDivId') valId: any;

  @ViewChild('logoDivId') logoId: any;

  constructor(private _eref: ElementRef,public headerservice: HeaderService, private service:Adal6Service, private _fb: FormBuilder) {
      this.service.init(config);
   }

  ngOnInit() {
     //get the divisions
  this.headerservice.getNemakDivisions().subscribe( res => {
    this.divisions = res as string [];
  },
  (err: HttpErrorResponse) => {
    console.log (err.message);
  });

    $(document).ready(function () {
      $('#sidebarCollapse').on('click', function () {
          $('#sidebar').toggleClass('active');
          $(this).toggleClass('active');
      });
  });
  this.getInitialActiveRoute();
  // Handle callback if this is a redirect from Azure
  this.service.handleWindowCallback();

   //Check if the user is authenticated. If not, call the login() method
   if (!this.service.userInfo.authenticated) {
     this.service.login();
   }

   //Log the user information to the console
   //console.log('username ' + this.service.userInfo.username);
   //console.log('authenticated: ' + this.service.userInfo.authenticated);
    this.userName =   this.service.userInfo.profile.name;
   //console.log('token: ' + this.service.userInfo.token);
   //console.log(this.service.userInfo.profile);
  // console.log('userinfo', this.service.userInfo)

localStorage.setItem('currentUser', JSON.stringify({ token: this.service.userInfo.token, username: this.service.userInfo.username, Role: "DEVELOPMENT" }));
this.myForm = this._fb.group({
  myDateRange: ['', Validators.required],
  selectedValue: [this.selectedValue, Validators.required]
});
}
openedChange(opened: boolean) {
  console.log(opened ? 'opened' : 'closed');
}

  isActive(viewLocation) {
    var active = (viewLocation === window.location.pathname);
     return active;
  }

  getInitialActiveRoute(){
    var val = window.location.pathname.split("/")[1];
    this.getDirectionsOfHeaders(val);
  }

  getActiveRoute(val){
   this.getDirectionsOfHeaders(val);
  }

  getDirectionsOfHeaders(val){
    if(val == 'home' || val ==""){
      this.getHome();
    }else if(val == 'spotRecognition'){
      this.getSpotDetails();
    }else if(val == 'formalRecognition'){
      this.getFormalDetails();
    }else if(val == 'help'){
      this.getHelp();
    }else if(val == 'contact'){
      this.getContact();
    }else if(val == 'reports'){
      this.getReports();
    }else if(val == 'spotReports'){
      this.getSpotReports();
    }else if(val == 'formalReports'){
      this.getFormalReports();
    }else if(val == 'formalApprovals'){
      this.getApprovals();
    }
  }

  getFormalDetails(){
    this.isReports = false;
    this.isHome= false;
    this.isSpot= false;
    this.isFormal= true;
    this.isSpotReports = false;
    this.isFormalReports = false;
    this.isHelp= false;
    this.isContact= false;
    this.isFormalApproval = false;
    this.headertext =  "FORMAL RECOGNITION";
    this.paratext = "Recognize an employee or work group for a significant contribution or prolonged"
                    +" excellence in one of the following seven categories below."
                    +" After submission, the recommendation should be presented to the Recognition Committee for"
                    +" the nominated employee's site. An employee should receive a formal recognition certificate and an award"
                    +" of the minimum value of $10.";
     var f = this.valId.nativeElement.classList;
     var g = this.logoId.nativeElement.classList;
                    f.remove('isReportscontentdiv');
                    g.remove('isReportslogodiv');
                    g.remove('isreportsimg-logo');
  }

  getSpotDetails(){
    var f = this.valId.nativeElement.classList;
     var g = this.logoId.nativeElement.classList;
                    f.remove('isReportscontentdiv');
                    g.remove('isReportslogodiv');
                    g.remove('isreportsimg-logo');

    this.isReports = false;
    this.isHome= false;
    this.isSpot= true;
    this.isFormal= false;
    this.isSpotReports = false;
    this.isFormalReports = false;
    this.isHelp= false;
    this.isContact= false;
    this.isFormalApproval = false;
    this.headertext = "ON THE SPOT RECOGNITION";
    this.paratext = "Use BRAVO! card to offer spot recognition to employees"
                    +" for the efforts and contribution when the employee has gone beyond"
                    +" the call of duty and performed a particular outstanding project,"
                    +" product, action or reflection of our values. Make sure to give the $5 BRAVO! card to the employee you are recognizing.";
  }

  getHome(){
    var f = this.valId.nativeElement.classList;
     var g = this.logoId.nativeElement.classList;
                    f.remove('isReportscontentdiv');
                    g.remove('isReportslogodiv');
                    g.remove('isreportsimg-logo');

    this.isReports = false;
    this.isHome= true;
    this.isSpot= false;
    this.isFormal= false;
    this.isSpotReports = false;
    this.isFormalReports = false;
    this.isHelp= false;
    this.isContact= false;
    this.isFormalApproval = false;
    this.headertext = "HOME";
    this.paratext = "";
  }

  getHelp(){
    var f = this.valId.nativeElement.classList;
    var g = this.logoId.nativeElement.classList;
                   f.remove('isReportscontentdiv');
                   g.remove('isReportslogodiv');
                   g.remove('isreportsimg-logo');

    this.isReports = false;
    this.isHome= false;
    this.isSpot= false;
    this.isFormal= false;
    this.isSpotReports = false;
    this.isFormalReports = false;
    this.isHelp= true;
    this.isContact= false;
    this.isFormalApproval = false;
    this.headertext = "HELP";
    this.paratext = "Welcome to our online Helpdesk to understand the features of the Bravo app.";
  }

  getContact(){
    var f = this.valId.nativeElement.classList;
    var g = this.logoId.nativeElement.classList;
                   f.remove('isReportscontentdiv');
                   g.remove('isReportslogodiv');
                   g.remove('isreportsimg-logo');

    this.isReports = false;
    this.isHome= false;
    this.isSpot= false;
    this.isFormal= false;
    this.isSpotReports = false;
    this.isFormalReports = false;
    this.isHelp= false;
    this.isContact= true;
    this.isFormalApproval = false;
    this.headertext = "CONTACT DETAILS";
    this.paratext = "";
  }

  getReports(){
    var f = this.valId.nativeElement.classList;
     var g = this.logoId.nativeElement.classList;
                    f.add('isReportscontentdiv');
                    g.add('isReportslogodiv');
                    g.add('isreportsimg-logo');

    this.isReports = true;
    this.isHome= false;
    this.isSpot= false;
    this.isFormal= false;
    this.isSpotReports = false;
    this.isFormalReports = false;
    this.isHelp= false;
    this.isContact= false;
    this.isFormalApproval = false;
    this.headertext = "AWARD ANALYTICS";
    this.paratext="";
  } 
  getSpotReports(){
    var f = this.valId.nativeElement.classList;
    var g = this.logoId.nativeElement.classList;
                   f.remove('isReportscontentdiv');
                   g.remove('isReportslogodiv');
                   g.remove('isreportsimg-logo');

    this.isReports = false;
    this.isHome= false;
    this.isSpot= false;
    this.isFormal= false;
    this.isSpotReports = true;
    this.isFormalReports = false;
    this.isHelp= false;
    this.isContact= false;
    this.isFormalApproval = false;
    this.headertext = "ON THE SPOT REPORTS";
    this.paratext = "";
  }
  getFormalReports(){
    this.isReports = false;
    this.isHome= false;
    this.isSpot= false;
    this.isFormal= false;
    this.isSpotReports = false;
    this.isFormalReports = true;
    this.isHelp= false;
    this.isContact= false;
    this.isFormalApproval = false;
    this.headertext = "FORMAL REPORTS";
    this.paratext = "";

    var f = this.valId.nativeElement.classList;
     var g = this.logoId.nativeElement.classList;
                    f.remove('isReportscontentdiv');
                    g.remove('isReportslogodiv');
                    g.remove('isreportsimg-logo');

  }
  getApprovals(){
    this.isReports = false;
    this.isHome= false;
    this.isSpot= false;
    this.isFormal= false;
    this.isSpotReports = false;
    this.isFormalReports = false;
    this.isHelp= false;
    this.isContact= false;
    this.isFormalApproval = true;
    this.headertext = "FORMAL APPROVALS";
    this.paratext = "";

    var f = this.valId.nativeElement.classList;
     var g = this.logoId.nativeElement.classList;
                    f.remove('isReportscontentdiv');
                    g.remove('isReportslogodiv');
                    g.remove('isreportsimg-logo');
  }

  onClick(event){
    var classes = event.target.classList;

    if (classes.contains("mat-select-arrow-wrapper") ||
        classes.contains("mat-select-placeholder") ||
        classes.contains("mat-select-value")||
        classes.contains("mat-option-pseudo-checkbox") ||
        classes.contains("mat-option-text")||
        classes.contains("ng-tns-c4-1")) {
        $(".mat-select-panel").css("display", "block");
    }else{
      $(".mat-select-panel").css("display", "none");
    }
  }

  changeClient2(data) {
    if (data != undefined) {
      this.selectedValue = data;
    }
    this.valueChange.emit(this.selectedValue);
  }

  onDateRangeChanged(event: IMyDateRangeModel) {
    var form = this.myForm.value;
    this.myDateRange = event.beginJsDate +' - '+ event.endJsDate;

    //getting plant select parent array;
    var values = this.valueInput._parent.options._results;

    //clearing the plant selections if the user changes the date. 
    if((this.myDateRange && ( this.myDateRange != "null - null" )) || ( this.myDateRange && ( this.myDateRange != "" ) ) ){
      this.selectedValue = "";
      values.forEach(function(r){
        r.deselect();
      })
    }
    this.valueChange.emit(this.myDateRange);
  }
 
}  
