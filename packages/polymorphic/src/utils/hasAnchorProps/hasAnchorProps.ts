import has from 'lodash/has';

import { PartialRequired } from '@leafygreen-ui/lib';

import { PolymorphicAs, PolymorphicProps } from '../../Polymorphic';

/**
 * A type guard asserting that the provided `as` prop and rest props
 * satisfy the intrinsic attributes of an anchor (`<a>`) element
 */
export const hasAnchorProps = <TProps extends any>(
  as?: PolymorphicAs,
  props?: TProps,
): props is PartialRequired<PolymorphicProps<'a'>, 'href'> & TProps => {
  return as === 'a' && has(props, 'href');
};
