import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription, delay, forkJoin } from 'rxjs';

import { FlatpickrDefaultsInterface } from 'angularx-flatpickr';
import { Polish } from 'flatpickr/dist/l10n/pl.js';

import { Car } from 'src/app/models/car';
import { OrderFormData } from 'src/app/models/order-form-data';

import { CarService } from 'src/app/services/car.service';
import { OrderService } from 'src/app/services/order.service';

import { nowAddDaysFormatted } from 'src/app/utils';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
})
export class FormComponent implements OnInit, OnDestroy {
  car?: Car;
  totalPrice: number = 0;

  carSub!: Subscription;
  orderFormValueChangesSub!: Subscription;
  orderFormPostOrderSub?: Subscription;

  datePickerOptions: FlatpickrDefaultsInterface = {
    locale: Polish,
    minDate: nowAddDaysFormatted(1),
    maxDate: nowAddDaysFormatted(15),
    dateFormat: 'd-m-Y',
    inline: true,
    mode: 'range',
  };

  orderForm = this.formBuilder.group({
    fullName: [
      '',
      [
        Validators.required,
        Validators.pattern('[a-zą-żA-ZĄ-Ż]+\\s[a-zą-żA-ZĄ-Ż]+'),
      ],
    ],
    phoneNumber: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    paymentMethod: ['', [Validators.required]],
    dateRange: ['', [Validators.required]],
  });

  constructor(
    private readonly orderService: OrderService,
    private readonly carService: CarService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    const order = this.orderService.getOrder()!;

    this.carSub = this.carService
      .getCarById(order.carId!)
      .subscribe((car) => (this.car = car));

    if (order.formData) {
      this.restoreFormData(order.formData);

      this.totalPrice = order.totalPrice ?? 0;
    }

    this.orderFormValueChangesSub = this.saveFormLocallyOnValueChanges();
  }

  ngOnDestroy(): void {
    this.orderFormValueChangesSub.unsubscribe();

    this.orderFormPostOrderSub?.unsubscribe();
  }

  onSubmit(): void {
    const order = this.orderService.getOrder()!;

    this.orderFormPostOrderSub = forkJoin({
      order: this.orderService.postOrder(),
      car: this.carService.markCarAsUnavailable(order.carId!),
    })
      .pipe(delay(500))
      .subscribe(() => this.router.navigate(['cars/summary']));
  }

  onDateRangeChange(e: {
    selectedDates: Date[];
    dateString: string;
    instance: any;
  }): void {
    const rentDays = this.calculateRentDays(e.selectedDates);

    this.totalPrice = this.car!.price * rentDays;

    this.orderService.setTotalPrice(this.totalPrice);
  }

  private restoreFormData(orderFormData: OrderFormData): void {
    this.orderForm.setValue({
      fullName: orderFormData.fullName,
      phoneNumber: orderFormData.phoneNumber,
      email: orderFormData.email,
      paymentMethod: orderFormData.paymentMethod,
      dateRange: orderFormData.dateRange,
    });

    this.orderForm.markAllAsTouched();
  }

  private saveFormLocallyOnValueChanges(): Subscription {
    return this.orderForm.valueChanges.subscribe((form) => {
      this.orderService.setFormData({
        fullName: form.fullName ?? '',
        phoneNumber: form.phoneNumber ?? '',
        email: form.email ?? '',
        paymentMethod: form.paymentMethod ?? '',
        dateRange: form.dateRange ?? '',
      });
    });
  }

  private calculateRentDays(dates: Date[]): number {
    if (dates.length === 1) {
      return 1;
    }

    return (
      Math.floor(
        (dates[1].getTime() - dates[0].getTime()) / (1000 * 60 * 60 * 24)
      ) + 1
    );
  }
}
