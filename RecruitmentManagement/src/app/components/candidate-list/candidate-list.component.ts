import { DatePipe, Location } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';
import { UploadProfileService } from 'src/app/services/upload-profile.service';
import { EmailComponent } from '../ReportDashboard/email/email.component';

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.scss'],
  providers: [DatePipe]
})
export class CandidateListComponent implements OnInit {
  @ViewChild('button') button: ElementRef;

  activeSkill() {
    (<any>this.button).color = 'accent';
  }

  candidates = [];
  searchText;
  searchText1;
  approved: boolean = false;
  openingId;
  isLoading = false;
  candidate_cv;
  submitted = false;

  sfp = false;
  swc = false;
  yts = false;
  is = false;
  ifp = false;
  l1yts = false;
  t = false;
  sr = false;
  p = false;
  l1r = false;
  l1s = false;
  l2is = false;
  l2ifp = false;
  l2r = false;
  l2s = false;
  l3is = false;
  l3ifp = false;
  l3r = false;
  l3s = false;
  fr = false;
  fs = false;
  op = false;
  ytj = false;
  do = false;
  j = false;

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

  color1 = "black";


  filterType = "SFP";

  constructor(private uploadProfileService: UploadProfileService, private _location: Location, private dialog: MatDialog,
    private datePipe: DatePipe, private route: ActivatedRoute, private employeeService: EmployeeService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.openingId = this.route.snapshot.params["_id"];
    this.searchText = this.datePipe.transform(new Date(), 'MMMM, yyyy');
    this.reloadData();
    this.filterData(this.filterType);
    this._filterRejectedData("SR");
    this._filterJoinedData("J");
    this._filterDroppedData("DO");
  }
  dateFormat() {
    // this.searchText = this.datePipe.transform(this.searchText1, 'longDate');
    this.searchText = this.datePipe.transform(this.searchText1, 'MMMM, yyyy');
    if (this.searchText == null) {
      alert("Please select valid date. Thankyou !");
      return;
    }
    this.reloadData();
    this._filterRejectedData("SR");
  }

