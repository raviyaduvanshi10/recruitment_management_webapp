import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.scss']
})
export class ClientDetailsComponent implements OnInit {

  dataSource: Observable<any>;
  clientId;
  clientName;
  clientDoc;

  constructor(private route: ActivatedRoute, private clientService: EmployeeService,
    private sanitizer: DomSanitizer, private _location: Location) { }

  ngOnInit(): void {
    this.clientId = this.route.snapshot.params['_id'];
    this.clientName = this.route.snapshot.params['clientName'];
    console.log(this.clientId);
    this.reloadData();
    this.reloadDoc();
  }

  reloadData() {
    this.clientService.getClientyDetailById(this.clientId).subscribe(data => {
      console.log(data);
      this.dataSource = data;
    },
      err => console.log(err));
  }

  reloadDoc() {
    this.clientService.getUserDocs(this.clientName).subscribe(data => {
      console.log(data);
      let ObjectUrl = URL.createObjectURL(data);
      this.clientDoc = this.sanitizer.bypassSecurityTrustResourceUrl(ObjectUrl);
    },
      err => console.log(err));
  }

  back() {
    this._location.back();
  }

}
