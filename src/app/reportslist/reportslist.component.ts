import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { HeaderComponent } from '../../app/header/header.component';
import { ReportlistService } from './reportlist.service'
import { HttpErrorResponse } from '@angular/common/http/src/response';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-reportslist',
  templateUrl: './reportslist.component.html',
  styleUrls: ['./reportslist.component.css']
})
export class ReportslistComponent implements OnInit {
  submissions: string[];
  Tablelist: string[];
  personArray = this.getStackedDataRedefined();
  filteredDRstackedColumnData: any;
  filteredPlantstackedColumnData: any;

  @Input() tableData;
  @Input() tableDaterangeval;

  optvalue: string;
  constructor(public reportlistService: ReportlistService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    //  this.getTableData();
  }

  getTableData() {
    this.reportlistService.getSubmissions().subscribe(res => {
      this.Tablelist = res as string[];
      let tablelist = this.Tablelist;
      let personArray = this.personArray;

      var date;

      for (var i = 0; i <= tablelist.length - 1; i++) {
        for (var j = 0; j <= personArray.length - 1; j++) {
          if (res[i].Site == this.personArray[j]["division"]) {
            const monthNames = ["jan", "feb", "mar", "apr", "may", "jun",
              "jul", "aug", "sep", "oct", "nov", "dec"
            ];

            const d = new Date(res[i].SubmitDate);
            var month = monthNames[d.getMonth()];
            var personobj = Object.keys(personArray[j]);
            personobj.forEach(function (response) {
              if (response == month) {
                personArray[j][response] += 1;
              }
            })

          }
        }
      }

    },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      });
  }


  ngOnChanges() {
    let selectedPlants = this.tableData;
    let stackeddata = this.personArray;
    let arr = [];
    let tableDaterangeval = this.tableDaterangeval;
    const self = this;

    if (typeof (this.tableDaterangeval) == "string" && this.tableDaterangeval != "" && selectedPlants.length == 0) {
      this.filterrangeval(this.tableDaterangeval);
      return;
    }

    if (selectedPlants.length > 0 && (this.tableDaterangeval == "" || this.tableDaterangeval == "null - null")) {
      this.getSelectedPlantsData(selectedPlants, arr);

    } else if (this.tableDaterangeval == "" || this.tableDaterangeval == "null - null") {
      this.spinner.show();
      this.personArray = this.getStackedDataRedefined()
      this.getTableData();
      this.spinner.hide();
      return this.personArray;
    }

    if (typeof (this.tableDaterangeval) == "string" &&
      this.tableDaterangeval != "" && selectedPlants.length > 0 &&
      (this.filteredDRstackedColumnData != undefined ||
        (this.filteredDRstackedColumnData && this.filteredDRstackedColumnData.length > 0)) &&
      (this.filteredPlantstackedColumnData == undefined ||
        (this.filteredPlantstackedColumnData && this.filteredPlantstackedColumnData.length == 0))) {

      this.filterrangeOnbasisplantval(this.tableDaterangeval, selectedPlants);
    } else if (typeof (this.tableDaterangeval) == "string" &&
      this.tableDaterangeval != "" && selectedPlants.length > 0 &&
      (this.filteredDRstackedColumnData == undefined ||
        (this.filteredDRstackedColumnData && this.filteredDRstackedColumnData.length == 0)) &&
      (this.filteredPlantstackedColumnData == undefined ||
        (this.filteredPlantstackedColumnData && this.filteredPlantstackedColumnData.length == 0))) {

        self.filterrangeval(tableDaterangeval).then(function () {
          self.filterrangeOnbasisplantval(tableDaterangeval, selectedPlants);
        });

    }
  }

  getSelectedPlantsData(selectedPlants, arr) {
      this.spinner.show();
      //redefining dataset and making service call. so that the data count will not be doubled as 3 to 6
      var stackeddata = this.getStackedDataRedefined();
      this.getTableData();

      selectedPlants.forEach(function (r) {
        arr.push(stackeddata.filter(option => option["division"].includes(r)));
      })

      //below line used to convert [[arr1][arr2]] to [arr1,arr2]
      var result = [].concat.apply([], arr);
      this.filteredDRstackedColumnData = [];
      this.filteredPlantstackedColumnData = result;
      this.spinner.hide();
      this.personArray = result;
  }

  private sorted = false;
  total = [];

  getStackedDataRedefined() {
    var obj;
    return obj = [
      { id: "1", division: 'Nemak Alabama', jan: 0, feb: 0, mar: 0, apr: 0, may: 0, jun: 0, jul: 0, aug: 0, sep: 0, oct: 0, nov: 0, dec: 0 },
      { id: "2", division: 'Nemak Tennessee', jan: 0, feb: 0, mar: 0, apr: 0, may: 0, jun: 0, jul: 0, aug: 0, sep: 0, oct: 0, nov: 0, dec: 0 },
      { id: "3", division: 'Nemak Wisconsin', jan: 0, feb: 0, mar: 0, apr: 0, may: 0, jun: 0, jul: 0, aug: 0, sep: 0, oct: 0, nov: 0, dec: 0 },
      { id: "4", division: 'Nemak Southfield', jan: 0, feb: 0, mar: 0, apr: 0, may: 0, jun: 0, jul: 0, aug: 0, sep: 0, oct: 0, nov: 0, dec: 0 },
      { id: "5", division: 'Nemak Kentucky', jan: 0, feb: 0, mar: 0, apr: 0, may: 0, jun: 0, jul: 0, aug: 0, sep: 0, oct: 0, nov: 0, dec: 0 },
      { id: "6", division: 'Nemak Canada', jan: 0, feb: 0, mar: 0, apr: 0, may: 0, jun: 0, jul: 0, aug: 0, sep: 0, oct: 0, nov: 0, dec: 0 }
    ];
  }

  sortBy(by: string | any): void {
    this.personArray.sort((a: any, b: any) => {
      if (a[by] < b[by]) {
        return this.sorted ? 1 : -1;
      }
      if (a[by] > b[by]) {
        return this.sorted ? -1 : 1;
      }
      return 0;
    });

    this.sorted = !this.sorted;
  }

  getSum(index): number {
    let sum = 0;

    let column = this.personArray[index];
    let columnVals =  Object.keys(column).map(itm => column[itm]);
    //let columnVals = Object.values(column);
    columnVals.forEach(function (res) {
      if (typeof res == "number") {
        sum += res;
      }
    })
    //this.total[index] = sum;
    return sum;
  }

  getColTotal(val): number {
    let sum = 0;
    let column = this.personArray;

    column.forEach(function (res) {
      sum += res[val];
    })
    return sum;
  }

  getTotal(): number {
    let sum = 0;
    let columnVals;
    let column = this.personArray;

    column.forEach(function (res) {
      columnVals = Object.keys(res).map(itm => res[itm]);
      //columnVals = Object.values(res);
      columnVals.forEach(function (res) {
        if (typeof res == "number") {
          sum += res;
        }
      })
    })
    return sum;
  }

  filterrangeval(datarangeval) {
    return new Promise((resolve, reject) => {
      this.spinner.show();
      var self = this;
      let fromStringdate = datarangeval.split("-")[0].trim();
      let endStringdate = datarangeval.split("-")[1].trim();
      let monthVal = new Array();

      //if Date range has null or cleared
      if (fromStringdate.trim() == "null" || endStringdate.trim() == "null") {
        this.personArray = this.getStackedDataRedefined();
        this.getTableData();
        this.spinner.hide();
        return this.personArray;
      }

      let fromDate = new Date(fromStringdate);
      let endDate = new Date(endStringdate);

      //redefining dataset and making service call. so that the data count will not be doubled as 3 to 6
      this.personArray = this.getStackedDataRedefined();
      let stackedColumnData = this.personArray;
      const monthNames = ["jan", "feb", "mar", "apr", "may", "jun",
        "jul", "aug", "sep", "oct", "nov", "dec"
      ];

      let arr = [];

      //The arr records consisting of duplications so making count value 0
      this.reportlistService.getSubmissions().subscribe(res => {
        this.Tablelist = res as string[];
        this.Tablelist.forEach(function (r) {
          for (var j = 0; j < stackedColumnData.length; j++) {
            if (r["Site"] == stackedColumnData[j].division &&
              self.getDateTimeComparision(new Date(r["SubmitDate"]), fromDate) &&
              self.getEndDateTimeComparision(new Date(r["SubmitDate"]), endDate)) {
              let dt = new Date(r["SubmitDate"]);
              let month = monthNames[dt.getMonth()];
              let personobj = Object.keys(stackedColumnData[j]);
              personobj.forEach(function (response) {
                if (response == month) {
                  stackedColumnData[j][response] = 0;
                }
              })
              monthVal.push(new Date(r["SubmitDate"]).getMonth() + ":" + r["Site"] + ":" + new Date(r["SubmitDate"]).getDate());
              arr.push(stackedColumnData[j]);
            }
          }
        })
        console.log("reportlist", arr, monthVal)

        //assigning counts and removing duplications.
        this.getRelatedData(arr, stackedColumnData, monthVal, monthNames);
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

  getRelatedData(arr, stackedColumnData, monthVal, monthNames) {
    var result = [].concat.apply([], arr);

    //If within date range there is no records to show
    if (result.length == 0) {
      this.filteredPlantstackedColumnData = [];
      this.filteredDRstackedColumnData = [];
      this.personArray = this.getStackedDataRedefined();
      this.spinner.hide();
      return this.personArray;
    }

    //To remove duplications
    let x = (result) => result.filter((v, i) => result.indexOf(v) === i)
    let removeDuplicated = x(result);

    removeDuplicated.forEach(function (resdata) {
      monthVal.forEach(function (val) {
        var mval = parseInt(val.split(":")[0]);
        var seriesval = val.split(":")[1];
        let month = monthNames[mval];
        if (resdata["division"] == seriesval) {
          resdata[month] += 1;
        }
      })
    })

    this.filteredPlantstackedColumnData = [];
    this.filteredDRstackedColumnData = removeDuplicated;
    this.spinner.hide();
    return this.personArray = removeDuplicated;
  }

  filterrangeOnbasisplantval(daterange, selectedPlants) {
    var self = this;
    let filteredDRstackedColumnData = this.filteredDRstackedColumnData;
    let filteredPlantstackedColumnData = this.filteredPlantstackedColumnData;
    let arr = [];
    let plantarr = new Array();

    if (filteredDRstackedColumnData != undefined || (filteredDRstackedColumnData && filteredDRstackedColumnData.length > 0) && filteredPlantstackedColumnData == null) {
      this.personArray = this.getStackedDataRedefined();

      selectedPlants.forEach(function (r) {
        arr.push(filteredDRstackedColumnData.filter(option => option["division"].includes(r)));
      })

      var result = [].concat.apply([], arr);

      if (result.length == 0 && selectedPlants.length > 0) {
        this.personArray = this.getStackedDataRedefined();
        let personArray = this.personArray;
        selectedPlants.forEach(function (r) {
          personArray.forEach(function (res) {
            if (r == res["division"]) {
              plantarr.push(res);
            }
          })
        })
        return this.personArray = plantarr;
      } else if (result.length > 0 && selectedPlants.length > 0) {
        self.resultwith_Selectedplant_Filter(selectedPlants, result)
      }
    }
  }

  resultwith_Selectedplant_Filter(selectedPlants, result) {
    this.personArray = this.getStackedDataRedefined();
    let personArray = this.personArray;
    let combnarr = new Array();

    selectedPlants.forEach(function (r) {
      personArray.forEach(function (res) {
        if (r == res["division"]) {
          combnarr.push(res);
        }
      })
    })

    if (combnarr.length > 0) {
      for (var i = 0; i < combnarr.length; i++) {
        for (var j = 0; j < result.length; j++) {
          if (result[j].division == combnarr[i].division) {
            combnarr[i] = result[j];
          }
        }
      }
    }
    return this.personArray = combnarr;
  }
}
