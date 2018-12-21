import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormalreportsService } from '../formalreports/formalreports.service';
import { HttpErrorResponse } from '@angular/common/http/src/response';
import { Observable, from } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { FormalapprovalService } from './formalapproval.service';
import * as io from 'socket.io-client';
import * as $ from 'jquery';


@Component({
  selector: 'app-formalapprovals',
  templateUrl: './formalapprovals.component.html',
  styleUrls: ['./formalapprovals.component.css']
})
export class FormalapprovalsComponent implements OnInit {
  socket;
  detailsmdlIsOpen: boolean;
  submissionDetails: any;
  formalSubmissionRecords = [];
  Formalsubmissions = [];
  approveId: string;
  isModelActive: boolean;
  allComments: string[];
  searchText: string;
  toSearchText = [];
  scrollBarWidths: any;
  sIndex: number = null

  @ViewChild('addcomment') addcomment: ElementRef;

  constructor(private formalreportsService: FormalreportsService, private spinner: NgxSpinnerService, private toastr: ToastrService, private formalapprovalService: FormalapprovalService) {
    this.socket = io();
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
    if (!this.searchText || this.searchText == "All") {
      this.toSearchText = [];
      return this.formalSubmissionRecords;
    }
    if (this.searchText) {
      divData = this.formalSubmissionRecords;
      this.toSearchText = this.filterIt(divData, this.searchText);
      return this.filterIt(divData, this.searchText);
    }
  }


  getApprovalFilter() {
    var getLeftPosi = function () {
      return $('.list').position().left;
    };
    this.searchText = "Approved";
    this.getformalSubmissions();
    this.search();
    $('.list').animate({ left: "-=" + getLeftPosi() + "px" }, 'slow', function () {

    });
  }

  getDeclinedFilter() {
    var getLeftPosi = function () {
      return $('.list').position().left;
    };
  
    this.searchText = "Declined";
    this.getformalSubmissions();
    this.search();
    $('.list').animate({ left: "-=" + getLeftPosi() + "px" }, 'slow', function () {

    });
  }

  getPendingFilter() {
    var getLeftPosi = function () {
      return $('.list').position().left;
    };
    this.searchText = "Pending";
    this.getformalSubmissions();
    this.search();
    $('.list').animate({ left: "-=" + getLeftPosi() + "px" }, 'slow', function () {

    });
  }

  getAllFilter() {
    var getLeftPosi = function () {
      return $('.list').position().left;
    };
    this.searchText = "All";
    this.getformalSubmissions();
    this.search();
    $('.list').animate({ left: "-=" + getLeftPosi() + "px" }, 'slow', function () {

    });
  }
  getSearchTextFilter() {
    var getLeftPosi = function () {
      return $('.list').position().left;
    };
    this.searchText = "";
    this.search();
    $('.list').animate({ left: "-=" + getLeftPosi() + "px" }, 'slow', function () {

    });
  }


  View(data) {
    this.openFormDelModal(true);
    this.onSelect(data);
    this.approveId = data.Approval_id;
  }

  openFormDelModal(open: boolean): void {
    this.detailsmdlIsOpen = open;
    this.isModelActive = open;

  }
  onSelect(selectedItem: any) {
    this.isModelActive = true;

  }

  ngOnInit() {
    this.getAllComments();
    this.getformalSubmissions();
    this.socket.on('newTaskAdded', () => {
      this.getAllComments();
    })
    this.getScroller(this.searchText);
  }

