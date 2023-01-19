export type HueName =
  | 'white'
  | 'black'
  | 'gray'
  | 'green'
  | 'purple'
  | 'blue'
  | 'yellow'
  | 'red';

export interface Hue {
  dark4?: string;
  dark3?: string;
  dark2?: string;
  dark1?: string;
  base: string;
  light1?: string;
  light2?: string;
  light3?: string;
}
