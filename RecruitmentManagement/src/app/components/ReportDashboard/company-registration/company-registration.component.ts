import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { EmployeeService } from 'src/app/services/employee.service';
import { GeneralService } from 'src/app/services/general.service';
import { companyJson, Locations } from '../models/companyModel';

@Component({
  selector: 'app-company-registration',
  templateUrl: './company-registration.component.html',
  styleUrls: ['./company-registration.component.scss']
})
export class CompanyRegistrationComponent implements OnInit {
  @ViewChild('select') select: MatSelect;

  submitted = false;
  locations: Observable<any>;
  company = companyJson;
  allSelected;
  companyForm: FormGroup;
  locationForm: FormGroup;
  constructor(private router: Router, private employeeService: EmployeeService, private _location: Location, private fb: FormBuilder,
    private generalService: GeneralService) { }

  ngOnInit() {
    this.companyForm = this.fb.group({
      docFile: ""
    });

    this.locationForm = this.fb.group({
      location: ['']
    });
    this.reloadLocation();
  }


  onSubmit(companyForm: NgForm) {
    this.submitted = true;
    console.log(this.company);
    this.save(companyForm);
    //this.openingForm.reset();
  }

  save(companyForm) {
    const formData = new FormData;
    formData.append("docFile", this.companyForm.get("docFile").value);
    formData.append("companyFormJson", JSON.stringify(this.company));
    this.employeeService
      .registerCompany(formData).subscribe(data => {
        console.log(data)
        companyForm.resetForm();
        this.gotoHome();
      },
        error => console.log(error));
  }
  gotoHome() {
    this.router.navigate(['default/companylist'])
  }
  cancel() {
    this._location.back();
  }


  toggleAllSelection() {
    if (this.allSelected) {
      this.select.options.forEach((item: MatOption) => item.select());
    } else {
      this.select.options.forEach((item: MatOption) => item.deselect());
    }
  }

  optionClick() {
    let newStatus = true;
    this.select.options.forEach((item: MatOption) => {
      if (!item.selected) {
        newStatus = false;
      }
    });
    this.allSelected = newStatus;
  }
  onDocSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log(file.size);
      this.companyForm.get("docFile").setValue(file);
    }
  }

  addLocation() {
    var openingFormId = document.getElementById("openingForm");
    openingFormId.style.display = "none";
    var domainFormId = document.getElementById("locationForm");
    domainFormId.style.display = "block";
  }

  back() {
    var openingFormId = document.getElementById("openingForm");
    openingFormId.style.display = "block";
    var locationFormId = document.getElementById("locationForm");
    locationFormId.style.display = "none";
  }

  submitLocation() {
    var formData = new FormData;
    formData.append("locationJson", JSON.stringify(this.locationForm.value));
    this.generalService.addLocation(formData).subscribe(data => {
      console.log("Location added : " + data);
      if (JSON.parse(JSON.stringify(data)).status == "302") {
        alert(JSON.parse(JSON.stringify(data)).msg);
      }
      else {
        alert(JSON.parse(JSON.stringify(data)).msg);
      }
      var openingFormId = document.getElementById("openingForm");
      openingFormId.style.display = "block";
      var locationFormId = document.getElementById("locationForm");
      locationFormId.style.display = "none";
      this.locationForm.reset();
      // this.subDomains = [];
      window.location.reload();
    },
      err => console.log(err));
  }

  reloadLocation() {
    this.generalService.getLocations().subscribe(data => {
      this.locations = data;
      console.log(this.locations);
    },
      err => console.log(err));
  }

}
