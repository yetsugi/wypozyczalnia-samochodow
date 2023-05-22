import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListComponent as CarsListComponent } from './list.component';

describe('CarsListComponent', () => {
  let component: CarsListComponent;
  let fixture: ComponentFixture<CarsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarsListComponent],
    });
    fixture = TestBed.createComponent(CarsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
