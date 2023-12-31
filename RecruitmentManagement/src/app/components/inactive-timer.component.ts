import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, timer, Subscription } from 'rxjs';
import { takeUntil, take } from 'rxjs/operators';
import { GeneralService } from '../services/general.service';

@Component({
    selector: 'inactivity-timer',
    template: `
    <div style="font-size:12px">You logout in:  {{ (minutesDisplay) }}:{{ (secondsDisplay) && (secondsDisplay <=59) ? secondsDisplay : '00' }}
    </div>
  `,
    styles: []
})
export class InactivityTimerComponent implements OnDestroy, OnInit {

    minutesDisplay = 0;
    secondsDisplay = 0;

    endTime = 10;

    unsubscribe$: Subject<void> = new Subject();
    timerSubscription: Subscription;

    constructor(private generalService: GeneralService) {

    }

    ngOnInit() {
        this.resetTimer();
        this.generalService.userActionOccured.pipe(
            takeUntil(this.unsubscribe$)
        ).subscribe(() => {
            if (this.timerSubscription) {
                this.timerSubscription.unsubscribe();
            }
            this.resetTimer();
        });
    }

    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    resetTimer(endTime: number = this.endTime) {
        const interval = 1000;
        const duration = endTime * 60;
        this.timerSubscription = timer(0, interval).pipe(
            take(duration)
        ).subscribe(value =>
            this.render((duration - +value) * interval),
            err => { },
            () => {
                this.generalService.logOut();
            }
        )
    }

    private render(count) {
        this.secondsDisplay = this.getSeconds(count);
        this.minutesDisplay = this.getMinutes(count);
    }

    private getSeconds(ticks: number) {
        const seconds = ((ticks % 60000) / 1000).toFixed(0);
        return this.pad(seconds);
    }

    private getMinutes(ticks: number) {
        const minutes = Math.floor(ticks / 60000);
        return this.pad(minutes);
    }

    private pad(digit: any) {
        return digit <= 9 ? '0' + digit : digit;
    }

}