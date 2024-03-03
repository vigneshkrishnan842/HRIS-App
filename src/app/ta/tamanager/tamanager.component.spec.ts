import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TAManagerComponent } from './tamanager.component';

describe('TAManagerComponent', () => {
  let component: TAManagerComponent;
  let fixture: ComponentFixture<TAManagerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TAManagerComponent]
    });
    fixture = TestBed.createComponent(TAManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
