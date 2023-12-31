import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GeneralService } from 'src/app/services/general.service';
import { UploadProfileService } from 'src/app/services/upload-profile.service';
import { resumeJson } from '../../ReportDashboard/models/resume';
import { Experiance, NoticePeriod } from '../../shared/model1';

@Component({
  selector: 'app-upload-resume',
  templateUrl: './upload-resume.component.html',
  styleUrls: ['./upload-resume.component.scss']
})
export class UploadResumeComponent implements OnInit {

  uploadForm: FormGroup;
  submitted = false;
  resumeData = resumeJson;
  experiance = Experiance;
  noticePeriod = NoticePeriod;
  todayNumber: number = Date.now();
  todayDate: Date = new Date();
  todayString: string = new Date().toDateString();
  todayISOString: string = new Date().toISOString();
  location: Observable<any>;
  boolians = ["Yes", "No"]

  isLoading = false;

  constructor(private fb: FormBuilder, private router: Router, private uploadProfileService: UploadProfileService,
    private _location: Location, private route: ActivatedRoute, private generalService: GeneralService) { }

  ngOnInit(): void {
    this.uploadForm = this.fb.group({
      profile: ['']
    });
    this.reloadLocation();
  }
  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.get('profile').setValue(file);
    }
    this.onExtrctingData()
  }

  onExtrctingData() {
    this.isLoading = true;
    const formData = new FormData();
    formData.append('file', this.uploadForm.get('profile').value);
    this.uploadProfileService.getResumeDetail(formData).subscribe(data => {
      let check = JSON.stringify(data);
      let status = JSON.parse(check).status;
      if (status == "302") {
        alert(JSON.parse(check).msg);
        this._location.back();
        this.isLoading = false;
      }
      console.log(data);
      this.resumeData.candidateName = data.candidateName;
      this.resumeData.emailId = data.emailId;
      this.resumeData.mobileNumber = data.mobileNumber;
      const arr = data.skills;
      this.isLoading = false;
      const str = arr.join(',');
      this.resumeData.skills = str;
      console.log(data.emailId);
      console.log(data.mobileNumber);
      console.log(this.resumeData);
    },
      error => console.log(error));
  }

  reloadLocation() {
    this.generalService.getLocations().subscribe(data => {
      this.location = data;
      console.log(this.location);
    },
      err => console.log(err));
  }

  onSubmit(resumeDataForm: NgForm) {
    console.log(this.resumeData);
    this.save(resumeDataForm);
  }

  save(resumeDataForm) {
    this.isLoading = true;
    this.resumeData.openingId = this.route.snapshot.params['_id'];
    this.resumeData.recruiterId = this.route.snapshot.params['recruiterId'];
    // this.resumeData.slot = this.route.snapshot.params['slot'];
    this.resumeData.workAllocationId = this.route.snapshot.params['workAllocation'];

    const formdata = new FormData;
    formdata.append('docFile', this.uploadForm.get('profile').value);
    formdata.append("jsonData", JSON.stringify(this.resumeData));
    this.uploadProfileService
      .uploadProfile(formdata).subscribe(data => {
        this.submitted = true;
        console.log(data);
        resumeDataForm.resetForm();
        this.isLoading = false;
        this.gotoHome();
      },
        error => alert("Something went wrong. Please check all mandtory fields."));
  }
  gotoHome() {
    var employeeName = JSON.parse(localStorage.getItem("approvedCredential")).employee;
    this.router.navigate(['/default/dailyworkreport', employeeName, 'detail', this.resumeData.recruiterId])
  }

  cancel() {
    this._location.back();
  }

  offer(value) {
    console.log(value);
    if (value == "Yes") {
      var offeredCompanyNameId = document.getElementById("offeredCompanyName");
      offeredCompanyNameId.style.display = "block";
      var octcId = document.getElementById("octc");
      octcId.style.display = "block";
      var ejdId = document.getElementById("ejd");
      ejdId.style.display = "block";
    }

    else {
      this.resumeData.offeredCompanyName = '';
      var offeredCompanyNameId = document.getElementById("offeredCompanyName");
      offeredCompanyNameId.style.display = "none";
      this.resumeData.octc = '';
      var octcId = document.getElementById("octc");
      octcId.style.display = "none";
      this.resumeData.ejd = '';
      var ejdId = document.getElementById("ejd");
      ejdId.style.display = "none";
    }
  }

  npCheck(value) {
    console.log(value);
    if (value == "Immediate") {
      this.resumeData.snp = '';
      var snpId = document.getElementById("snp");
      snpId.style.display = "none";
      this.resumeData.lwd = '';
      var lwdId = document.getElementById("lwd");
      lwdId.style.display = "none";
    }
    else {
      var snpId = document.getElementById("snp");
      snpId.style.display = "block";
    }
  }

  snpCheck(value) {
    console.log(value);
    if (value == "yes") {
      var lwdId = document.getElementById("lwd");
      lwdId.style.display = "block";
    }
    else {
      this.resumeData.lwd = '';
      var lwdpId = document.getElementById("lwd");
      lwdpId.style.display = "none";
    }
  }

}
