import { Theme } from '@leafygreen-ui/lib';
import { BaseFontSize } from '@leafygreen-ui/tokens';

import { type BannerProps, Variant } from '../shared.types';

type BannerIconProps = Pick<BannerProps, 'image'> & {
  theme: Theme;
  baseFontSize: BaseFontSize;
  variant: Variant;
};

export default BannerIconProps;
