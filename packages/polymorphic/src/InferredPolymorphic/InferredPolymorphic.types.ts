import { AnchorProps, PolymorphicComponentType } from '../Polymorphic.types';

/**
 * Wrapping props in this type ensures that if `href` is defined,
 * the `as` type is set to `'a'`, and all anchor props are accepted
 */
export type InferredPolymorphicProps<P = {}> =
  | (P & {
      href: string;
      as?: 'a';
    } & AnchorProps)
  | P;

/**
 * An extension of `PolymorphicComponentType` that wraps additional props in `InferredPolymorphicProps`
 */
export type InferredPolymorphicComponentType<XP = {}> =
  PolymorphicComponentType<InferredPolymorphicProps<XP>>;
