export interface CarPreviewData {
  id: string;
  name: string;
  location: string;
  price: number;
  image: string;
  availableFrom: string;
  availableTo: string;
}

export interface CarDetailsData extends CarPreviewData {
  description: string;
  features: string[];
  mileage: number;
  fuelType: string;
  transmission: string;
}