  async reloadData() {
    this.isLoading = true;

    await new Promise(resolve => setTimeout(resolve, 1000));
    if (this.searchText == null) {
      alert("Please select valid date. Thankyou !");
      return;
    }
    this.uploadProfileService.getCandidateList(this.searchText).subscribe(data => {
      for (var val of data) {
        if (this.openingId == val.openingId) {
          this.openingId + "==" + val.openingId
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
      }
    });
  }

  deleteUser(_id: string) {
    this.uploadProfileService.deleteCandidate(_id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }
  async sharedProfile(candidateID, candidateEmailId, openingId, recruiterId) {
    this.dialog.open(EmailComponent, {
      width: '580px', height: '650px', data: {
        candidateEmailId: candidateEmailId,
        candidateID: candidateID,
        mailType: "sharedProfile"
      }
    });

    // let check = JSON.parse(sessionStorage.getItem("email"));
    // if (check.status == "200") {
    //   const formdata1 = new FormData;
    //   formdata1.append("sharedProfileId", candidateID)
    //   console.log("form data: " + formdata1);
    //   this.uploadProfileService.sharedProfile(formdata1).subscribe(data => {
    //     console.log(data);
    //     this.isLoading = false;
    //     this.submitted = true;
    //   },
    //     err => alert("Something went wrong. Please try again !"));
    // }
    // else {
    //   alert("Something went wrong. Please try again. Thanks !");
    // }
    // await new Promise(resolve => setTimeout(resolve, 1000));

  }

  duplicateProfile(id) {
    alert("This functionality is still pending.")
    console.log("RejectedId : " + id);
  }

  rejectProfile(rejectedProfileId) {
    // alert("This functionality is still pending.")
    console.log("RejectedId : " + rejectedProfileId);
    let jsonData = { "ir": true, "er": false }
    const formdata = new FormData;
    formdata.append("rejectedProfileId", rejectedProfileId)
    formdata.append("jsonData", JSON.stringify(jsonData));
    this.uploadProfileService.rejectedProfile(formdata).subscribe(data => {
      console.log(data);
      this.submitted = true;
    },
      err => console.log(err));
  }

  joinProfile(joinedProfileId) {
    // alert("This functionality is still pending.")
    console.log("JoinedId : " + joinedProfileId);
    let jsonData = { "j": true, "do": false }
    const formdata = new FormData;
    formdata.append("joinedProfileId", joinedProfileId)
    formdata.append("jsonData", JSON.stringify(jsonData));
    this.uploadProfileService.joinedProfile(formdata).subscribe(data => {
      console.log(data);
      this.submitted = true;
    },
      err => console.log(err));
  }

  dropoutProfile(joinedProfileId) {
    // alert("This functionality is still pending.")
    console.log("JoinedId : " + joinedProfileId);
    let jsonData = { "do": true, "j": false }
    const formdata = new FormData;
    formdata.append("joinedProfileId", joinedProfileId)
    formdata.append("jsonData", JSON.stringify(jsonData));
    this.uploadProfileService.joinedProfile(formdata).subscribe(data => {
      console.log(data);
      this.submitted = true;
    },
      err => console.log(err));
  }

  viewResume(name, file) {
    console.log("ViewId : " + name);
    // const linkSource = `data:application/pdf;base64,${file}`;
    // const downloadLink = document.createElement("a");
    // const fileName = `${name}.docx`;
    // downloadLink.href = linkSource;
    // downloadLink.download = fileName;
    // downloadLink.click();

    var tableId = document.getElementById("table");
    tableId.style.display = "none";
    var docxId = document.getElementById("docx");
    docxId.style.display = "block";
  }
  return() {
    var docxId = document.getElementById("docx");
    docxId.style.display = "none";
    var tableId = document.getElementById("table");
    tableId.style.display = "block";
  }

  back() {
    console.log("Nice");
    this._location.back();
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

  close() {
    this.submitted = false;
    window.location.reload();
  }


  async filterData(value) {
    console.log("Filter Value :" + value);
    if (value == "SFP") {
      this.sfp = true;
      this.swc = false;
      this.p = false;
      this.yts = false;
      this.is = false;
      this.ifp = false;
      this.l1r = false;
      this.l2is = false;
      this.l2ifp = false;
      this.l2s = false;
      this.l3is = false;
      this.l3ifp = false;
      this.l3r = false;
      this.l3s = false;
      this.fs = false;
      this.op = false;
      this.ytj = false;
      this.j = false;
    }
    if (value == "SWC") {
      this.swc = true;
      this.sfp = false;
      this.p = false;
      this.yts = false;
      this.is = false;
      this.ifp = false;
      this.l1r = false;
      this.l2is = false;
      this.l2ifp = false;
      this.l2s = false;
      this.l3is = false;
      this.l3ifp = false;
      this.l3r = false;
      this.l3s = false;
      this.fs = false;
      this.op = false;
      this.ytj = false;
      this.j = false;
    }
    if (value == "SS") {
      this.swc = false;
      this.sfp = false;
      this.p = false;
      this.yts = false;
      this.is = false;
      this.ifp = false;
      this.l1r = false;
      this.l2is = false;
      this.l2ifp = false;
      this.l2s = false;
      this.l3is = false;
      this.l3ifp = false;
      this.l3r = false;
      this.l3s = false;
      this.fs = false;
      this.op = false;
      this.ytj = false;
      this.j = false;
    }
    if (value == "P") {
      this.swc = false;
      this.sfp = false;
      this.is = false;
      this.p = true;
      this.yts = false;
      this.ifp = false;
      this.l1r = false;
      this.l2is = false;
      this.l2ifp = false;
      this.l2s = false;
      this.l3is = false;
      this.l3ifp = false;
      this.l3r = false;
      this.l3s = false;
      this.fs = false;
      this.op = false;
      this.ytj = false;
      this.j = true;
    }

    if (value == "YTS") {
      this.swc = false;
      this.sfp = false;
      this.p = false;
      this.is = false;
      this.yts = true;
      this.ifp = false;
      this.l1r = false;
      this.l2is = false;
      this.l2ifp = false;
      this.l2s = false;
      this.l3is = false;
      this.l3ifp = false;
      this.l3r = false;
      this.l3s = false;
      this.fs = false;
      this.op = false;
      this.ytj = false;
      this.j = false;
    }

    if (value == "IS") {
      this.swc = false;
      this.sfp = false;
      this.p = false;
      this.yts = false;
      this.is = true;
      this.ifp = false;
      this.l1r = false;
      this.l2is = false;
      this.l2ifp = false;
      this.l2s = false;
      this.l3is = false;
      this.l3ifp = false;
      this.l3r = false;
      this.l3s = false;
      this.fs = false;
      this.op = false;
      this.ytj = false;
      this.j = false;
    }
    if (value == "IFP") {
      this.swc = false;
      this.sfp = false;
      this.p = false;
      this.yts = false;
      this.is = false;
      this.ifp = true;
      this.l1r = false;
      this.l2is = false;
      this.l2ifp = false;
      this.l2s = false;
      this.l3is = false;
      this.l3ifp = false;
      this.l3r = false;
      this.l3s = false;
      this.fs = false;
      this.op = false;
      this.ytj = false;
      this.j = false;
    }
    if (value == "L1-R") {
      this.swc = false;
      this.sfp = false;
      this.p = false;
      this.yts = false;
      this.is = false;
      this.ifp = false;
      this.l2r = false;
      this.l1r = true;
      this.l2is = false;
      this.l2ifp = false;
      this.l2s = false;
      this.l3is = false;
      this.l3ifp = false;
      this.l3r = false;
      this.l3s = false;
      this.fs = false;
      this.op = false;
      this.ytj = false;
      this.j = false;
    }
    if (value == "L1-S") {
      this.swc = false;
      this.sfp = false;
      this.p = false;
      this.yts = false;
      this.is = false;
      this.ifp = false;
      this.l1r = false;
      this.l1s = true;
      this.l2is = false;
      this.l2ifp = false;
      this.l2s = false;
      this.l3is = false;
      this.l3ifp = false;
      this.l3r = false;
      this.l3s = false;
      this.fs = false;
      this.op = false;
      this.ytj = false;
      this.j = false;
    }
    if (value == "L2-IS") {
      this.swc = false;
      this.sfp = false;
      this.p = false;
      this.yts = false;
      this.is = false;
      this.ifp = false;
      this.l1r = false;
      this.l1s = false;
      this.l2is = true;
      this.l2ifp = false;
      this.l2s = false;
      this.l3is = false;
      this.l3ifp = false;
      this.l3r = false;
      this.l3s = false;
      this.fs = false;
      this.op = false;
      this.ytj = false;
      this.j = false;
    }
    if (value == "L2-IFP") {
      this.swc = false;
      this.sfp = false;
      this.p = false;
      this.yts = false;
      this.is = false;
      this.ifp = false;
      this.l1r = false;
      this.l1s = false;
      this.l2is = false;
      this.l2ifp = true;
      this.l2s = false;
      this.l3is = false;
      this.l3ifp = false;
      this.l3r = false;
      this.l3s = false;
      this.fs = false;
      this.op = false;
      this.ytj = false;
      this.j = false;
    }
    if (value == "T") {
      this.color1 = "blue";
      this.swc = false;
      this.sfp = false;
      this.p = false;
      this.yts = false;
      this.is = false;
      this.ifp = false;
      this.l1r = false;
      this.l1s = false;
      this.l2is = false;
      this.l2ifp = false;
      this.l2s = false;
      this.l3is = false;
      this.l3ifp = false;
      this.l3r = false;
      this.l3s = false;
      this.fs = false;
      this.op = false;
      this.ytj = false;
      this.j = true;
    }
    if (value == "D") {
      this.swc = false;
      this.sfp = false;
      this.p = false;
      this.yts = false;
      this.is = false;
      this.ifp = false;
      this.l1r = false;
      this.l1s = false;
      this.l2is = false;
      this.l2ifp = false;
      this.l2s = false;
      this.l3is = false;
      this.l3ifp = false;
      this.l3r = false;
      this.l3s = false;
      this.fs = false;
      this.op = false;
      this.ytj = false;
      this.j = true;
    }
    if (value == "L2-R") {
      this.swc = false;
      this.sfp = false;
      this.p = false;
      this.yts = false;
      this.is = false;
      this.ifp = false;
      this.l1r = false;
      this.l1s = false;
      this.l2is = false;
      this.l2ifp = false;
      this.l2r = false;
      this.l2s = false;
      this.l3is = false;
      this.l3ifp = false;
      this.l3r = false;
      this.l3s = false;
      this.fs = false;
      this.op = false;
      this.ytj = false;
      this.j = false;
      this.l2r = true;
    }
    if (value == "L2-S") {
      this.swc = false;
      this.sfp = false;
      this.p = false;
      this.yts = false;
      this.is = false;
      this.ifp = false;
      this.l1r = false;
      this.l1s = false;
      this.l2is = false;
      this.l2ifp = false;
      this.l2r = false;
      this.l2s = true;
      this.l3is = false;
      this.l3ifp = false;
      this.l3r = false;
      this.l3s = false;
      this.fs = false;
      this.op = false;
      this.ytj = false;
      this.j = false;
    }
    if (value == "L3-IS") {
      this.swc = false;
      this.sfp = false;
      this.p = false;
      this.yts = false;
      this.is = false;
      this.ifp = false;
      this.l1r = false;
      this.l1s = false;
      this.l2is = false;
      this.l2ifp = false;
      this.l2s = false;
      this.l3is = true;
      this.l3ifp = false;
      this.l3r = false;
      this.l3s = false;
      this.fs = false;
      this.op = false;
      this.ytj = false;
      this.j = false;
    }
    if (value == "L3-IFP") {
      this.swc = false;
      this.sfp = false;
      this.p = false;
      this.yts = false;
      this.is = false;
      this.ifp = false;
      this.l1r = false;
      this.l1s = false;
      this.l2is = false;
      this.l2ifp = false;
      this.l2s = false;
      this.l3is = false;
      this.l3ifp = true;
      this.l3r = false;
      this.l3s = false;
      this.fs = false;
      this.op = false;
      this.ytj = false;
      this.j = false;
    }

    if (value == "L3-R") {
      this.swc = false;
      this.sfp = false;
      this.p = false;
      this.yts = false;
      this.is = false;
      this.ifp = false;
      this.l1r = false;
      this.l1s = false;
      this.l2is = false;
      this.l2ifp = false;
      this.l2s = false;
      this.l3is = false;
      this.l3ifp = false;
      this.l3r = true;
      this.l3s = false;
      this.fs = false;
      this.op = false;
      this.ytj = false;
      this.j = false;
      this.l3r = true;
    }

    if (value == "L3-S") {
      this.swc = false;
      this.sfp = false;
      this.p = false;
      this.yts = false;
      this.is = false;
      this.ifp = false;
      this.l1r = false;
      this.l1s = false;
      this.l2is = false;
      this.l2ifp = false;
      this.l2s = false;
      this.l3is = false;
      this.l3ifp = false;
      this.l3r = false;
      this.l3s = true;
      this.fs = false;
      this.op = false;
      this.ytj = false;
      this.j = false;
    }
    if (value == "FS") {
      this.swc = false;
      this.sfp = false;
      this.p = false;
      this.yts = false;
      this.is = false;
      this.ifp = false;
      this.l1r = false;
      this.l1s = false;
      this.l2is = false;
      this.l2ifp = false;
      this.l2s = false;
      this.l3is = false;
      this.l3ifp = false;
      this.l3r = false;
      this.l3s = false;
      this.fs = true;
      this.op = false;
      this.ytj = false;
      this.j = false;
    }

    if (value == "OP") {
      this.swc = false;
      this.sfp = false;
      this.p = false;
      this.yts = false;
      this.is = false;
      this.ifp = false;
      this.l1r = false;
      this.l1s = false;
      this.l2is = false;
      this.l2ifp = false;
      this.l2s = false;
      this.l3is = false;
      this.l3ifp = false;
      this.l3r = false;
      this.l3s = false;
      this.fs = false;
      this.op = true;
      this.ytj = false;
      this.j = false;
    }

    if (value == "YTJ") {
      this.swc = false;
      this.sfp = false;
      this.p = false;
      this.yts = false;
      this.is = false;
      this.ifp = false;
      this.l1r = false;
      this.l1s = false;
      this.l2is = false;
      this.l2ifp = false;
      this.l2s = false;
      this.l3is = false;
      this.l3ifp = false;
      this.l3r = false;
      this.l3s = false;
      this.fs = false;
      this.op = false;
      this.ytj = true;
      this.j = false;
    }


    this.isLoading = true;
    await new Promise(resolve => setTimeout(resolve, 1000));
    this.filterType = value;
    let _value = { "value": value, "openingId": this.openingId }
    this.uploadProfileService.getCandidateProfileByfilter(this.searchText, _value).subscribe(data => {
      this.candidates = data;
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
    this.uploadProfileService.getJoinedProfileByfilter(this.searchText, value).subscribe(data => {

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
    this.uploadProfileService.getDropedProfileByfilter(this.searchText, value).subscribe(data => {

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
    if (value == "SR") {
      this.swc = false;
      this.sfp = false;
      this.p = false;
      this.yts = false;
      this.is = false;
      this.ifp = false;
      this.l1r = false;
      this.l1s = false;
      this.l2is = false;
      this.l2ifp = false;
      this.l2s = false;
      this.l3is = false;
      this.l3ifp = false;
      this.l3r = false;
      this.l3s = false;
      this.fs = false;
      this.op = false;
      this.ytj = false;
      this.j = true;

    }
    this.isLoading = true;
    await new Promise(resolve => setTimeout(resolve, 1000));
    this.filterType = value;
    this.uploadProfileService.getRejectedProfileByfilter(this.searchText, value).subscribe(data => {

      this.candidates = data;
      console.log(data);
      this.isLoading = false;
    },
      err => console.log(err));
  }

  async __filterJoinedData(value) {
    console.log("Filter Value :" + value);
    if (value == "J") {
      this.swc = false;
      this.sfp = false;
      this.p = false;
      this.yts = false;
      this.is = false;
      this.ifp = false;
      this.l1r = false;
      this.l1s = false;
      this.l2is = false;
      this.l2ifp = false;
      this.l2s = false;
      this.l3is = false;
      this.l3ifp = false;
      this.l3r = false;
      this.l3s = false;
      this.fs = false;
      this.ytj = false;
      this.j = true;
    }
    this.isLoading = true;
    await new Promise(resolve => setTimeout(resolve, 1000));
    this.filterType = value;
    this.uploadProfileService.getJoinedProfileByfilter(this.searchText, value).subscribe(data => {

      this.candidates = data;
      console.log(data);
      this.isLoading = false;
    },
      err => console.log(err));
  }


  async __filterDroppedData(value) {
    console.log("Filter Value :" + value);
    if (value == "DO") {
      this.swc = false;
      this.sfp = false;
      this.p = false;
      this.yts = false;
      this.is = false;
      this.ifp = false;
      this.l1r = false;
      this.l1s = false;
      this.l2is = false;
      this.l2ifp = false;
      this.l2s = false;
      this.l3is = false;
      this.l3ifp = false;
      this.l3r = false;
      this.l3s = false;
      this.fs = false;
      this.ytj = false;
      this.j = true;
    }
    this.isLoading = true;
    await new Promise(resolve => setTimeout(resolve, 1000));
    this.filterType = value;
    this.uploadProfileService.getDropedProfileByfilter(this.searchText, value).subscribe(data => {

      this.candidates = data;
      console.log(data);
      this.isLoading = false;
    },
      err => console.log(err));
  }

  // myFunction() {
  //   var x = document.getElementById("myDIV");
  //   if (x.style.display === "none") {
  //     x.style.display = "block";
  //   } else {
  //     x.style.display = "block";
  //   }
  // }

  cancel() {
    var x = document.getElementById("myDIV");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "none";
    }
  }

  actionType(candidateId, firstValue, secondValue, thirdValue, fourthValue) {
    console.log("_id:" + candidateId + " , firstValue:" + firstValue + ", secondValue:" + secondValue);
    let jsonValue = { "firstValue": firstValue, "secondValue": secondValue, "thirdValue": thirdValue, "fourthValue": fourthValue }
    this.uploadProfileService.profileCrud(candidateId, jsonValue).subscribe(data => {
      console.log(data);
      if (JSON.parse(JSON.stringify(data)).status == "200") {
        alert(JSON.parse(JSON.stringify(data)).message);
        window.location.reload();
      }

    },
      err => console.log(err));
  }

  actionType1(candidateId, firstValue, secondValue) {
    console.log("_id:" + candidateId + " , firstValue:" + firstValue + ", secondValue:" + secondValue);
    let jsonValue = { "firstValue": firstValue, "secondValue": secondValue }
    this.uploadProfileService.profileCrud(candidateId, jsonValue).subscribe(data => {
      console.log(data);
      if (JSON.parse(JSON.stringify(data)).status == "200") {
        alert(JSON.parse(JSON.stringify(data)).message);
        window.location.reload();
      }
    },
      err => console.log(err));
  }

  async confirmSlot(candidateEmail, candidateId, firstValue, secondValue) {
    // console.log(JSON.stringify(slotForm.value) + "==>" + candidateEmail);
    // var x = document.getElementById("myDIV");
    // if (x.style.display === "block") {
    //   x.style.display = "none";
    // } else {
    //   x.style.display = "none";
    // }

    await this.dialog.open(EmailComponent, {
      width: '580px', height: '650px', data: {
        candidateEmailId: candidateEmail,
        candidateID: candidateId,
        firstValue: firstValue,
        secondValue: secondValue,
        mailType: "slotConfirmation"
        // slotData: JSON.stringify(slotForm.value)
      }
    });

  }

}
