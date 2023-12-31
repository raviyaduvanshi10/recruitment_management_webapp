import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Employee } from '../../ReportDashboard/models/employeeModel';
import { Opening } from '../../shared/openiningModel';
import { WorkAllocationService } from '../../../services/work-allocation.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { DatePipe, Location } from '@angular/common';
import { OpeningService } from 'src/app/services/opening.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';

@Component({
  selector: 'app-work-allocation',
  templateUrl: './work-allocation.component.html',
  styleUrls: ['./work-allocation.component.scss'],
  providers: [DatePipe]
})
export class WorkAllocationComponent implements OnInit {
  @ViewChild('select') select: MatSelect;

  allSelected;
  openings: Observable<Opening[]>;
  searchText;
  searchText1;
  employees: Observable<Employee[]>;
  slots = ["09:30AM-11:00AM", "11:00AM-01:00AM", "02:00AM-04:00AM", "04:00AM-06:30AM"]
  recruiterId;
  openiningId;
  slot;
  isLoading = true;
  resumeDoc;
  companyName;
  clientName;
  dt;
  role;
  constructor(private router: Router, private openingService: OpeningService, private employeeService: EmployeeService,
    private workAllocationService: WorkAllocationService, private datePipe: DatePipe,
    private docService: EmployeeService, private _location: Location, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.searchText = this.datePipe.transform(new Date(), 'MMMM, yyyy');
    console.log(this.searchText);
    this.reloadData();
    this.reloadEmployee();
  }
  dateFormat() {
    // this.searchText = this.datePipe.transform(this.searchText1, 'longDate');
    this.searchText = this.datePipe.transform(this.searchText1, 'MMMM, yyyy');
    this.reloadData();
  }

  reloadData() {
    if (this.searchText == null) {
      alert("Please select valid date. Thankyou !");
      return;
    }
    this.isLoading = true;
    this.openingService.getOpeningList(this.searchText).subscribe(data => {
      this.openings = data;
      console.log(this.openings);
      this.isLoading = false;
    },
      err => console.log(err));
  }
  reloadEmployee() {
    this.employeeService.getEmployeeList().subscribe(data => {
      this.employees = data;
      console.log(data);
    }),
      err => {
        console.log(err);
      }
  }

  recruiterAllocation(value, _id) {
    this.recruiterId = value;
    this.openiningId = _id;
    console.log(this.recruiterId + " " + this.openiningId);
  }
  slotAllocation(value) {
    this.slot = value;
    console.log(this.slot);
  }

  workAllocation(_id) {
    console.log(this.openiningId + " " + this.recruiterId + " " + this.slot);
    this.workAllocationService.allocateWork({
      "openingId": this.openiningId,
      "recruiterId": this.recruiterId,
      "slot": this.slot
    }).subscribe(data => {
      console.log(data);
      if (data.statusCode == 302) {
        alert(data.message);
      }
      else {
        this.router.navigate(['/default/activeopening', _id]);
      }
    },
      error => alert("Something went wrong.Please try again."));
  }

  deleteUser(_id: string) {
    this.openingService.deleteAppUser(_id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }
  list() {
    this.router.navigate(['/default/home']);
  }

  displayDoc(role, companyName, clientName, dt) {
    var openingListId = document.getElementById("openingList")
    openingListId.style.display = "none"
    var openingSampleId = document.getElementById("openingSample")
    openingSampleId.style.display = "block"
    this.companyName = companyName;
    this.clientName = clientName;
    this.dt = dt;
    this.role = role;
    this.docService.getDocs(role).subscribe(data => {
      console.log(data);
      let ObjectUrl = URL.createObjectURL(data);
      this.resumeDoc = this.sanitizer.bypassSecurityTrustResourceUrl(ObjectUrl);
    },
      err => console.log(err));
  }

  back() {
    var openingSampleId = document.getElementById("openingSample")
    openingSampleId.style.display = "none"
    var openingListId = document.getElementById("openingList")
    openingListId.style.display = "block"
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

}
