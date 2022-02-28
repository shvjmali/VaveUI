import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Injectable, NgZone, OnInit } from '@angular/core';
@Component({
    templateUrl: './password-change.component.html'
})
export class PasswordChangeComponent implements OnInit {

    constructor(private route: ActivatedRoute) {
    }
    ngOnInit() {
    }
}
