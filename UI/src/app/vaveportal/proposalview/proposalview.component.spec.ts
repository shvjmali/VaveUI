import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposalViewComponent } from './proposalview.component';

describe('ProposalViewComponent', () => {
  let component: ProposalViewComponent;
  let fixture: ComponentFixture<ProposalViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProposalViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProposalViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});