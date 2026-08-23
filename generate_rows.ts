
import { CARS } from './src/lib/catalog-data';

const rows = CARS.map(car => {
  return [car.brand, car.title, '', '', ''].join('\t');
});

console.log('Brand\tModel\tMain Image\tCarousel 1\tCarousel 2');
console.log(rows.join('\n'));
