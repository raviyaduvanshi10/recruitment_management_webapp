import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadProfileService {

  constructor(private http: HttpClient) { }

  getResumeDetail(formData): Observable<any> {
    var adminId = JSON.parse(localStorage.getItem("approvedCredential")).adminId;
    return this.http.post(`${environment.recruitmentServer}/candidateresume/${adminId}`, formData);
  }
  uploadProfile(resumeData: FormData): Observable<any> {
    var adminId = JSON.parse(localStorage.getItem("approvedCredential")).adminId;
    return this.http.post(`${environment.recruitmentServer}/uploadprofile/${adminId}`, resumeData);
  }
  getCandidateList(openingId): Observable<any> {
    console.log("_date" + openingId);
    var adminId = JSON.parse(localStorage.getItem("approvedCredential")).adminId;
    return this.http.get(`${environment.recruitmentServer}/uploadprofile/${adminId + openingId}`);
  }
  deleteCandidate(_id: string): Observable<any> {
    return this.http.delete(`${environment.recruitmentServer}/uploadprofile/${_id}`, { responseType: 'text' })
  }

  sentMail(email: Object): Observable<any> {
    return this.http.post(`${environment.recruitmentServer}/candidatemail`, email);
  }

  getBinaryFile(formData): Observable<any> {
    return this.http.post(`${environment.recruitmentServer}/uploadimage`, formData);
  }

  sharedProfile(formData): Observable<any> {
    var adminId = JSON.parse(localStorage.getItem("approvedCredential")).adminId;
    return this.http.post(`${environment.recruitmentServer}/sharedprofile/${adminId}`, formData);
  }

  getSharedProfile(approvedprofileId): Observable<any> {
    var adminId = JSON.parse(localStorage.getItem("approvedCredential")).adminId;
    return this.http.get(`${environment.recruitmentServer}/sharedprofile/${adminId + approvedprofileId}`);
  }

  rejectedProfile(formData): Observable<any> {
    var adminId = JSON.parse(localStorage.getItem("approvedCredential")).adminId;
    return this.http.post(`${environment.recruitmentServer}/rejectedprofile/${adminId}`, formData);
  }

  joinedProfile(formData): Observable<any> {
    var adminId = JSON.parse(localStorage.getItem("approvedCredential")).adminId;
    return this.http.post(`${environment.recruitmentServer}/joinedprofile/${adminId}`, formData);
  }

  getCandidateProfileByfilter(filter, type): Observable<any> {
    var adminId = JSON.parse(localStorage.getItem("approvedCredential")).adminId;
    return this.http.put(`${environment.recruitmentServer}/uploadprofile/${adminId + filter}`, type);
  }

  getRejectedProfileByfilter(filter, type): Observable<any> {
    var adminId = JSON.parse(localStorage.getItem("approvedCredential")).adminId;
    return this.http.put(`${environment.recruitmentServer}/rejectedprofile/${adminId + filter}`, { "filterType": type });
  }

  getJoinedProfileByfilter(filter, type): Observable<any> {
    var adminId = JSON.parse(localStorage.getItem("approvedCredential")).adminId;
    return this.http.put(`${environment.recruitmentServer}/joinedprofile/${adminId + filter}`, { "filterType": type });
  }

  getDropedProfileByfilter(filter, type): Observable<any> {
    var adminId = JSON.parse(localStorage.getItem("approvedCredential")).adminId;
    return this.http.put(`${environment.recruitmentServer}/joinedprofile/${adminId + filter}`, { "filterType": type });
  }

  profileCrud(filter, type): Observable<any> {
    var adminId = JSON.parse(localStorage.getItem("approvedCredential")).adminId;
    return this.http.put(`${environment.recruitmentServer}/profilecrud/${adminId + filter}`, type);
  }

}
