import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementdComponent } from './managementd.component';

describe('ManagementdComponent', () => {
  let component: ManagementdComponent;
  let fixture: ComponentFixture<ManagementdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagementdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});