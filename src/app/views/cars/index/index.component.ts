import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Observable } from 'rxjs';

import { Car } from 'src/app/models/car';

import { CarService } from 'src/app/services/car.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-cars-index-view',
  templateUrl: './index.component.html',
})
export class IndexComponent implements OnInit, AfterViewInit {
  @ViewChild('view')
  view!: ElementRef;

  cars$!: Observable<Car[]>;

  brandFilterOptions$!: Observable<{ label: string; value: string }[]>;

  availabilityFilterOptions: { label: string; value: boolean }[] = [
    { label: 'Dostępny', value: true },
    { label: 'Niedostępny', value: false },
  ];

  filters: { name: string; value: string | boolean }[] = [];

  constructor(
    private readonly orderService: OrderService,
    private readonly carService: CarService
  ) {}

  ngOnInit(): void {
    this.orderService.clearOrder();

    this.cars$ = this.carService.getCars();
    this.brandFilterOptions$ = this.carService.getBrandOptions();
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.view.nativeElement.classList.add('opacity-100'));
  }

  onBrandFilterOptionChange(e: Event) {
    const $target = e.target as HTMLSelectElement;

    if ($target.value) {
      this.filters.push({ name: 'brand', value: $target.value });
    } else {
      this.filters = this.filters.filter((filter) => filter.name !== 'brand');
    }

    this.cars$ = this.carService.getCars(this.filters);
  }

  onAvailabilityFilterOptionChange(e: Event) {
    const $target = e.target as HTMLSelectElement;

    if ($target.value) {
      this.filters.push({ name: 'available', value: $target.value });
    } else {
      this.filters = this.filters.filter(
        (filter) => filter.name !== 'available'
      );
    }

    this.cars$ = this.carService.getCars(this.filters);
  }
}
