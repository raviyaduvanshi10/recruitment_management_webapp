import { DatePipe, Location } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { EmployeeService } from 'src/app/services/employee.service';
import { UploadProfileService } from 'src/app/services/upload-profile.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-daily-work-report',
  templateUrl: './daily-work-report.component.html',
  styleUrls: ['./daily-work-report.component.scss'],
  providers: [DatePipe]
})
export class DailyWorkReportComponent implements OnInit {
  searchText;
  searchText1;
  employeeName;
  employeeId;
  // dataSource: Observable<DailyWorkReport[]>;
  dataSource = [];
  dataSource1: Observable<any>;
  isLoading = false;
  numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  performanceTableId;
  detailTableId;
  detailButtonId;
  performanceButtonId;

  tCount = 0;
  sfpCount = 0;
  swcCount = 0;
  ssCount = 0;
  dCount = 0;
  pCount = 0;
  l1ytsCount = 0;
  l1isCount = 0;
  l1ifpCount = 0;
  l1rCount = 0;
  l1sCount = 0;
  l2isCount = 0;
  l2ifpCount = 0;
  l2rCount = 0;
  l2sCount = 0;
  l3isCount = 0;
  l3ifpCount = 0;
  l3rCount = 0;
  l3sCount = 0;
  fsCount = 0;
  opCount = 0;
  ytjCount = 0;
  doCount = 0;
  jCount = 0;
  srCount = 0;


  candidate_cv
  filterType = "SFP";

  @ViewChild('TABLE') table: ElementRef;
  constructor(private datePipe: DatePipe, private _location: Location, private route: ActivatedRoute, private router: Router,
    private uploadProfileService: UploadProfileService, private employeeService: EmployeeService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.employeeName = this.route.snapshot.params['_id'];
    this.employeeId = JSON.parse(localStorage.getItem("approvedCredential"))._employeeId;
    this.searchText = this.datePipe.transform(new Date(), 'MMMM, yyyy');
    this.reloadData();
    this.filterData(this.filterType);
    this._filterRejectedData("SR");
    this._filterDroppedData("DO");
    this._filterJoinedData("J");
  }

  dateFormat() {
    // this.searchText = this.datePipe.transform(this.searchText1, 'longDate');
    this.searchText = this.datePipe.transform(this.searchText1, 'MMMM, yyyy');
    if (this.searchText == null) {
      alert("Please select valid date. Thankyou !.");
      return;
    }
    this.reloadData();
    this._filterRejectedData("SR");
  }

  async reloadData() {
    if (this.searchText == null) {
      alert("Please select valid date. Thankyou !");
      return;
    }
    this.uploadProfileService.getCandidateList(JSON.parse(localStorage.getItem("approvedCredential"))._employeeId + this.searchText).subscribe(data => {
      this.tCount = 0;
      this.sfpCount = 0;
      this.swcCount = 0;
      this.l1ytsCount = 0;
      this.tCount = 0;
      this.pCount = 0;
      for (var val of data) {
        console.log(val);
        console.log(this.employeeId + "==" + val.recruiterId);
        if (val.sfp) {
          this.sfpCount = this.sfpCount + 1;
          console.log("sfp: " + this.sfpCount);
        }
        if (val.yts) {
          this.l1ytsCount = this.l1ytsCount + 1;
          console.log("yts: " + this.l1ytsCount);
        }
        if (val.t) {
          this.tCount = this.tCount + 1;
          console.log("t: " + this.tCount);
        }
        if (val.swc) {
          this.swcCount = this.swcCount + 1;
          console.log("swc: " + this.swcCount);
        }
        if (val.ss) {
          this.ssCount = this.ssCount + 1;
          console.log("ss: " + this.ssCount);
        }
        if (val.p) {
          this.pCount = this.pCount + 1;
          console.log("p: " + this.pCount);
        }
        if (val.is1) {
          this.l1isCount = this.l1isCount + 1;
        }
        if (val.ifp) {
          this.l1ifpCount = this.l1ifpCount + 1;
        }
        if (val.l1_r) {
          this.l1rCount = this.l1rCount + 1;
        }
        if (val.l1_s) {
          this.l1sCount = this.l1sCount + 1;
        }
        if (val.l2is) {
          this.l2isCount = this.l2isCount + 1;
        }
        if (val.d) {
          this.dCount = this.dCount + 1;
        }
        if (val.l2ifp) {
          this.l2ifpCount = this.l2ifpCount + 1;
        }
        if (val.l2r) {
          this.l2rCount = this.l2rCount + 1;
        }
        if (val.l2s) {
          this.l2sCount = this.l2sCount + 1;
        }
        if (val.l3is) {
          this.l3isCount = this.l3isCount + 1;
        }
        if (val.l3ifp) {
          this.l3ifpCount = this.l3ifpCount + 1;
        }
        if (val.l3r) {
          this.l3rCount = this.l3rCount + 1;
        }
        if (val.l3s) {
          this.l3sCount = this.l3sCount + 1;
        }
        if (val.fs) {
          this.fsCount = this.fsCount + 1;
        }
        if (val.op) {
          this.opCount = this.opCount + 1;
        }
        if (val.ytj) {
          this.ytjCount = this.ytjCount + 1;
        }
      }
      this.isLoading = false;
    });
  }

