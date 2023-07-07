import React from 'react';

import { cx } from '@leafygreen-ui/emotion';
import CheckmarkWithCircleIcon from '@leafygreen-ui/icon/dist/CheckmarkWithCircle';
import ImportantWithCircleIcon from '@leafygreen-ui/icon/dist/ImportantWithCircle';
import InfoWithCircleIcon from '@leafygreen-ui/icon/dist/InfoWithCircle';
import WarningIcon from '@leafygreen-ui/icon/dist/Warning';

import { Variant } from '../Banner/types';

import {
  bannerIconPositionStyles,
  baseStyles,
  renderedImageStyles,
  themeStyles,
} from './styles';
import BannerIconProps from './types';

const Icons: Record<
  Variant,
  React.ComponentType<React.PropsWithChildren<any>>
> = {
  [Variant.Info]: InfoWithCircleIcon,
  [Variant.Warning]: ImportantWithCircleIcon,
  [Variant.Danger]: WarningIcon,
  [Variant.Success]: CheckmarkWithCircleIcon,
};

/**
 * @internal
 */
const BannerIcon = ({
  image,
  baseFontSize,
  variant,
  theme,
}: BannerIconProps) => {
  const Icon = Icons[variant];

  if (image) {
    return React.cloneElement(image, {
      className: renderedImageStyles,
    });
  } else {
    return (
      <Icon
        className={cx(
          baseStyles,
          themeStyles[theme][variant],
          bannerIconPositionStyles[baseFontSize],
        )}
      />
    );
  }
};

export default BannerIcon;
