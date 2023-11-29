import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    QRCodeModule,
    provideFirebaseApp(() => initializeApp({"projectId":"ccarbon-x","appId":"1:884074116391:web:75509a09143ade0b842502","databaseURL":"https://ccarbon-x-default-rtdb.firebaseio.com","storageBucket":"ccarbon-x.appspot.com","apiKey":"AIzaSyBB_k71HP5C5sk5wJivTVtQo9H0-O6TNwQ","authDomain":"ccarbon-x.firebaseapp.com","messagingSenderId":"884074116391","measurementId":"G-ET2HQL9NVD"})),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideDatabase(() => getDatabase())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
