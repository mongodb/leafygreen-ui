import { DarkModeProps, LgIdProps } from '@leafygreen-ui/lib';
import { BaseFontSize } from '@leafygreen-ui/tokens';

export type CommonTypographyProps = DarkModeProps &
  LgIdProps & { elementtiming?: string };

export type ResponsiveTypographyProps = CommonTypographyProps & {
  baseFontSize?: BaseFontSize;
};
