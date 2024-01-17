import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { map, Observable, Subject, Subscription, takeUntil } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Entry } from './entry';
import { FirestoreService, GinEvent } from './firestore.service';

@Component({
  selector: 'app-root',
  templateUrl: './aio.component.html',
  styleUrls: ['./aio.component.scss'],
  animations: [
    trigger('fade', [
      state('false', style({ opacity: 0 })),
      state('true', style({ opacity: 1 })),
      transition('false => true', animate('800ms ease-in')),
    ]),
  ]
})
export class AioComponent implements OnInit, OnDestroy {
  public fadeInStart = false;
  public done = false;

  ngOnInit() {
    setTimeout(()=>{
      this.fadeInStart = true;
    }, 100);
  }
  entries: Entry[] = [];
  event?: GinEvent;
  name?: string;
  contact?: string;
  newOne() {
    this.done = false;
  }
  onClick() {
    if (!this.name) {
      alert('Inserisci un nome! 😅');
      return;
    }
    this.firestore.addEntry({
      name: this.name,
      contact: this.contact ?? ''
    }, () => {
      this.done = true;
    })
  }

  constructor(
    private firestore: FirestoreService,
    ) {
    this.firestore.getEntries()
      .pipe(takeUntil(this.destroy))
      .subscribe(e => {
        this.entries = e;
        this.shuffle();
      });
    this.firestore.getEvent()
      .pipe(takeUntil(this.destroy))
      .subscribe(e => {
        this.event = e;
      });
  }
  get length(): number {
    return this.entries.length;
  }

  private destroy = new Subject<boolean>();

  ngOnDestroy(): void {
    this.destroy.next(true);
  }

  get started(): boolean {
    if (this.event) {
      return this.event?.subscriptionBy.getTime() < new Date().getTime();
    }
    return true;
  }

  getRandomColorClass(): string {
    return `color-${Math.floor(Math.random() * 10)}`;
  }

  getRandomMarginLeft(): number {
    return Math.random() * 375 - 190;
  }

  getRandomMarginTop(): number {
    return Math.random() * -20;
  }

  shuffle() {
    this.entries.sort(() => Math.random() - 0.5);
  }

}
