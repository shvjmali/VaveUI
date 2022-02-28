import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user-service';
import { Constants } from '../../_shared/constant';

@Component({
  templateUrl: './forgot-password.component.html'
})

// tslint:disable-next-line:component-class-suffix
export class ForgotPassword {
  public loading = false;
  isOTPSend: boolean;
  forgotPassword: any = {};
  constants: any;
  constructor(
    private _UserService: UserService,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.isOTPSend = false;
    this.forgotPassword.email = '';
    this.forgotPassword.contactNo = '';
    this.forgotPassword.otp = '';
    this.forgotPassword.password = '';
    this.forgotPassword.confirmPassword = '';
    this.constants = Constants;
    this.constants = Constants;
  }

  ResetPassword(isValid: boolean) {
    this.loading = true;
    if (isValid) {
      this.loading = true;
      this._UserService.ForgotPassword(this.forgotPassword).subscribe(
        res => {
          this.loading = false;
          this.ngZone.run(() => {
            if (res) {
              this.loading = false;
              // this.router.navigate(['/account', 'login']);
              this.router.navigate(['/account', 'password-change-success']);
            }
          });
        },
        err => {
          this.loading = false;
        }
      );
    } else {
      this.loading = false;
    }
  }
}
