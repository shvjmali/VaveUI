import {
  Component,
  OnInit,
  NgZone,
  ViewChild,
  Input,
  Output,
  EventEmitter,
  HostListener
} from '@angular/core';
import {
  AbstractControl,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import { debug } from 'util';
@Component({
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  constructor() {
  }
  onSubmit(isValid: boolean) {
}
}
