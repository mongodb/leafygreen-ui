import { toBePolymorphic } from './utils/Polymorphic.testutils';
export type { InferredPolymorphicProps } from './InferredPolymorphic';
export { useInferredPolymorphic } from './InferredPolymorphic';
export { BasePolymorph,Polymorph } from './Polymorph';
export { Polymorphic } from './Polymorphic';
export {
  getPolymorphicComponent,
  usePolymorphic,
  usePolymorphicRef,
} from './Polymorphic.hooks';
export type {
  PolymorphicAs,
  PolymorphicComponentType,
  PolymorphicProps,
  PolymorphicPropsWithRef,
  PolymorphicRef,
} from './Polymorphic.types';

expect.extend({
  toBePolymorphic,
});

declare global {
  namespace jest {
    interface Matchers<R> {
      toBePolymorphic(): R;
    }
  }
}
