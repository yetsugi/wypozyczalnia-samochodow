import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
})
export class IndexComponent implements OnInit, OnDestroy {
  cars!: Car[];
  getCars$!: Subscription;

  constructor(private readonly carService: CarService) {}

  ngOnInit(): void {
    this.getCars$ = this.carService
      .getCars()
      .subscribe((cars) => (this.cars = cars));
  }

  ngOnDestroy(): void {
    this.getCars$.unsubscribe();
  }
}
