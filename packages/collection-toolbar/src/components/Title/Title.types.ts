import { DarkModeProps } from '@leafygreen-ui/lib';
import { H3Props } from '@leafygreen-ui/typography';

export interface TitleProps extends Omit<H3Props, keyof DarkModeProps> {}
