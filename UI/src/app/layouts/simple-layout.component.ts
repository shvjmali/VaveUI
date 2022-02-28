import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { UserService } from '../account/user-service';

@Component({
  selector: 'app-dashboards',
  templateUrl: './simple-layout.component.html'
  // template: '<router-outlet></router-outlet>',
})
export class SimpleLayoutComponent implements OnInit {
  companyLogo: any;
  isLogged: boolean;
  isPaymentDone: boolean;
  userName: string;
  public status: { isopen: boolean } = { isopen: false };
  constructor(
    private _UserService: UserService,
    private ngZone: NgZone,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.isLogged = false;
  }

  public toggled(open: boolean): void {
    console.log('Dropdown is now: ', open);
  }

  public toggleDropdown($event: MouseEvent): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.status.isopen = !this.status.isopen;
  }
  LogOut() {
    sessionStorage.clear();
    this.router.navigate(['pages/app-home']);
    this.isLogged = false;
  }
  ngOnInit(): void {
    // const AccessToken = sessionStorage.getItem('AccessToken');
    // if (AccessToken != null) {
    //   this.Get();
    //   this.isLogged = true;
    // } else {
    //   this.isLogged = false;
    // }

    this.router.events.subscribe(s => {
      if (s instanceof NavigationEnd) {
        const tree = this.router.parseUrl(this.router.url);
        if (tree.fragment) {
          const element = document.querySelector('#' + tree.fragment);
          if (element) { element.scrollIntoView(true); }
        }
      }
    });
  }
  Get() {
    const currentUser: any = JSON.parse(sessionStorage.getItem('currentUser'));
    this.userName =
      currentUser.result.user.firstName +
      ' ' +
      currentUser.result.user.lastName;
  }
  onAnchorClick() {
    this.route.fragment.subscribe(f => {
      const element = document.querySelector('#' + f);
      if (element) {
        element.scrollIntoView(true);
      }
    });
  }
}
