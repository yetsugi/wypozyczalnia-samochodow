import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { Car } from 'src/app/models/car';
import { OrderFormData } from 'src/app/models/order-form-data';

import { CarService } from 'src/app/services/car.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
})
export class FormComponent implements OnInit, OnDestroy {
  car$!: Observable<Car>;

  orderFormValueChanges$!: Subscription;
  orderFormPostOrder$?: Subscription;

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

  constructor(
    private readonly orderService: OrderService,
    private readonly carService: CarService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    const order = this.orderService.getOrder()!;

    this.car$ = this.carService.getCarById(order.carId!);

    if (order.formData) {
      this.restoreFormData(order.formData);
    }

    this.orderFormValueChanges$ = this.saveFormLocallyOnValueChanges();
  }

  ngOnDestroy(): void {
    this.orderFormValueChanges$.unsubscribe();

    this.orderFormPostOrder$?.unsubscribe();
  }

  onSubmit(): void {
    this.orderFormPostOrder$ = this.orderService
      .postOrder()
      .subscribe(() => this.router.navigate(['cars/summary']));
  }

  private restoreFormData(orderFormData: OrderFormData): void {
    this.orderForm.setValue({
      fullName: orderFormData.fullName,
      phoneNumber: orderFormData.phoneNumber,
      email: orderFormData.email,
      paymentMethod: orderFormData.paymentMethod,
    });
  }

  private saveFormLocallyOnValueChanges(): Subscription {
    return this.orderForm.valueChanges.subscribe((form) => {
      this.orderService.setFormData({
        fullName: form.fullName ?? '',
        phoneNumber: form.phoneNumber ?? '',
        email: form.email ?? '',
        paymentMethod: form.paymentMethod ?? '',
      });
    });
  }
}
