import { BoxProps } from '@leafygreen-ui/box';
import { Either, HTMLElementProps } from '@leafygreen-ui/lib';

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

// Not extending `button` props. Instead using `BoxProps`
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

  /**
   * The component or HTML Element that the button is rendered as.
   */
  as?: React.ElementType<any>;

  /**
   * Sets the tabIndex for IconButton component.
   */
  tabIndex?: HTMLElementProps<'button'>['tabIndex'];
}

type AriaLabels = 'aria-label' | 'aria-labelledby';

export type AccessibleIconButtonProps = BoxProps<
  'button',
  Either<BaseIconButtonProps, AriaLabels>
>;
