import { OrderFormData } from './order-form-data';

export interface Order {
  id?: number;
  carId?: number;
  formData?: OrderFormData;
  totalPrice?: number;
}
