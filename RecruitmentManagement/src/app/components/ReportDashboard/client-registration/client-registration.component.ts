import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { EmployeeService } from 'src/app/services/employee.service';
import { GeneralService } from 'src/app/services/general.service';
import { Locations } from '../models/companyModel';
import { Company, CompanyList } from '../models/employeeModel';

@Component({
  selector: 'app-client-registration',
  templateUrl: './client-registration.component.html',
  styleUrls: ['./client-registration.component.scss']
})
export class ClientRegistrationComponent implements OnInit {


  submitted = false;

  client = {
    companyName: '',
    clientName: '',
    clientURL: '',
    corporatePresentation: '',
    branches: '',
    remarks: ''
  };
  location: Observable<any>;
  companies: Observable<CompanyList[]>;
  clientForm: FormGroup;
  locationForm: FormGroup;

  constructor(private router: Router, private clientService: EmployeeService, private _location: Location, private fb: FormBuilder,
    private generalService: GeneralService) { }

  ngOnInit() {
    this.clientService.getCompanyList().subscribe(data => {
      this.companies = data;
      console.log(data);
    });

    this.clientForm = this.fb.group({
      docFile: ""
    });

    this.locationForm = this.fb.group({
      location: ['']
    });

    this.reloadLocation();
  }


  onSubmit() {
    this.submitted = true;
    console.log(this.client);
    this.save();
    //this.openingForm.reset();
  }

  save() {
    const formData = new FormData;
    formData.append("docFile", this.clientForm.get("docFile").value);
    formData.append("clientFormJson", JSON.stringify(this.client));
    this.clientService.registerClient(formData).subscribe(data => {
      console.log(data)
      this.gotoHome();
    },
      error => console.log(error));
  }
  gotoHome() {
    this.router.navigate(['/default/clientlist'])
  }
  cancel() {
    this._location.back();
  }


  onDocSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log(file.size);
      this.clientForm.get("docFile").setValue(file);
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
      this.location = data;
      console.log(this.location);
    },
      err => console.log(err));
  }

}
