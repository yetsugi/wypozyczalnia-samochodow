import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Car } from 'src/app/models/car';

import { CarService } from 'src/app/services/car.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
})
export class SummaryComponent implements OnInit {
  car$!: Observable<Car>;

  constructor(
    private readonly orderService: OrderService,
    private readonly carService: CarService
  ) {}

  ngOnInit(): void {
    const order = this.orderService.getOrder()!;

    this.car$ = this.carService.getCarById(order.carId!);
  }
}
