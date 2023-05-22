import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Car } from 'src/app/models/car';

import { CarService } from 'src/app/services/car.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
})
export class FormComponent implements OnInit, OnDestroy {
  car?: Car;
  car$?: Subscription;

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
  });
  orderForm$?: Subscription;

  constructor(
    private readonly orderService: OrderService,
    private readonly carService: CarService,
    private readonly router: Router,
    private readonly formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    const order = this.orderService.getOrder();

    if (!order) {
      this.router.navigate(['404'], { skipLocationChange: true });
      return;
    }

    this.car$ = this.carService
      .getCarById(order.carId!)
      .subscribe((car) => (this.car = car));

    this.orderForm.setValue({
      fullName: order.fullName ?? null,
      phoneNumber: order.phoneNumber ?? null,
      email: order.email ?? null,
      paymentMethod: order.paymentMethod ?? null,
    });

    this.orderForm$ = this.orderForm.valueChanges.subscribe((form) =>
      this.orderService.saveOrder({
        carId: order.carId,
        fullName: form.fullName,
        phoneNumber: form.phoneNumber,
        email: form.email,
        paymentMethod: form.paymentMethod,
      })
    );
  }

  ngOnDestroy(): void {
    this.car$?.unsubscribe();
    this.orderForm$?.unsubscribe();
  }
}
