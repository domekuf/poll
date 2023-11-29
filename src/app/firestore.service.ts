import { inject, Injectable } from '@angular/core';
import { collection, collectionData, CollectionReference, Firestore } from '@angular/fire/firestore';
import { addDoc } from 'firebase/firestore';
import { Observable, of } from 'rxjs';
import { Entry } from './entry';


@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  private firestore: Firestore = inject(Firestore);
  entriesCollection: any;
  entries: Observable<Entry[]>;

  constructor() {
    this.entriesCollection = collection(this.firestore, 'entries');
    this.entries = collectionData(this.entriesCollection) as Observable<Entry[]>;
  }

  getEntries(): Observable<Entry[]> {
    return collectionData(this.entriesCollection) as Observable<Entry[]>;
  }

  addEntry(entry: Entry, cb: { (): void; (): void; }) {
    const sub = this.entries.subscribe(entries => {
      if (entries.find(e => e.name === entry.name)) {
        alert(`Scusa ${entry.name} ma qualcuno ha già usato questo nome! 🙁`);
        sub.unsubscribe();
      } else {
        alert(`Grazie ${entry.name}! ❤️`);
        addDoc(this.entriesCollection, entry)
        cb();
        sub.unsubscribe();
      }
    });
  }
}
