import { CarPreviewData } from "@/types/car";

export const cars: CarPreviewData[] = [
  {
    id: '1',
    name: 'Tesla Model 3',
    location: 'Odense',
    price: 50,
    image: 'car-1.jpg',
    availableFrom: '2025-01-01',
    availableTo: '2025-12-31',
  },
  {
    id: '2',
    name: 'BMW X5',
    location: 'Copenhagen',
    price: 70,
    image: 'car-2.jpg',
    availableFrom: '2025-02-01',
    availableTo: '2025-11-30',
  },
  {
    id: '3',
    name: 'Audi A4',
    location: 'Odense',
    price: 60,
    image: 'car-3.jpg',
    availableFrom: '2025-03-01',
    availableTo: '2025-10-31',
  },
  {
    id: '4',
    name: 'Fast car A8',
    location: 'Odense',
    price: 100,
    image: 'car-4.jpg',
    availableFrom: '2025-02-09',
    availableTo: '2025-11-23',
  },
];