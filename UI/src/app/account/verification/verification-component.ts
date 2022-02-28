import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Injectable, NgZone, OnInit } from '@angular/core';
import { UserService } from '../user-service';
@Component({
    templateUrl: './verification-component.html'
})
export class VerificationComponent implements OnInit {

    constructor(private _route: Router, private route: ActivatedRoute,
        private _UserService: UserService,
        private ngZone: NgZone) {
    }
    ngOnInit() {
        // tslint:disabl
        const auth: string = this.route.snapshot.queryParams['Auth'];
        this._UserService.Verify(auth).subscribe(res => {
            this.ngZone.run(() => {
            });
        }, err => {
        });
    }
    onClick() {
      const auth: string = this.route.snapshot.queryParams['Auth'];
      this._UserService.CreateTenant(auth).subscribe(res => {
          this.ngZone.run(() => {
          });
      }, err => {
      });
      this._route.navigate(['/account/login']);
        }
}
