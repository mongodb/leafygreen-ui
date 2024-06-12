import { PolymorphicAs } from '../Polymorphic';

export const getInferredPolymorphicProps = <
  T extends PolymorphicAs,
  P extends Record<string, any>,
>(
  asProp?: T,
  propsArg?: P,
  defaultAs: PolymorphicAs = 'div',
): {
  as: PolymorphicAs;
  href?: string;
} => {
  if (propsArg?.href) {
    // TODO: do a better AnchorLike check
    return {
      as: 'a',
      href: propsArg.href,
    };
  }

  return {
    as: (asProp ?? defaultAs) as PolymorphicAs,
    href: propsArg?.href,
  };
};
