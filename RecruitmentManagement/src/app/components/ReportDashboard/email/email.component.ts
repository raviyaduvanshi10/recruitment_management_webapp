import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { EmployeeService } from 'src/app/services/employee.service';
import { UploadProfileService } from 'src/app/services/upload-profile.service';
import { FormModel } from '../models/resume';


@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss']
})
export class EmailComponent implements OnInit {

  public formModel = FormModel;
  uploadForm: FormGroup;
  public separatorKeysCodes = [ENTER, COMMA];
  public emailList = [];
  public emailList2 = [];
  removable = true;
  rulesForm: FormGroup;
  ccEmails = [];
  bccEmails = [];
  candidate_cv;
  submitted = false;
  submitted2 = false;
  isLoading = false;
  mailType;

  constructor(private dialogRef: MatDialogRef<EmailComponent>, private emailService: UploadProfileService, private fb: FormBuilder,
    private uploadProfileService: UploadProfileService, private employeeService: EmployeeService, private sanitizer: DomSanitizer,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.formModel.senderEmail = JSON.parse(localStorage.getItem("approvedCredential")).officeEmailId;
    this.formModel.candidateMail = this.data.candidateEmailId;
    this.formModel.compose = this.data.slotData;
    this.mailType = this.data.mailType;
    this.resumeView(this.formModel.candidateMail);
    this.uploadForm = this.fb.group({
      resumeFile: ['']
    });

    this.rulesForm = this.fb.group({
      emails: this.fb.array([], [this.validateArrayNotEmpty]),
    });
  }



  onDocSelect(event) {
    if (event.target.files.length > 0) {
      const doc = event.target.files[0];
      this.uploadForm.get('resumeFile').setValue(doc);
    }
    // this.onExtrctingDoc()
  }

  add(event): void {
    console.log(event.value)
    if (event.value) {
      if (this.validateEmail(event.value)) {
        this.emailList.push({ value: event.value, invalid: false });
        this.ccEmails.push(event.value);
      }
      else {
        this.emailList.push({ value: event.value, invalid: true });
        this.rulesForm.controls['emails'].setErrors({ 'incorrectEmail': true });
      }
    }
    if (event.input) {
      event.input.value = '';
    }
  }
  add1(event): void {
    console.log(event.value)
    if (event.value) {
      if (this.validateEmail(event.value)) {
        this.emailList2.push({ value: event.value, invalid: false });
        this.bccEmails.push(event.value);
      }
      else {
        this.emailList2.push({ value: event.value, invalid: true });
        this.rulesForm.controls['emails'].setErrors({ 'incorrectEmail': true });
      }
    }
    if (event.input) {
      event.input.value = '';
    }
  }

  removeEmail(data: any): void {
    console.log('Removing ' + data)
    if (this.emailList.indexOf(data) >= 0) {
      this.emailList.splice(this.emailList.indexOf(data), 1);
    }
  }

  removeEmail2(data: any): void {
    console.log('Removing ' + data)
    if (this.emailList2.indexOf(data) >= 0) {
      this.emailList2.splice(this.emailList2.indexOf(data), 1);
    }
  }


  private validateArrayNotEmpty(c: FormControl) {
    if (c.value && c.value.length === 0) {
      return {
        validateArrayNotEmpty: { valid: false }
      };
    }
    return null;
  }

  private validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }



  onSubmit() {
    this.isLoading = true;
    console.log('Email:', this.formModel);
    this.send();
    // this.dialogRef.close();
    //this.openingForm.reset();
  }

  send() {
    const formdata = new FormData;
    formdata.append('resumeFile', this.uploadForm.get('resumeFile').value);
    formdata.append('ccEmails', JSON.stringify(this.ccEmails));
    formdata.append('bccEmails', JSON.stringify(this.bccEmails));
    formdata.append("jsonData", JSON.stringify(this.formModel));
    console.log(formdata)
    console.log(this.formModel);
    console.log(this.ccEmails);
    console.log(this.bccEmails);
    this.emailService
      .sentMail(formdata).subscribe(data => {
        console.log(data);
        console.log("CandidateId : " + this.data.candidateID);
        const formdata1 = new FormData;
        formdata1.append("sharedProfileId", this.data.candidateID)
        console.log("form data: " + formdata1);
        console.log("MailType : " + this.mailType);
        if (this.mailType == "sharedProfile") {
          console.log("Profile sharing.");
          this.uploadProfileService.sharedProfile(formdata1).subscribe(data => {
            console.log(data);
            this.isLoading = false;
            this.submitted = true;
            // this.dialogRef.close();
          },
            err => alert("Something went wrong. Please try again !"));
        }
        if (this.mailType == "slotConfirmation") {
          console.log("SLot maililing");
          let jsonValue = { "firstValue": this.data.firstValue, "secondValue": this.data.secondValue }
          this.uploadProfileService.profileCrud(this.data.candidateID, jsonValue).subscribe(data => {
            console.log(data);
            // if (JSON.parse(JSON.stringify(data)).status == "200") {
            //   alert(JSON.parse(JSON.stringify(data)).message);
            //   window.location.reload();
            // }
            this.isLoading = false;
            this.submitted2 = true;

          },
            err => console.log(err));

        }
      },
        // error => console.log(error));
        err => alert("Something went wrong. Please try again !"));
  }

  handleSuccess(e) {
    // console.log("ReCaptcha", e);
    console.log("ReCaptcha is working.");
  }

  resumeView(emailId) {
    this.employeeService.getUserDocs(emailId).subscribe(data => {
      let ObjectUrl = URL.createObjectURL(data);
      this.candidate_cv = this.sanitizer.bypassSecurityTrustResourceUrl(ObjectUrl);
      this.uploadForm.get('resumeFile').setValue(this.candidate_cv);
    },
      err => console.log(err));
  }

  close() {
    this.dialogRef.close();
    window.location.reload();
  }

  autoGrowTextZone(e) {
    e.target.style.height = "0px";
    e.target.style.height = (e.target.scrollHeight + 25) + "px";
  }

}
