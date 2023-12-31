import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.scss']
})
export class CompanyDetailsComponent implements OnInit {

  dataSource: Observable<any>;
  companyId;
  companyName;
  companyDoc;

  constructor(private route: ActivatedRoute, private companyService: EmployeeService,
    private sanitizer: DomSanitizer, private _location: Location) { }

  ngOnInit(): void {
    this.companyId = this.route.snapshot.params['_id'];
    this.companyName = this.route.snapshot.params['companyName'];
    console.log(this.companyId);
    this.reloadData();
    this.reloadDoc();
  }

  reloadData() {
    this.companyService.getCompanyDetailById(this.companyId).subscribe(data => {
      console.log(data);
      this.dataSource = data;
    },
      err => console.log(err));
  }

  reloadDoc() {
    this.companyService.getUserDocs(this.companyName).subscribe(data => {
      console.log(data);
      let ObjectUrl = URL.createObjectURL(data);
      this.companyDoc = this.sanitizer.bypassSecurityTrustResourceUrl(ObjectUrl);
    },
      err => console.log(err));
  }

  back() {
    this._location.back();
  }
}