  getScroller(test) {
    /*scroller*/
    // var scrollBarWidths = function(){
    //   var scrollwidth = widthOfList()-($('.wrapper').outerWidth());
    //   return scrollwidth;
    // }
    var scrollBarWidths = function(){
      var scrollwidth;     
      scrollwidth =  $('.wrapper').outerWidth()-820;
      return scrollwidth;
    }
    // var scrollBarWidths = 460;
    var formalSubmissionRecords = this.formalSubmissionRecords;

    var widthOfList = function () {
      var itemsWidth = 0;
      $('.item').each(function () {
        var itemWidth = $(this).outerWidth();
        itemsWidth += itemWidth;
      });
      return itemsWidth;
    };

    var widthOfHidden = function () {
      return (($('.wrapper').outerWidth()) - widthOfList() - getLeftPosi()) - scrollBarWidths();
    };

    var getLeftPosi = function () {
      return $('.list').position().left;
    };

    var reAdjust = function () {
      if (($('.wrapper').outerWidth()) < widthOfList()) {
        $('.scroller-right').show();
      }
      else {
        $('.scroller-right').hide();
      }

      if (getLeftPosi() < 0) {
        $('.scroller-left').show();
      }
      else {
        $('.item').animate({ left: "-=" + getLeftPosi() + "px" }, 'slow');
        $('.scroller-left').hide();
      }
    }

    reAdjust();

    $(window).on('resize', function (e) {
      reAdjust();
    });

    $('.scroller-right').click(function () {

      // $('.scroller-left').fadeIn('slow');
      // $('.scroller-right').fadeOut('slow');
      console.log("Next Click",widthOfList());
      if ((formalSubmissionRecords && formalSubmissionRecords.length > 3) && widthOfList() >= 1150) {
        $('.list').animate({ left: "+=" + widthOfHidden() + "px" }, 'slow', function () {
          //reAdjust();
        });
      }
    });

    $('.scroller-left').click(function () {
      console.log("Previous Click",widthOfList());
      if ((formalSubmissionRecords && formalSubmissionRecords.length > 3) && widthOfList() >= 1150){
        // $('.scroller-right').fadeIn('slow');
        // $('.scroller-left').fadeOut('slow');

        $('.list').animate({ left: "-=" + getLeftPosi() + "px" }, 'slow', function () {

        });
      }
       
      
    });
  }

  getAllComments() {
    this.formalapprovalService.getCommnents().subscribe(res => {
      this.allComments = res as string[];
    },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      });
  }

  acceptReocg(addcommentele, Data) {

    this.sIndex = this.allComments.length;
    var val = addcommentele.value;
    var acceptQuery;

    acceptQuery = {

      Approval_id: Data.Approval_id,
      Commented_by: "HR Manager",
      Comments: val,
      Commented_date: Date.now(),
      Status: "Approved"
    }
    if (val != undefined && val != "") {
      this.formalapprovalService.addcomments(acceptQuery);
      this.formalapprovalService.updateSubmissionStatus(acceptQuery);
      addcommentele.value = "";
      this.getSearchTextFilter();
    }
    else {
      this.toastr.error("Please add the comment");
    }

  }

  declineReocg(addcommentele, Data, index) {
    var arr = [];
    this.allComments.forEach(function(res){
        if(Data["Approval_id"] == res["Approval_id"]){
          arr.push(res);
        }
    })
    this.sIndex = this.allComments.length;
    var decval = addcommentele.value;
    var acceptQuery;

    acceptQuery = {
      Approval_id: Data.Approval_id,
      Commented_by: "HR Manager",
      Comments: decval,
      Commented_date: Date.now(),
      Status: "Declined"
    }
    if (decval != undefined && decval != "") {
      this.formalapprovalService.addcomments(acceptQuery);
      this.formalapprovalService.updateSubmissionStatus(acceptQuery);
      addcommentele.value = "";
      this.getSearchTextFilter();
    }
    else {
      this.toastr.error("Please add the comment");
    }

  }

  pendingReocg(addcommentele, Data) {
    this.sIndex = this.allComments.length;  
    var arr = [];
    this.allComments.forEach(function(res){
        if(Data["Approval_id"] == res["Approval_id"]){
          arr.push(res);
        }
    })
     this.sIndex = arr.length;
    var pendingval = addcommentele.value;
    var acceptQuery;

    acceptQuery = {
      Approval_id: Data.Approval_id,
      Commented_by: "HR Manager",
      Comments: pendingval,
      Commented_date: Date.now(),
      Status: "pending"
    }
    if (pendingval != undefined && pendingval != "") {
      this.formalapprovalService.addcomments(acceptQuery);
      this.formalapprovalService.updateSubmissionStatus(acceptQuery);
      addcommentele.value = "";
      this.getSearchTextFilter();
    }
    else {
      this.toastr.error("Please add the comment");
    }

  }

  getformalSubmissions() {
    this.formalSubmissionRecords = [];
    var formalSubmissions = this.formalSubmissionRecords;
    this.formalreportsService.getformalSubmissions().subscribe(res => {
      this.Formalsubmissions = res as string[];
      this.Formalsubmissions.forEach(function (resData) {
        if (resData["RecognitionType"] == 'Formal') {
          formalSubmissions.push(resData);
        }
      })
      this.formalSubmissionRecords = formalSubmissions;
    },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      });
  }

}
