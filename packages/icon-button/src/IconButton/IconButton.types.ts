import React from 'react';

import { Either } from '@leafygreen-ui/lib';
import {
  InferredPolymorphicProps,
  PolymorphicAs,
} from '@leafygreen-ui/polymorphic';

export const Size = {
  Default: 'default',
  Large: 'large',
  XLarge: 'xlarge',
} as const;

export type Size = (typeof Size)[keyof typeof Size];

// Since applications can't yet tree-shake, we're duplicating this interface from the types in the namespaces within the Icon package rather than importing the Icon package.
// TODO: Import {IconProps} from '.../icon`
export interface IconProps extends React.SVGProps<SVGSVGElement> {
  glyph: string;
  size?: Size | number;
  title?: string | null | boolean;
}

export interface BaseIconButtonProps {
  className?: string;

  /**
   * The Leafygreen `<Icon />` component to render
   */
  children?: React.ReactNode;

  /**
   * If `true`, the button will be rendered with disabled styles
   */
  disabled?: boolean;

  /**
   * Size of the icon
   */
  size?: Size;

  darkMode?: boolean;

  /**
   * If `true`, the button will be rendered with active styles
   */
  active?: boolean;

  /**
   * The aria-label attribute defines a string value that labels an interactive element.
   *
   * [Mozilla Docs](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label)
   */
  'aria-label'?: string;

  /**
   * The aria-labelledby attribute identifies the element (or elements) that labels the element it is applied to.
   *
   * [Mozilla Docs](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-labelledby)
   */
  'aria-labelledby'?: string;

  /**
   * Callback fired on click
   */
  onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;

  /**
   * Sets the tabIndex for IconButton component.
   */
  tabIndex?: React.ComponentProps<'button'>['tabIndex'];
}

type AriaLabels = 'aria-label' | 'aria-labelledby';

export type AccessibleIconButtonProps = Either<BaseIconButtonProps, AriaLabels>;

// External only
export type IconButtonProps<TAsProp extends PolymorphicAs = 'button'> =
  InferredPolymorphicProps<TAsProp, AccessibleIconButtonProps>;
