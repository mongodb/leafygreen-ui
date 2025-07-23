import { Theme } from '@leafygreen-ui/lib';
import { BaseFontSize } from '@leafygreen-ui/tokens';

import { BannerProps, Variant } from '../Banner/types';

type BannerIconProps = Pick<BannerProps, 'image'> & {
  theme: Theme;
  baseFontSize: BaseFontSize;
  variant: Variant;
};

export default BannerIconProps;
