import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Entry } from '../entry';
import { FirestoreService, GinEvent } from '../firestore.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  entries: Observable<Entry[]>;
  passwordGiven: boolean = false;
  event: Observable<GinEvent>;
  constructor(private firestore: FirestoreService) {
    this.entries = this.firestore.getEntries();
    this.event = this.firestore.getEvent();
  }

  public displayedColumns = ['main'];
  public password = '';
  private hash(password: string) {
    let hash = 0;
    if (password.length == 0) {
      return hash;
    }
    for (const c of password) {
      hash = ((hash << 5) - hash) + c.charCodeAt(0);
      hash = hash & hash;
    }
    return hash;
  }
  onChange() {
    if(this.hash(this.password) === 102348) {
      this.passwordGiven = true;
    }
  }
  countPostEvent(entries: Entry[]) {
    return entries.filter(e => e.postEvent).length;
  }

}
