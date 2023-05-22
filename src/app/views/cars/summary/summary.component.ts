import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
})
export class SummaryComponent {
  car?: Car;
  car$?: Subscription;

  constructor(
    private readonly orderService: OrderService,
    private readonly carService: CarService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    const order = this.orderService.getOrder();
    this.orderService.removeOrder();

    if (!order) {
      this.router.navigate(['404'], { skipLocationChange: true });
      return;
    }

    this.car$ = this.carService
      .getCarById(order.carId!)
      .subscribe((car) => (this.car = car));
  }

  ngOnDestroy(): void {
    this.car$?.unsubscribe();
  }
}
