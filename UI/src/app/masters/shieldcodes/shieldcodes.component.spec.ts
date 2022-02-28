import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShieldcodesComponent } from './shieldcodes.component';

describe('ShieldcodesComponent', () => {
  let component: ShieldcodesComponent;
  let fixture: ComponentFixture<ShieldcodesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShieldcodesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShieldcodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
