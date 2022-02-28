import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForgotPassword } from './forgotPassword/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './registration/register.component';
import { PasswordChangeComponent } from './passwordChange/password-change.component';
import { VerificationComponent } from './verification/verification-component';
import { RegistrationSuccessComponent } from './registration/registration-success.component';
// import { ChangePassword } from 'app/account/change-password.component';
const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: '',
    redirectTo: 'login',
    // pathMatch: 'full',
  },
  {
    path: '',
    children: [
      {
        path: 'forgot-password',
        component: ForgotPassword,
        data: {
          title: 'Page Forgot Password'
        }
      },
      {
        path: 'login',
        component: LoginComponent,
        data: {
          isLogin: false,
          title: 'Login Page'
        }
      },
      {
        path: 'register',
        component: RegisterComponent,
        data: {
          title: 'Register Page'
        }
      },
      {
        path: 'verification',
        component: VerificationComponent,
        data: {
          title: 'Verification Page'
        }
      },
      {
        path: 'password-change-success',
        component: PasswordChangeComponent,
        data: {
          title: 'Change Password'
        }
      },
      {
        path: 'registration-success',
        component: RegistrationSuccessComponent,
        data: {
          title: 'Page Regisrtation Success'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
