import { Theme } from '@leafygreen-ui/lib';
import { BaseFontSize } from '@leafygreen-ui/tokens';
import { Variant, BannerProps } from '../types';

type BannerDismissButtonProps = Pick<BannerProps, 'onClose' | 'darkMode'> & {
  theme: Theme;
  variant: Variant;
  baseFontSize: BaseFontSize;
};

export default BannerDismissButtonProps;
