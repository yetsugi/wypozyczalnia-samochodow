import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-cars-index-view',
  templateUrl: './index.component.html',
})
export class IndexComponent implements OnInit, OnDestroy {
  cars!: Car[];
  getCars$!: Subscription;

  constructor(
    private readonly orderService: OrderService,
    private readonly carService: CarService
  ) {}

  ngOnInit(): void {
    this.orderService.removeOrder();

    this.getCars$ = this.carService
      .getCars()
      .subscribe((cars) => (this.cars = cars));
  }

  ngOnDestroy(): void {
    this.getCars$.unsubscribe();
  }
}
