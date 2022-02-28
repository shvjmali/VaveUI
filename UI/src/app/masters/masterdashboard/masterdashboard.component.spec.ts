import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterdashboardComponent } from './masterdashboard.component';

describe('MasterdashboardComponent', () => {
  let component: MasterdashboardComponent;
  let fixture: ComponentFixture<MasterdashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterdashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
