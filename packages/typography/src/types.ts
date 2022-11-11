import { DarkModeProps, HTMLElementProps } from '@leafygreen-ui/lib';

export type CommonTypographyProps = DarkModeProps;

export type TypographyProps<TElement extends keyof JSX.IntrinsicElements> =
  CommonTypographyProps &
    HTMLElementProps<TElement> & {
      as: TElement;
    };
