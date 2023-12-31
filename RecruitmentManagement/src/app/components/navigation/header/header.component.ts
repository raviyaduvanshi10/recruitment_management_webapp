import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { GeneralService } from 'src/app/services/general.service';
import { BnNgIdleService } from 'bn-ng-idle'; // import it to your component

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() public sidenavToggle = new EventEmitter();
  managerId;
  leadId;
  recruiterId;
  employeeId;
  employeeName;
  constructor(public dialog: MatDialog, private router: Router, private generalService: GeneralService,
    private bnIdle: BnNgIdleService) { }

  ngOnInit(): void {
    try {
      console.log("Try is running.")
      var auth = JSON.parse(localStorage.getItem("approvedCredential"));
      console.log(auth.loginType);
      if (auth.loginType == "Recruiter") {
        this.managerId = document.getElementById("manager");
        this.managerId.style.display = "none";
        this.leadId = document.getElementById("teamLead");
        this.leadId.style.display = "none";
        console.log(auth)
        console.log(auth._employeeId)
        this.employeeId = auth._employeeId;

        this.employeeName = auth.employee;
        console.log("Recruiter only");
      }
      else if (auth.loginType == "Team Lead") {
        this.managerId = document.getElementById("manager");
        this.managerId.style.display = "none";
        // this.recruiterId = document.getElementById("recruiter");
        // this.recruiterId.style.display = "none";
        console.log("Team only");
        this.employeeId = auth._employeeId;
        this.employeeName = auth.employee;
      }
      else if (auth.loginType == "Manager" || auth.loginType == "Admin") {
        this.recruiterId = document.getElementById("recruiter");
        this.recruiterId.style.display = "none";
        // this.leadId = document.getElementById("teamLead");
        // this.leadId.style.display = "none";
        console.log("Manage");
      }
      var _id = auth.adminId;
      console.log(_id);
    }
    catch (Error) {
      console.log("Catch is running");
      this.generalService.logOut();
    }
  }

  stay() {
    var sessionId = document.getElementById("session");
    sessionId.style.display = "none";
    // this.startWatching();
  }

  out() {
    this.generalService.logOut();
  }

  logOut() {
    this.generalService.logOut();
  }

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }

}
