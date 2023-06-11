import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
})
export class SelectComponent {
  @Input()
  label!: string;

  @Input()
  options!: { label: string; value: string | boolean }[];
}
