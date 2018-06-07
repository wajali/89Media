import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HitsDetailsComponent } from './hits-details.component';

describe('HitsDetailsComponent', () => {
  let component: HitsDetailsComponent;
  let fixture: ComponentFixture<HitsDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HitsDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HitsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
