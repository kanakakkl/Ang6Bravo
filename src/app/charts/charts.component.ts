import { Component, OnInit, ViewChild, ViewChildren, QueryList, ElementRef, Input } from '@angular/core';
import * as FusionCharts from 'fusioncharts';
import { ReportlistService } from '../reportslist/reportlist.service'
import { HttpErrorResponse } from '@angular/common/http/src/response';
import { NgxSpinnerService } from 'ngx-spinner';
import { callbackify } from 'util';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {

  mdlSampleIsOpen: boolean = false;
  mdlIsOpen: boolean = false;
  list: string[];
  filteredDRstackedColumnData: any;
  filteredPlantstackedColumnData: any;

  selectedTableValue: string = "";
  tableDateRange: string = "";
  private callback: EventListener;
  imageUrl = "assets/img/barchat1.png";
  imageUrl1 = "assets/img/tablechart1.png";

  @Input() data;
  @Input() daterangeval;

  stackedColumnData = this.getStackedDataRedefined();

  exportChart(e) {
    FusionCharts.batchExport({
      exportFormat: 'pdf'
    })
  }

  constructor(public reportlistService: ReportlistService, private spinner: NgxSpinnerService) { }

  ngOnInit() {

    this.openModal(true, 'initial');
  }

  addImg() {
    this.imageUrl = "assets/img/barchat1.png";
    this.imageUrl1 = "assets/img/tablechart1.png";
  }
  addImg1() {
    this.imageUrl1 = "assets/img/tablechart2.png";
    this.imageUrl = "assets/img/barchat2.png";
  }
  getStackedDataRedefined() {
    var obj;
    return obj = {
      chart: {
        //caption: "Yearly Energy Production Rate",
        caption: "",
        //subCaption: " Top 5 Developed Countries",
        subCaption: "",
        slantLabels: "1",
        numbersuffix: " ",
        showSum: "1",
        plotToolText:
          "$label has <b>$dataValue</b> approvals from $seriesName",
        theme: "fusion"
      },
      categories: [{
        category: [{ label: "Jan" }, { label: "Feb" }, { label: "Mar" }, { label: "Apr" }, { label: "May" },
        { label: "Jun" }, { label: "Jul" }, { label: "Aug" }, { label: "Sep" },
        { label: "Oct" }, { label: "Nov" }, { label: "Dec" }]
      }],
      dataSet: [
        {
          seriesName: "Nemak Wisconsin",
          data: [
            { value: 0 }, { value: 0 }, { value: 0 }, { value: 0 }, { value: 0 }, { value: 0 },
            { value: 0 }, { value: 0 }, { value: 0 }, { value: 0 }, { value: 0 }, { value: 0 }
          ]
        },
        {
          seriesName: "Nemak Southfield",
          data: [
            { value: 0 }, { value: 0 }, { value: 0 }, { value: 0 }, { value: 0 }, { value: 0 },
            { value: 0 }, { value: 0 }, { value: 0 }, { value: 0 }, { value: 0 }, { value: 0 }
          ]
        },
        {
          seriesName: "Nemak Kentucky",
          data: [
            { value: 0 }, { value: 0 }, { value: 0 }, { value: 0 }, { value: 0 }, { value: 0 },
            { value: 0 }, { value: 0 }, { value: 0 }, { value: 0 }, { value: 0 }, { value: 0 }
          ]
        },
        {
          seriesName: "Nemak Canada",
          data: [
            { value: 0 }, { value: 0 }, { value: 0 }, { value: 0 }, { value: 0 }, { value: 0 },
            { value: 0 }, { value: 0 }, { value: 0 }, { value: 0 }, { value: 0 }, { value: 0 }
          ]
        },
        {
          seriesName: "Nemak Alabama",
          data: [
            { value: 0 }, { value: 0 }, { value: 0 }, { value: 0 }, { value: 0 }, { value: 0 },
            { value: 0 }, { value: 0 }, { value: 0 }, { value: 0 }, { value: 0 }, { value: 0 }
          ]
        },
        {
          seriesName: "Nemak Tennessee",
          data: [
            { value: 0 }, { value: 0 }, { value: 0 }, { value: 0 }, { value: 0 }, { value: 0 },
            { value: 0 }, { value: 0 }, { value: 0 }, { value: 0 }, { value: 0 }, { value: 0 }
          ]
        }
      ]
    }

  }

  getChartData() {
    this.reportlistService.getSubmissions().subscribe(res => {
      this.list = res as string[];

      for (var i = 0; i <= this.list.length - 1; i++) {
        for (var j = 0; j <= this.stackedColumnData.dataSet.length - 1; j++) {
          if (res[i].Site == this.stackedColumnData.dataSet[j].seriesName) {
            this.stackedColumnData.dataSet[j].data[new Date(res[i].SubmitDate).getMonth()].value += 1;
          }
        }
      }
    },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      });
  }

  private openModal(open: boolean, val): void {
    this.mdlSampleIsOpen = open;
    if (val == 'isChart') {

      this.openTableModal(false, val);
    }
  }


  private openTableModal(open: boolean, val): void {
    if (val == 'isTable') {
      this.openModal(false, val);
    }
    this.mdlIsOpen = open;
  }

  ngOnChanges() {
    let selectedPlants = this.data;
    let stackeddata = this.stackedColumnData;
    let daterangeval = this.daterangeval;
    let arr = [];
    const self = this;

    this.selectedTableValue = this.data;
    this.tableDateRange = this.daterangeval;


    if (typeof (this.daterangeval) == "string" && this.daterangeval != "" && selectedPlants.length == 0) {
      this.filterrangeval(this.daterangeval);
      return;
    }

    if (selectedPlants.length > 0 && (this.daterangeval == "" || this.daterangeval == "null - null")) {
      this.getSelectedPlantsData(selectedPlants, arr)

    } else if (this.daterangeval == "" || this.daterangeval == "null - null") {
      this.stackedColumnData = this.getStackedDataRedefined();
      this.getChartData();
      return this.stackedColumnData.dataSet;
    }

    if (typeof (this.daterangeval) == "string" &&
      this.daterangeval != "" && selectedPlants.length > 0 &&
      (this.filteredDRstackedColumnData != undefined ||
        (this.filteredDRstackedColumnData && this.filteredDRstackedColumnData.length > 0)) &&
      (this.filteredPlantstackedColumnData == undefined ||
        (this.filteredPlantstackedColumnData && this.filteredPlantstackedColumnData.length == 0))) {

      this.filterrangeOnbasisplantval(this.daterangeval, selectedPlants);
    } else if (typeof (this.daterangeval) == "string" &&
      this.daterangeval != "" && selectedPlants.length > 0 &&
      (this.filteredDRstackedColumnData == undefined ||
        (this.filteredDRstackedColumnData && this.filteredDRstackedColumnData.length == 0)) &&
      (this.filteredPlantstackedColumnData == undefined ||
        (this.filteredPlantstackedColumnData && this.filteredPlantstackedColumnData.length == 0))) {

      self.filterrangeval(daterangeval).then(function () {
        self.filterrangeOnbasisplantval(daterangeval, selectedPlants);
      });

    }
  }

  getSelectedPlantsData(selectedPlants, arr) {
    //redefining dataset and making service call. so that the data count will not be doubled as 3 to 6
    var stackeddata = this.getStackedDataRedefined();
    this.getChartData();

    selectedPlants.forEach(function (r) {
      arr.push(stackeddata.dataSet.filter(option => option["seriesName"].includes(r)));
    })

    //below line used to convert [[arr1][arr2]] to [arr1,arr2]
    var result = [].concat.apply([], arr);
    this.filteredDRstackedColumnData = [];
    this.filteredPlantstackedColumnData = result;
    return this.stackedColumnData.dataSet = result;
  }

  filterrangeval(datarangeval) {
    return new Promise((resolve, reject) => {
      var self = this;
      let fromStringdate = datarangeval.split("-")[0].trim();
      let endStringdate = datarangeval.split("-")[1].trim();
      let monthVal = new Array();
      var f;

      //if Date range has null or cleared
      if (fromStringdate.trim() == "null" || endStringdate.trim() == "null") {
        this.stackedColumnData = this.getStackedDataRedefined();
        this.getChartData();
        return this.stackedColumnData.dataSet;
      }

      let fromDate = new Date(fromStringdate);
      let endDate = new Date(endStringdate);

      //redefining dataset and making service call. so that the data count will not be doubled as 3 to 6
      this.stackedColumnData = this.getStackedDataRedefined();
      let stackedColumnData = this.stackedColumnData.dataSet;

      let arr = [];

      //The arr records consisting of duplications so making count value 0
      this.reportlistService.getSubmissions().subscribe(res => {
        this.list = res as string[];
        this.list.forEach(function (r) {
          for (var j = 0; j < stackedColumnData.length; j++) {

            if (r["Site"] == stackedColumnData[j].seriesName &&
              self.getDateTimeComparision(new Date(r["SubmitDate"]), fromDate) &&
              self.getEndDateTimeComparision(new Date(r["SubmitDate"]), endDate)) {

              monthVal.push(new Date(r["SubmitDate"]).getMonth() + ":" + r["Site"] + ":" + new Date(r["SubmitDate"]).getDate());

              arr.push(stackedColumnData[j]);
            }
          }
        })
        console.log("arr", arr, monthVal);
        this.filteredDRstackedColumnData = [];
        //assigning counts and removing duplications.
        this.getRelatedData(arr, stackedColumnData, monthVal);
      },
        (err: HttpErrorResponse) => {
          console.log(err.message);
        });
      setTimeout(() => {
        resolve();
      }, 500)
    });
  }


  getDateTimeComparision(date1, date2) {
    var a = date1.toLocaleDateString();
    var b = date2.toLocaleDateString();

    var h = a.split("/");
    var i = b.split("/");

    a = h[2] + "-" + h[0] + "-" + h[1];
    b = i[2] + "-" + i[0] + "-" + i[1];
    if (new Date(a) > new Date(b)) {
      return true;
    } else {
      date1.setHours(0, 0, 0, 0);
      date2.setHours(0, 0, 0, 0);

      if (date1.getTime() == date2.getTime()) {
        return date1.getTime() == date2.getTime();
      }
      else {
        return false;
      }
    }
  }

  getEndDateTimeComparision(date1, date2) {
    var a = date1.toLocaleDateString();
    var b = date2.toLocaleDateString();

    var h = a.split("/");
    var i = b.split("/");

    a = h[2] + "-" + h[0] + "-" + h[1];
    b = i[2] + "-" + i[0] + "-" + i[1];

    if (new Date(a) < new Date(b)) {
      return true;
    } else {
      date1.setHours(0, 0, 0, 0);
      date2.setHours(0, 0, 0, 0);

      if (date1.getTime() == date2.getTime()) {
        return date1.getTime() == date2.getTime();
      }
      else {
        return false;
      }
    }
  }


  getRelatedData(arr, stackedColumnData, monthVal) {
    var result = [].concat.apply([], arr);
    console.log("result", result);

    //If within date range there is no records to show
    if (result.length == 0) {
      this.filteredPlantstackedColumnData = [];
      this.stackedColumnData = this.getStackedDataRedefined();
      return this.stackedColumnData.dataSet;
    }

    //To remove duplications
    let x = (result) => result.filter((v, i) => result.indexOf(v) === i)
    let removeDuplicated = x(result);

    removeDuplicated.forEach(function (resdata) {
      monthVal.forEach(function (val) {
        var mval = parseInt(val.split(":")[0]);
        var seriesval = val.split(":")[1];
        if (resdata["seriesName"] == seriesval) {
          resdata.data[mval].value += 1;
        }
      })
    })

    this.filteredPlantstackedColumnData = [];
    this.filteredDRstackedColumnData = removeDuplicated;

    return this.stackedColumnData.dataSet = removeDuplicated;
  }

  filterrangeOnbasisplantval(daterange, selectedPlants) {
    let filteredDRstackedColumnData = this.filteredDRstackedColumnData;
    let filteredPlantstackedColumnData = this.filteredPlantstackedColumnData;
    let arr = [];
    var self = this;

    if (filteredDRstackedColumnData != undefined || (filteredDRstackedColumnData && filteredDRstackedColumnData.length > 0)) {

      this.stackedColumnData = this.getStackedDataRedefined();

      selectedPlants.forEach(function (r) {
        arr.push(filteredDRstackedColumnData.filter(option => option["seriesName"].includes(r)));
      })

      var result = [].concat.apply([], arr);
      if (result.length == 0) {
        this.stackedColumnData = this.getStackedDataRedefined();
        return this.stackedColumnData.dataSet;
      }
      return this.stackedColumnData.dataSet = result;
    }
  }
}

