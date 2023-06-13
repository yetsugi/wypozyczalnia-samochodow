import { Component, Input } from '@angular/core';
import { Car } from 'src/app/models/car';

@Component({
  selector: 'app-cars-info',
  templateUrl: './info.component.html',
})
export class InfoComponent {
  @Input()
  car!: Car;

  @Input()
  showAvailability: boolean = true;
}
