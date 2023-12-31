import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms'
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {

  user = { loginType: '', userName: '', password: '' };
  loginForm;
  isLoading = false;

  // constructor(private dialogRef: MatDialogRef<LoginComponent>, private fb: FormBuilder) { }

  constructor(private fb: FormBuilder, private router: Router, private employeeService: EmployeeService) { }

  ngOnInit(): void {

  }

  async onSubmit() {
    this.isLoading = true;
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('User:', this.user);
    localStorage.setItem("loginCredential", JSON.stringify(this.user));
    this.employeeService.loginEmployee(this.user).subscribe(data => {
      localStorage.setItem("approvedCredential", JSON.stringify(data));
      sessionStorage.setItem("approvedCredential", JSON.stringify(data));
      var user = JSON.parse(localStorage.getItem("approvedCredential"));
      console.log(user);

      if (user.status == 302) {
        alert("Invalid password. Please try again.");
        this.isLoading = false;
      }
      else if (user.status == 303) {
        alert(user.message);
        this.isLoading = false;
      }
      else {
        this.router.navigate(["/default"]);
        this.isLoading = false;
      }
    },
      err => alert("Invalid credentials. Please try again."));
  }

}