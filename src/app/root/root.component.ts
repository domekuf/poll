import { Component } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss'],
  animations: [
    trigger('fade', [
      state('false', style({ opacity: 0 })),
      state('true', style({ opacity: 1 })),
      transition('false => true', animate('800ms ease-in')),
    ]),
  ],
})
export class RootComponent {
  public fadeInStart = false;

  ngOnInit() {
    setTimeout(()=>{
      this.fadeInStart = true;
    }, 100);
  }

}
