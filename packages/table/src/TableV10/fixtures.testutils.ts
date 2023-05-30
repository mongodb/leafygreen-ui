import { faker } from '@faker-js/faker';
const SEED = 0;
faker.seed(SEED);

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface testTableDataShape {
  name: string;
  age: number;
  color: string;
  location: string;
  rand: number;
  disabled?: boolean;
  expandable?: boolean;
}

export const defaultData: Array<testTableDataShape> = [
  {
    name: 'Alice',
    age: 19,
    color: 'blue',
    location: 'bedford',
    rand: faker.number.float({ precision: 0.001 }),
  },
  {
    name: 'Brooke',
    age: 20,
    color: 'green',
    location: 'bedford',
    rand: faker.number.float({ precision: 0.001 }),
  },
  {
    name: 'Charlotte',
    age: 21,
    color: 'white',
    location: 'bedford',
    rand: faker.number.float({ precision: 0.001 }),
    disabled: true,
  },
  {
    name: 'Donna',
    age: 22,
    color: 'green',
    location: 'bedford',
    rand: faker.number.float({ precision: 0.001 }),
  },
  {
    name: 'Emma',
    age: 23,
    color: 'white',
    location: 'bedford',
    rand: faker.number.float({ precision: 0.001 }),
    expandable: true,
  },
  {
    name: 'Georgia',
    age: 24,
    color: 'white',
    location: 'bedford',
    rand: faker.number.float({ precision: 0.001 }),
    expandable: true,
  },
  {
    name: 'Frannie',
    age: 29,
    color: 'green',
    location: 'bedford',
    rand: faker.number.float({ precision: 0.001 }),
    expandable: true,
  },
  {
    name: 'Iman',
    age: 26,
    color: 'white',
    location: 'bedford',
    rand: faker.number.float({ precision: 0.001 }),
    expandable: true,
  },
  {
    name: 'Hannah',
    age: 27,
    color: 'green',
    location: 'bedford',
    rand: faker.number.float({ precision: 0.001 }),
    expandable: true,
  },
  {
    name: 'Jill',
    age: 28,
    color: 'green',
    location: 'bedford',
    rand: faker.number.float({ precision: 0.001 }),
    expandable: true,
  },
  {
    name: 'Karen',
    age: 31,
    color: 'orange',
    location: 'bedford',
    rand: faker.number.float({ precision: 0.001 }),
    expandable: true,
  },
  {
    name: 'Lilly',
    age: 32,
    color: 'pink',
    location: 'bedford',
    rand: faker.number.float({ precision: 0.001 }),
    expandable: true,
  },
  {
    name: 'Monica',
    age: 33,
    color: 'green',
    location: 'bedford',
    rand: faker.number.float({ precision: 0.001 }),
    expandable: true,
  },
  {
    name: 'Nicole',
    age: 35,
    color: 'green',
    location: 'bedford',
    rand: faker.number.float({ precision: 0.001 }),
    expandable: true,
  },
  {
    name: 'Ophelia',
    age: 34,
    color: 'lavender',
    location: 'bedford',
    rand: faker.number.float({ precision: 0.001 }),
    expandable: true,
  },
  {
    name: 'Penelope',
    age: 30,
    color: 'perrywinkle',
    location: 'bedford',
    rand: faker.number.float({ precision: 0.001 }),
    expandable: true,
  },
  {
    name: 'Queen',
    age: 36,
    color: 'gold',
    location: 'bedford',
    rand: faker.number.float({ precision: 0.001 }),
    expandable: true,
  },
  {
    name: 'Rachel',
    age: 39,
    color: 'orange',
    location: 'bedford',
    rand: faker.number.float({ precision: 0.001 }),
    expandable: true,
  },
  {
    name: 'Sarah',
    age: 40,
    color: 'navy',
    location: 'bedford',
    rand: faker.number.float({ precision: 0.001 }),
    expandable: true,
  },
  {
    name: 'Tina',
    age: 44,
    color: 'cyan',
    location: 'bedford',
    rand: faker.number.float({ precision: 0.001 }),
    expandable: true,
  },
  {
    name: 'Ursula',
    age: 45,
    color: 'purple',
    location: 'bedford',
    rand: faker.number.float({ precision: 0.001 }),
    expandable: true,
  },
  {
    name: 'Violet',
    age: 49,
    color: 'violet',
    location: 'bedford',
    rand: faker.number.float({ precision: 0.001 }),
    expandable: true,
  },
  {
    name: 'Wendy',
    age: 54,
    color: 'blue',
    location: 'bedford',
    rand: faker.number.float({ precision: 0.001 }),
    expandable: true,
  },
  {
    name: 'Ximena',
    age: 48,
    color: 'green',
    location: 'bedford',
    rand: faker.number.float({ precision: 0.001 }),
    expandable: true,
  },
  {
    name: 'Yvonne',
    age: 51,
    color: 'pink',
    location: 'bedford',
    rand: faker.number.float({ precision: 0.001 }),
    expandable: true,
  },
  {
    name: 'Zara',
    age: 48,
    color: 'green',
    location: 'bedford',
    rand: faker.number.float({ precision: 0.001 }),
    expandable: true,
  },
];

export const multiRowData = [
  { flavor: 'Chocolate', price: '$8.00' },
  { flavor: 'Vanilla', price: '$4.00' },
  { flavor: 'Funfetti', price: '$6.00' },
  { price: '$3.00' },
];
