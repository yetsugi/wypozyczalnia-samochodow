import { Component, Input } from '@angular/core';
import { Car } from 'src/app/models/car';

@Component({
  selector: 'app-cars-list',
  templateUrl: './list.component.html',
})
export class ListComponent {
  @Input()
  cars!: Car[];
}
