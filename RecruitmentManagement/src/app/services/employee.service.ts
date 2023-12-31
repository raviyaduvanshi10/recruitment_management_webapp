import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  getEmployee(_id: string): Observable<any> {
    // var adminId = JSON.parse(localStorage.getItem("approvedCredential")).adminId;
    return this.http.get(`${environment.recruitmentServer}/employee/${_id}`);
  }

  createEmployee(formData: FormData): Observable<Object> {
    var _id = JSON.parse(localStorage.getItem("approvedCredential")).adminId;
    return this.http.post(`${environment.recruitmentServer}/employees/${_id}`, formData);
  }

  updateEmployee(_id: string, formData: FormData): Observable<Object> {
    return this.http.put(`${environment.recruitmentServer}/employee/${_id}`, formData);
  }

  deleteEmployee(_id: string, active: boolean): Observable<any> {
    return this.http.delete(`${environment.recruitmentServer}/employee/${_id + active}`, { responseType: 'text' });
  }

  getEmployeeList(): Observable<any> {
    var _id = JSON.parse(localStorage.getItem("approvedCredential")).adminId;
    return this.http.get(`${environment.recruitmentServer}/employees/${_id}`);
  }

  registerCompany(formData: FormData): Observable<Object> {
    var adminId = JSON.parse(localStorage.getItem("approvedCredential")).adminId;
    console.log(adminId);
    return this.http.post(`${environment.recruitmentServer}/registercompany/${adminId}`, formData);
  }
  getCompanyList(): Observable<any> {
    var adminId = JSON.parse(localStorage.getItem("approvedCredential")).adminId;
    console.log(adminId);
    return this.http.get(`${environment.recruitmentServer}/registercompany/${adminId}`);
  }
  registerClient(client: Object): Observable<any> {
    var adminId = JSON.parse(localStorage.getItem("approvedCredential")).adminId;
    console.log(adminId);
    return this.http.post(`${environment.recruitmentServer}/registerclient/${adminId}`, client);
  }
  getClientList(): Observable<any> {
    var adminId = JSON.parse(localStorage.getItem("approvedCredential")).adminId;
    console.log(adminId);
    return this.http.get(`${environment.recruitmentServer}/registerclient/${adminId}`)
  }

  loginEmployee(loginJson: Object): Observable<any> {
    var loginType = JSON.parse(localStorage.getItem("loginCredential")).loginType;
    console.log(loginType);
    if (loginType == "Admin") {
      return this.http.post(`${environment.recruitmentServer}/loginadmin`, loginJson);
    }
    else if ((loginType == "Employee")) {
      return this.http.post(`${environment.recruitmentServer}/employeelogin`, loginJson);
    }
    else {
      alert("Please select login type and try again .")
    }
  }

  dailyWorkReport(): Observable<any> {
    var adminId = JSON.parse(localStorage.getItem("approvedCredential")).adminId;
    return this.http.get(`${environment.recruitmentServer}/dailyworkreport/${adminId}`)
  }

  getUserFile(userName): Observable<any> {
    return this.http.get(`${environment.recruitmentServer}/filehandling/${userName}`, { responseType: 'blob' })
  }

  getUserDocs(userName): Observable<any> {
    // var adminId = JSON.parse(localStorage.getItem("approvedCredential")).adminId;
    return this.http.get(`${environment.recruitmentServer}/userdochandling/${userName}`, { responseType: 'blob' })
  }

  getDocs(userName): Observable<any> {
    var adminId = JSON.parse(localStorage.getItem("approvedCredential")).adminId;
    return this.http.get(`${environment.recruitmentServer}/dochandling/${adminId + userName}`, { responseType: 'blob' })
  }

  getCompanyDetailById(_id): Observable<any> {
    var adminId = JSON.parse(localStorage.getItem("approvedCredential")).adminId;
    console.log(adminId);
    return this.http.get(`${environment.recruitmentServer}/companycrud/${adminId + _id}`);
  }

  getClientyDetailById(_id): Observable<any> {
    var adminId = JSON.parse(localStorage.getItem("approvedCredential")).adminId;
    console.log(adminId);
    return this.http.get(`${environment.recruitmentServer}/clientcrud/${adminId + _id}`);
  }

  getUserDetailById(_id): Observable<any> {
    var adminId = JSON.parse(localStorage.getItem("approvedCredential")).adminId;
    console.log(adminId);
    return this.http.get(`${environment.recruitmentServer}/userdetail/${adminId}`, _id);
  }

}
