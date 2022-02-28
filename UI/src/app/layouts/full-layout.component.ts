import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../account/user-service';
declare var $: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './full-layout.component.html'
})
export class FullLayoutComponent implements OnInit {
  userDetails: any[];
  userName: string;
  public loading = false;
  public isPaymentDone: any;
  public companyLogo: string;
  public disabled = false;
  public tokenPayload: string;
  expairyDays: number;
  public status: { isopen: boolean } = { isopen: false };

  constructor(
    private _UserService: UserService,
    private ngZone: NgZone,
    private router: Router
  ) {
    // const token = sessionStorage.getItem('AccessToken');
    // this.tokenPayload = decode(token).typ;
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
    this.router.navigate(['account/login']);
  }
  ngOnInit(): void {
    document.body.scrollTo(100, 200);
    window.scrollTo(0, 0);

    $('.toggle-menu-btn').click(function() {
      $('.left-side-menubar').toggleClass('menu-display');
      $('.left-menubar ul li a .menu-text').toggleClass('show-menu');
      $('.main-container').toggleClass('main-container-compress');
      $('.toggle-menu-btn button .fa-bars').toggleClass('sidebar-action-btn');
      $('.toggle-menu-btn button .fa-times').toggleClass('sidebar-action-btn');
      $('.aside-menu-hidden').toggleClass('aside-menu-fixed');
      $('.sidebar-fixed').toggleClass('sidebar-hidden');
    });
    $('.btn-expand button').click(function() {
      $('.quote-status-box').slideToggle();
    });
    this.userDetails = this.getCurrentUserDetails();
  }
  getCurrentUserDetails() {
    return JSON.parse(sessionStorage.getItem('currentUser'));
  }
}
