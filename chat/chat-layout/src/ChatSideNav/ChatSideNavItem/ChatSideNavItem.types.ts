import {
  InferredPolymorphicProps,
  PolymorphicAs,
} from '@leafygreen-ui/polymorphic';

export interface BaseChatSideNavItemProps {
  /**
   * Whether or not the component should be rendered in an active state.
   *
   * @default false
   */
  active?: boolean;
}

// External only
export type ChatSideNavItemProps<TAsProp extends PolymorphicAs = 'a'> =
  InferredPolymorphicProps<TAsProp, BaseChatSideNavItemProps>;
