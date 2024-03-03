import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionalHeadComponent } from './regional-head.component';

describe('RegionalHeadComponent', () => {
  let component: RegionalHeadComponent;
  let fixture: ComponentFixture<RegionalHeadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegionalHeadComponent]
    });
    fixture = TestBed.createComponent(RegionalHeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
