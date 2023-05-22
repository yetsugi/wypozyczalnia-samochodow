import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Car } from 'src/app/models/car';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-cars-list',
  templateUrl: './list.component.html',
})
export class ListComponent {
  @Input()
  cars!: Car[];

  constructor(
    private readonly orderService: OrderService,
    private readonly router: Router
  ) {}

  selectCar(car: Car) {
    if (car.available) {
      this.orderService.setCarId(car.id);
      this.router.navigate(['cars/form']);
    }
  }
}
