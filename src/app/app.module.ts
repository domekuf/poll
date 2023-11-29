import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    provideFirebaseApp(() => initializeApp({"projectId":"anna-30","appId":"1:292477778408:web:7fe23280341abbf9354c5d","storageBucket":"anna-30.appspot.com","apiKey":"AIzaSyBVAjQ80L8usJFCDK_GpE_W02zzwoJsoo4","authDomain":"anna-30.firebaseapp.com","messagingSenderId":"292477778408","measurementId":"G-9KKP5RG1BK"})),
    provideFirestore(() => getFirestore()),
  ],
  providers: [provideAnimations()],
  bootstrap: [AppComponent]
})
export class AppModule { }
