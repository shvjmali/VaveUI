import { NgModule } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';
import { AccountRoutingModule } from './account-routing.module';
import { CommonModule } from '@angular/common';
import { ForgotPassword } from './forgotPassword/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { VerificationComponent } from './verification/verification-component';
import { RegisterComponent } from './registration/register.component';
import { EqualValidator } from '../_shared/equal-validator.directive';
import { RegistrationSuccessComponent } from './registration/registration-success.component';
import { PasswordChangeComponent } from './passwordChange/password-change.component';
// import { ChangePassword } from 'app/account/change-password.component';
// import { BrowserModule } from '@angular/platform-browser';
// import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    AccountRoutingModule,
    ModalModule.forRoot(),
    FormsModule,
    CommonModule,
  ],
  declarations: [
    ForgotPassword,
    LoginComponent,
    VerificationComponent,
    RegisterComponent,
    EqualValidator,
    // ChangePassword,
    RegistrationSuccessComponent,
    PasswordChangeComponent
  ]
})
export class AccountModule {}
