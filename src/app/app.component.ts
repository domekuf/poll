import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Entry } from './entry';
import { FirestoreService } from './firestore.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('fade', [
      state('false', style({ opacity: 0 })),
      state('true', style({ opacity: 1 })),
      transition('false => true', animate('800ms ease-in')),
    ]),
  ]
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'ginginbell';
  public fadeInStart = false;
  public done = false;
  public page = 0;
  public nextPage() {
    this.page ++;
  }

  public prevPage() {
    this.page --;
  }

  ngOnInit() {
    setTimeout(()=>{
      this.fadeInStart = true;
    }, 100);
  }
  entries: Entry[] = [];
  entriesSub: Subscription;
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
    this.entriesSub = this.firestore.getEntries().subscribe(e => {
      this.entries = e;
      this.shuffle();
    });
  }
  get length(): number {
    return this.entries.length;
  }

  ngOnDestroy(): void {
    if (this.entriesSub && !this.entriesSub.closed) {
      this.entriesSub.unsubscribe();
    }
  }
  get started(): boolean {
    return new Date().getTime() > this.eventDate.getTime();
  }

  get eventDate(): Date {
    return environment.eventDate;
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
