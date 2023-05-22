export interface Car {
  id: number;
  brand: string;
  model: string;
  year: number;
  fuel: 'Hybryda' | 'Diesel' | 'Benzyna';
  enginePower: number;
  mileage: number;
  price: number;
  img: string;
  available: boolean;
}
