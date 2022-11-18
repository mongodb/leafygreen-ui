import { HTMLElementProps, OneOf } from '@leafygreen-ui/lib';
import { CommonTypographyProps } from '../types';

export type InlineCodeProps = OneOf<
    HTMLElementProps<'code'>,
    HTMLElementProps<'a'>
> &
    CommonTypographyProps;
