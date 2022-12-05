export { Polymorph, BasePolymorph } from './Polymorph';
export { Polymorphic } from './Polymorphic';

export {
  usePolymorphicRef,
  usePolymorphicComponent,
  usePolymorphic,
} from './Polymorphic.hooks';

export type {
  PolymorphicAs,
  PolymorphicProps,
  PolymorphicPropsWithRef,
  PolymorphicRef,
  PolymorphicComponentType,
} from './Polymorphic.types';

export { useInferredPolymorphic } from './InferredPolymorphic';

export type { InferredPolymorphicProps } from './InferredPolymorphic';

declare global {
  namespace jest {
    interface Matchers<R> {
      toBePolymorphic(): R;
    }
  }
}
