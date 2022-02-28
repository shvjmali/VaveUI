import { Component, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../user-service';
import { Constants } from '../../_shared/constant';
@Component({
  // tslint:disable-next-line:quotemark
  templateUrl: "./login.component.html"
})
export class LoginComponent {
  public loading = false;
  [x: string]: any;
  userName: string;
  password: string;
  constants: any;
  constructor(
    private _route: Router,
    private _UserService: UserService,
    private ngZone: NgZone,
    private route: ActivatedRoute
  ) {
    this.constants = Constants;
    window.scrollTo(0, 0);
  }

  // login(isValid: boolean) {
  //   this._route.navigate(['/dashboard']);
  // }

  //  -----------Delete above login code & Un comment the below code and use the below uncommentted code

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit(): void {
    this.userName = this.route.snapshot.queryParams['id'];
    this.userName = atob(this.userName);
    this.login(true);
  }

  login(isValid: boolean) {
    // this._route.navigate(['/dashboard']);
    if (isValid) {
      this.loading = true;
      this._UserService.Login(this.userName).subscribe(
        res => {
          this.loading = false;
          this.ngZone.run(() => {
            if (res) {
              sessionStorage.setItem('currentUser', JSON.stringify(res.result));
              sessionStorage.setItem('AccessToken', res.token.result.value);
              //localStorage.setItem('currentUser', JSON.stringify(res.result));
              //localStorage.setItem('AccessToken', res.token.result.value);
            } else {
              window.location.href = 'http://10.25.1.133/WORKFLOWS/Pages/default.aspx';
         }
            this.currentUser = JSON.parse(
              sessionStorage.getItem('currentUser')
              //localStorage.getItem('currentUser')
            );
            if (this.currentUser.length === null) {
              this.childModal.show();
            } else {
              this.selectedUserRole = this.currentUser[0];
              if (this.selectedUserRole.role_Code === 'APP_ADMIN') {
                this._route.navigate(['/access-permission/admin']);
              } else if(this.selectedUserRole.role_Code === 'SUPER_ADMIN'){
                this._route.navigate(['/masters-add/mytask']);
              } else if(this.selectedUserRole.role_Code === 'USER'){
                this._route.navigate(['/home/Hdashboard']);
              }else{
                this._route.navigate(['/account/login']);
              }
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

  SelectUserRole(selectedUserRole) {
    this.currentUser = new Array();
    this.currentUser.push(selectedUserRole);
    sessionStorage.setItem('currentUser', JSON.stringify(this.currentUser));
    //localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
    if (this.currentUser[0].role_Code === 'APP_ADMIN') {
      this._route.navigate(['/access-permission/dashboard']);
    } else {
      this._route.navigate(['/dashboard']);
    }
  }
}