  updateCategory(id: string) {
    this.router.navigate(['/default/updatecategory', id]);
  }
  userDetails(_id: string) {
    this.router.navigate(['detailsemployee', _id]);
  }
  back() {
    this._location.back();
  }

  opening(openingId) {
    alert(openingId)
  }
  candiadte(id) {
    alert(id)
  }

  ExportTOExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    /* save to file */
    XLSX.writeFile(wb, 'Report.xlsx');
  }

  async filterData(value) {
    console.log("Filter Value :" + value);
    this.isLoading = true;
    await new Promise(resolve => setTimeout(resolve, 1000));
    this.filterType = value;
    let _value = { "value": value }
    this.uploadProfileService.getCandidateProfileByfilter(JSON.parse(localStorage.getItem("approvedCredential"))._employeeId + this.searchText, _value).subscribe(data => {
      this.dataSource = data;
      console.log(data);
      this.isLoading = false;
    },
      err => console.log(err));
  }

  async _filterRejectedData(value) {
    console.log("Filter Value :" + value);
    this.isLoading = true;
    await new Promise(resolve => setTimeout(resolve, 1000));
    this.filterType = value;
    this.uploadProfileService.getRejectedProfileByfilter(this.searchText, value).subscribe(data => {

      for (var val of data) {
        this.srCount = this.srCount + 1;
        console.log(data);
        this.isLoading = false;
      }
    },
      err => console.log(err));
  }

  async _filterJoinedData(value) {
    console.log("Filter Value :" + value);
    this.isLoading = true;
    await new Promise(resolve => setTimeout(resolve, 1000));
    this.filterType = value;
    this.uploadProfileService.getJoinedProfileByfilter(this.employeeId + this.searchText, value).subscribe(data => {

      for (var val of data) {
        this.jCount = this.jCount + 1;
        console.log(data);
        this.isLoading = false;
      }
    },
      err => console.log(err));
  }


  async _filterDroppedData(value) {
    console.log("Filter Value :" + value);
    this.isLoading = true;
    await new Promise(resolve => setTimeout(resolve, 1000));
    this.filterType = value;
    this.uploadProfileService.getDropedProfileByfilter(this.employeeId + this.searchText, value).subscribe(data => {

      for (var val of data) {
        this.doCount = this.doCount + 1;
        console.log(data);
        this.isLoading = false;
      }
    },
      err => console.log(err));
  }


  async __filterRejectedData(value) {
    console.log("Filter Value :" + value);
    this.isLoading = true;
    await new Promise(resolve => setTimeout(resolve, 1000));
    this.filterType = value;
    this.uploadProfileService.getRejectedProfileByfilter(this.searchText, value).subscribe(data => {

      this.dataSource = data;
      console.log(data);
      this.isLoading = false;
    },
      err => console.log(err));
  }

  async __filterJoinedData(value) {
    console.log("Filter Value :" + value);
    this.isLoading = true;
    await new Promise(resolve => setTimeout(resolve, 1000));
    this.filterType = value;
    this.uploadProfileService.getJoinedProfileByfilter(this.employeeId + this.searchText, value).subscribe(data => {

      this.dataSource = data;
      console.log(data);
      this.isLoading = false;
    },
      err => console.log(err));
  }


  async __filterDroppedData(value) {
    console.log("Filter Value :" + value);
    this.isLoading = true;
    await new Promise(resolve => setTimeout(resolve, 1000));
    this.filterType = value;
    this.uploadProfileService.getDropedProfileByfilter(this.employeeId + this.searchText, value).subscribe(data => {

      this.dataSource = data;
      console.log(data);
      this.isLoading = false;
    },
      err => console.log(err));
  }

  resumeView(emailId) {
    this.employeeService.getDocs(emailId).subscribe(data => {
      let ObjectUrl = URL.createObjectURL(data);
      this.candidate_cv = this.sanitizer.bypassSecurityTrustResourceUrl(ObjectUrl);
      this.isLoading = false;
    },
      err => console.log(err));

    var docID = document.getElementById("candidatedetails");
    docID.style.display = "none";
    var docID = document.getElementById("pdffile");
    docID.style.display = "block";
  }

  returnCandidate() {
    var docID = document.getElementById("pdffile");
    docID.style.display = "none";
    var docID = document.getElementById("candidatedetails");
    docID.style.display = "block";
  }

  date = new FormControl();

  monthSelected(event, dp, input) {
    dp.close();
    input.value = event.toISOString().split('-').join('/').substr(0, 7);
  }

}
