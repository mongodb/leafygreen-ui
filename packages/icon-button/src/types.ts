import { Either } from '@leafygreen-ui/lib';

export const Size = {
  Default: 'default',
  Large: 'large',
  XLarge: 'xlarge',
} as const;

export type Size = typeof Size[keyof typeof Size];

// Since applications can't yet tree-shake, we're duplicating this interface from the types in the namespaces within the Icon package rather than importing the Icon package.
export interface IconProps extends React.SVGProps<SVGSVGElement> {
  glyph: string;
  size?: Size | number;
  title?: string | null | boolean;
}

export interface BaseIconButtonProps
  extends React.HTMLAttributes<HTMLButtonElement | HTMLAnchorElement> {
  className?: string;
  children?: React.ReactNode;
  /**
   * If `true`, the button will be rendered with disabled styles
   */
  disabled?: boolean;
  /**
   * Size of tehe icon
   */
  size?: Size;
  darkMode?: boolean;
  /**
   * If `true`, the button will be rendered with active styles
   */
  active?: boolean;
  /**
   * `href` property for the button. If this value is set, the IconButton will be rendered with an anchor tag.
   */
  href?: string;
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
}

type AriaLabels = 'aria-label' | 'aria-labelledby';

export type AccessibleIconButtonProps = Either<BaseIconButtonProps, AriaLabels>;
