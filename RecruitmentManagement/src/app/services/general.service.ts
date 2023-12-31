import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor(private https: HttpClient, private router: Router) { }

  scheduleTask(formData: FormData): Observable<any> {
    var adminId = JSON.parse(localStorage.getItem("approvedCredential")).adminId;
    return this.https.post(`${environment.recruitmentServer}/scheduletask/${adminId}`, formData);
  }

  getScheduleTask(): Observable<any> {
    var adminId = JSON.parse(localStorage.getItem("approvedCredential")).adminId;
    var employeeId = JSON.parse(localStorage.getItem("approvedCredential"))._employeeId;
    return this.https.get(`${environment.recruitmentServer}/scheduletask/${adminId + employeeId}`);
  }

  updateTask(formData: Object): Observable<any> {
    var adminId = JSON.parse(localStorage.getItem("approvedCredential")).adminId;
    return this.https.put(`${environment.recruitmentServer}/scheduletask/${adminId}`, formData);
  }

  getRejectedProfiles(rejectedId): Observable<any> {
    var adminId = JSON.parse(localStorage.getItem("approvedCredential")).adminId;
    return this.https.get(`${environment.recruitmentServer}/rejectedprofile/${adminId + rejectedId}`);
  }

  addDomain(formData: FormData): Observable<any> {
    var adminId = JSON.parse(localStorage.getItem("approvedCredential")).adminId;
    return this.https.post(`${environment.recruitmentServer}/domains/${adminId}`, formData);
  }

  getDomains(): Observable<any> {
    var adminId = JSON.parse(localStorage.getItem("approvedCredential")).adminId;
    return this.https.get(`${environment.recruitmentServer}/domains/${adminId}`);
  }

  getSubDomains(domainName): Observable<any> {
    var adminId = JSON.parse(localStorage.getItem("approvedCredential")).adminId;
    return this.https.get(`${environment.recruitmentServer}/domains/${adminId + domainName}`);
  }

  addLocation(formData: FormData): Observable<any> {
    var adminId = JSON.parse(localStorage.getItem("approvedCredential")).adminId;
    return this.https.post(`${environment.recruitmentServer}/locations/${adminId}`, formData);
  }

  getLocations(): Observable<any> {
    var adminId = JSON.parse(localStorage.getItem("approvedCredential")).adminId;
    return this.https.get(`${environment.recruitmentServer}/locations/${adminId}`);
  }

  logOut() {
    // this.dialog.open(LoginComponent, {width: '500px', height: '450px'});
    localStorage.removeItem("credential");
    localStorage.removeItem("approvedCredential");
    var auth = JSON.parse(localStorage.getItem("credential"));
    var auth1 = JSON.parse(localStorage.getItem("approvedCredential"));
    this.router.navigate(["/login"]);
    console.log(auth);
    console.log(auth1);
    console.log("Log out");
  }


  _userActionOccured: Subject<void> = new Subject();
  get userActionOccured(): Observable<void> { return this._userActionOccured.asObservable() };

  notifyUserAction() {
    this._userActionOccured.next();
  }

}
