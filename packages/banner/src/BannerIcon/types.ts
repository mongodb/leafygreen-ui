import { Theme } from '@leafygreen-ui/lib';
import { BaseFontSize } from '@leafygreen-ui/tokens';
import { Variant } from '..';
import { BannerProps } from '../types';

type BannerIconProps = Pick<BannerProps, 'image'> & {
  theme: Theme;
  baseFontSize: BaseFontSize;
  variant: Variant;
};

export default BannerIconProps;
