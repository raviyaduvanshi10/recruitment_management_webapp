import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
// import { BnNgIdleService } from 'bn-ng-idle'; // import it to your component
import { GeneralService } from './services/general.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'RecruitmentManagement';
  public getScreenWidth: any;
  public getScreenHeight: any;
  submitted;
  constructor(private router: Router, private generalService: GeneralService) {

  }

  @HostListener('document:keyup', ['$event'])
  @HostListener('document:click', ['$event'])
  @HostListener('document:wheel', ['$event'])
  resetTimer() {
    this.generalService.notifyUserAction();
  }

  ngOnInit() {
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;
    // this.bnIdle.startWatching(60).subscribe((isTimedOut: boolean) => {
    //   if (isTimedOut) {
    //     console.log('session expired');
    //     alert("session expired");
    //     this.generalService.logOut();
    //   }
    // });
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;
  }
}
