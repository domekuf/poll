import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, ElementRef, OnDestroy } from '@angular/core';
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
      state('false', style({ background: '#8CAA9B', opacity: 0 })),
      state('true', style({ background: '#8CAA9B33', opacity: 1 })),
      transition('false => true', animate('800ms ease-in')),
    ]),
  ]
})
export class AppComponent implements AfterViewInit, OnDestroy {
  title = 'anna-30';
  public fadeInStart = false;
  public done = false;
  public page = 0;
  public nextPage() {
    this.page ++;
  }

  public prevPage() {
    this.page --;
  }

  ngAfterViewInit() {
    this.fadeInStart = true;
  }
  entries: Entry[] = [];
  entriesSub: Subscription;
  name?: string;
  amount?: number;
  onClick() {
    if (!this.name) {
      alert('Inserisci un nome! 😅');
      return;
    }
    if (!this.amount) {
      alert(`Ciao ${this.name}, inserisci un importo! 😁`);
      return;
    }
    this.firestore.addEntry({
      name: this.name,
      amount: this.amount
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

  get average(): number {
    return this.entries.reduce((a, b) => a + b.amount/this.entries.length, 0);
  }

  get max(): number {
    return this.entries.reduce((a, b) => a > b.amount ? a : b.amount, 0);
  }

  get total(): number {
    return this.entries.reduce((a, b) => a + b.amount, 0);
  }
  ngOnDestroy(): void {
    if (this.entriesSub && !this.entriesSub.closed) {
      this.entriesSub.unsubscribe();
    }
  }
  get started(): boolean {
    return new Date().getTime() > environment.eventDate.getTime();
  }
  colors = ["pms-dark", "old-rose", "taupe", "pms", "pms-light"];

  getRandomColorClass(): string {
    const randomColorIndex = Math.floor(Math.random() * this.colors.length);
    return this.colors[randomColorIndex];
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
