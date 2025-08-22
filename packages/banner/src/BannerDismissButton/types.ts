import { Theme } from '@leafygreen-ui/lib';
import { BaseFontSize } from '@leafygreen-ui/tokens';

import { type BannerProps, Variant } from '../shared.types';

type BannerDismissButtonProps = Pick<BannerProps, 'onClose' | 'darkMode'> & {
  theme: Theme;
  variant: Variant;
  baseFontSize: BaseFontSize;
};

export default BannerDismissButtonProps;
