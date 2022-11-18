import { HTMLElementProps } from '@leafygreen-ui/lib';
import { CommonTypographyProps } from '../types';

export type DescriptionProps = HTMLElementProps<'p'> & CommonTypographyProps & { disabled?: boolean };
