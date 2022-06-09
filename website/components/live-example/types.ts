export interface SelectConfigInterface<T> {
  type: 'select';
  options: Array<T | undefined>;
  default: T;
  isRequired?: boolean;
  label: string;
  shouldDisable?: (props: any) => boolean;
}

export interface BooleanConfigInterface {
  type: 'boolean';
  options?: undefined;
  default: boolean;
  label: string;
}

export interface NumberConfigInterface {
  type: 'number';
  options?: undefined;
  default: number;
  label: string;
  min?: number;
  max?: number;
  step?: number;
}

export interface TextConfigInterface {
  type: 'text';
  options?: undefined;
  default: string;
  label: string;
}

export interface AreaConfigInterface {
  type: 'area';
  options?: undefined;
  default: string;
  label: string;
}

export type PropsType<T = string> =
  | BooleanConfigInterface
  | NumberConfigInterface
  | TextConfigInterface
  | AreaConfigInterface
  | SelectConfigInterface<T>;

export interface NewLiveExampleInterface {
  Meta: any;
  StoryFn: any;
}
