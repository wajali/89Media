import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HitsListComponent } from './hits-list.component';

describe('HitsListComponent', () => {
  let component: HitsListComponent;
  let fixture: ComponentFixture<HitsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HitsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HitsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
