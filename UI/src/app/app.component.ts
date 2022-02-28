import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
@Component({
  // tslint:disable-next-line
  selector: 'body',
  providers: [DatePipe],
  templateUrl: './app.component.html'
})
export class AppComponent {
  public loading = false;

 }
