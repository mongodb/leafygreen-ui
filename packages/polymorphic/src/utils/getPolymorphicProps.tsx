import isUndefined from 'lodash/isUndefined';

import { AnchorLike } from '../InferredPolymorphic';
import { PolymorphicAs } from '../Polymorphic';

export const getPolymorphicProps = <T extends PolymorphicAs>(
  asProp?: T,
  propsArg?: Record<string, any>,
  defaultAs: PolymorphicAs = 'div',
): {
  as: PolymorphicAs;
  href: string;
} =>
  // | {
  //     as: AnchorLike; // TODO: AnchorLike
  //     href: string;
  //   }
  // | {
  //     as: PolymorphicAs;
  //     href: '';
  //   }
  {
    if (
      !isUndefined(asProp) &&
      !isUndefined(propsArg) &&
      !isUndefined(propsArg?.href)
    ) {
      // TODO: do a better AnchorLike check
      if (asProp !== 'a') {
        return {
          as: 'a' as AnchorLike,
          href: propsArg.href,
        };
      }
    }

    return {
      as: asProp ?? defaultAs,
      href: '',
    };
  };
