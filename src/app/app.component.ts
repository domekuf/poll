import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
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
  constructor(private firestore: FirestoreService) {
    this.entriesSub = this.firestore.getEntries().subscribe(e => this.entries = e);
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
}
