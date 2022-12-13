import { toBePolymorphic } from './utils/Polymorphic.testutils';
export {
  type InferredPolymorphicComponentType,
  type InferredPolymorphicProps,
  useInferredPolymorphic,
} from './InferredPolymorphic';
export {
  Polymorph,
  Polymorphic,
  type PolymorphicAs,
  type PolymorphicComponentType,
  type PolymorphicProps,
  type PolymorphicPropsWithRef,
  type PolymorphicRef,
  usePolymorphic,
  usePolymorphicRef,
} from './Polymorphic';

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
