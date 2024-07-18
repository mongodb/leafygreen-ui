import { Only } from './Only.types';
import { ValuesOf } from './ValuesOf.types';
/**
 * Constructs a discriminated union from type `T`
 * in which only one property can be defined in a single instance.
 */
export type ExclusiveUnion<T> = ValuesOf<{
  [K in keyof T]: Only<T, K>;
}>;
