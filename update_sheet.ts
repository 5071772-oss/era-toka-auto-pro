import { CARS } from "./src/lib/catalog-data";

const values = [
  ["Brand", "Model", "Main Image", "Carousel 1", "Carousel 2"],
  ...CARS.map(car => [car.brand, car.title, "", "", ""])
];

console.log(JSON.stringify({ values }));
