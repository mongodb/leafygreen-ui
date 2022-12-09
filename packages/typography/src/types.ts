import { DarkModeProps } from '@leafygreen-ui/lib';
import { BaseFontSize } from '@leafygreen-ui/tokens';

export type CommonTypographyProps = DarkModeProps;

export type ResponsiveTypographyProps = CommonTypographyProps & {
  baseFontSize?: BaseFontSize;
};
