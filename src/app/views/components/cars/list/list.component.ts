import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { Car } from 'src/app/models/car';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-cars-list',
  templateUrl: './list.component.html',
})
export class ListComponent implements AfterViewInit {
  @Input()
  cars!: Car[];

  @ViewChild('component')
  component!: ElementRef;

  constructor(
    private readonly orderService: OrderService,
    private readonly router: Router
  ) {}

  ngAfterViewInit(): void {
    this.component.nativeElement.classList.add('opacity-0');

    setTimeout(() => this.component.nativeElement.classList.add('opacity-100'));
  }

  selectCar(car: Car) {
    if (car.available) {
      this.orderService.setCarId(car.id);
      this.router.navigate(['cars/form']);
    }
  }
}
