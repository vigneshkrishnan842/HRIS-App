import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TAComponent } from './ta.component';

describe('TAComponent', () => {
  let component: TAComponent;
  let fixture: ComponentFixture<TAComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TAComponent]
    });
    fixture = TestBed.createComponent(TAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
