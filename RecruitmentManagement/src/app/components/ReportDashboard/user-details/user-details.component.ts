import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';
import { employeeForm } from '../models/employeeModel';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  userName;
  userId;
  user_image;
  user_doc;
  dataSource = [];
  isLoading = true;
  employeeUpdateForm = employeeForm;

  constructor(private route: ActivatedRoute, private employeeService: EmployeeService,
    private sanitizer: DomSanitizer, private _location: Location) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.params['_id'];
    this.userName = this.route.snapshot.params['userName'];
    console.log(this.userName);
    this.loadingFile();
    this.loadingDocs();
    this.loadindData();
  }
  
  loadingFile() {
    this.employeeService.getUserFile(this.userName).subscribe(data => {
      let ObjectUrl = URL.createObjectURL(data);
      this.user_image = this.sanitizer.bypassSecurityTrustUrl(ObjectUrl);
    },
      err => console.log(err));
  }


  loadingDocs() {
    this.employeeService.getUserDocs(this.userName).subscribe(data => {
      let ObjectUrl = URL.createObjectURL(data);
      this.user_doc = this.sanitizer.bypassSecurityTrustResourceUrl(ObjectUrl);
      this.isLoading = false;
    },
      err => console.log(err));
  }

  loadindData() {
    this.employeeService.getEmployee(this.userId).subscribe(data => {
      // this.dataSource.push(data);
      this.employeeUpdateForm = data;
      console.log(data);
    },
      err => console.log(err));
  }

  userDoc() {
    var docID = document.getElementById("userdetails");
    docID.style.display = "none";
    var docID = document.getElementById("pdffile");
    docID.style.display = "block";
  }

  back() {
    var docID = document.getElementById("pdffile");
    docID.style.display = "none";
    var docID = document.getElementById("userdetails");
    docID.style.display = "block";
  }

  onSubmit() {
    console.log("submit");
    var formData = new FormData;
    formData.append("updatedJson", JSON.stringify(this.employeeUpdateForm));
    this.employeeService.updateEmployee(this.userId, formData).subscribe(data => {
      console.log(data);
      window.location.reload();
    },
      err => console.log(err));
  }

  return() {
    this._location.back();
  }

}
