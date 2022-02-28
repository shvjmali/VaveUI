import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwistcodesComponent } from './twistcodes.component';

describe('TwistcodesComponent', () => {
  let component: TwistcodesComponent;
  let fixture: ComponentFixture<TwistcodesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwistcodesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwistcodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
