import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Car } from 'src/app/models/car';

import { CarService } from 'src/app/services/car.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-cars-index-view',
  templateUrl: './index.component.html',
})
export class IndexComponent implements OnInit {
  cars$!: Observable<Car[]>;

  constructor(
    private readonly orderService: OrderService,
    private readonly carService: CarService
  ) {}

  ngOnInit(): void {
    this.orderService.clearOrder();

    this.cars$ = this.carService.getCars();
  }
}
