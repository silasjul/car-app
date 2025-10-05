import { z } from 'zod';

export const Car = z.object({
  id: z.string(),
  name: z.string(),
  location: z.string(),
  price: z.number(),
  image: z.string(),
  availableFrom: z.date(),
  availableTo: z.date(),
  description: z.string(),
  features: z.array(z.string()),
  mileage: z.number(),
  fuelType: z.string(),
  transmission: z.string(),
});