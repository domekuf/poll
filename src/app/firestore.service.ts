import { inject, Injectable } from '@angular/core';
import { collection, collectionData, CollectionReference, docData, Firestore } from '@angular/fire/firestore';
import { addDoc, doc, setDoc, Timestamp } from 'firebase/firestore';
import { map, Observable, of } from 'rxjs';
import { Entry } from './entry';

interface CommonEvent {
  description: string,
  distance: string,
  distanceAlt: string,
  name: string,
  place: string,
  placeAddress: string,
  placeLink: string,
  postEventName: string,
  postEventCost: number,
}

interface FirestoreEvent extends CommonEvent {
  date: Timestamp,
  subscriptionBy: Timestamp,
}

export interface GinEvent extends CommonEvent {
  date: Date,
  subscriptionBy: Date,
}


@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  readonly eventName: string = 'aio'
  private firestore: Firestore = inject(Firestore);
  eventCollection: any;
  entriesCollection: any;
  entries: Observable<Entry[]>;
  event: Observable<FirestoreEvent>;

  constructor(
  ) {
    this.entriesCollection = collection(this.firestore, `events/${this.eventName}/entries`);
    this.entries = collectionData(this.entriesCollection) as Observable<Entry[]>;
    this.event = docData(doc(this.firestore, `events/${this.eventName}`)) as Observable<FirestoreEvent>;
  }

  getEntries(): Observable<Entry[]> {
    return this.entries;
  }

  getEvent(): Observable<GinEvent> {
    return this.event.pipe(
      map((t) => {
        return {
          ...t,
          date: t.date.toDate(),
          subscriptionBy: t.subscriptionBy.toDate(),
        };
      }
    ))
  }

  addEntry(entry: Entry, cb: { (): void; (): void; }) {
    const sub = this.entries.subscribe(entries => {
      if (entries.find(e => e.name === entry.name)) {
        alert(`Scusa ${entry.name} ma qualcuno ha già usato questo nome! 🙁 Scegline un altro!`);
        sub.unsubscribe();
      } else {
        alert(`Grazie ${entry.name}! ❤️`);
        setDoc(doc(this.firestore, `events/${this.eventName}/entries`, entry.name), entry)
        cb();
        sub.unsubscribe();
      }
    });
  }
}
