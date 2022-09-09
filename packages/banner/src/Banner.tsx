import React from 'react';
import PropTypes from 'prop-types';
import XIcon from '@leafygreen-ui/icon/dist/X';
import { cx } from '@leafygreen-ui/emotion';
import IconButton from '@leafygreen-ui/icon-button';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { BaseFontSize } from '@leafygreen-ui/tokens';
import {
  useUpdatedBaseFontSize,
  bodyTypeScaleStyles,
} from '@leafygreen-ui/typography';
import { BannerProps, Variant } from './types';
import {
  bannerIconPositionStyles,
  bannerVariantStyles,
  baseBannerStyles,
  dismissibleIconStyles,
  getTextStyle,
  iconStyles,
  map,
  renderedImageStyles,
  bannerDismissibleStyles,
} from './styles';

/**
 *
 * Banners remain until dismissed by the user, or if the state, which caused the banner is resolved. They are usually contextual to the product or task. For guidelines on when to use Banners, refer to our [design guidelines](https://www.mongodb.design/component/banner/guidelines/).
 *
 * @param props.variant Sets the variant for the Banner.
 * @param props.image Illustration that will replace default Icon when the prop is supplied.
 * @param props.dismissible Determines whether or not the Banner is dismissible.
 * @param props.onClose Callback fired when dismiss button is clicked.
 * @param props.darkMode Determines whether or not the component will be rendered in dark mode.
 * @param props.baseFontSize The base font size of the title and text rendered in children.
 */
export default function Banner({
  variant = Variant.Info,
  dismissible = false,
  onClose = () => {},
  image,
  children,
  className,
  darkMode: darkModeProp,
  baseFontSize: baseFontSizeProp,
  ...rest
}: BannerProps) {
  const { theme, darkMode } = useDarkMode(darkModeProp);
  const baseFontSize = useUpdatedBaseFontSize(baseFontSizeProp);
  const { icon: Icon, color } = map[theme][variant];

  const renderIcon = image ? (
    React.cloneElement(image, {
      className: renderedImageStyles,
    })
  ) : (
    <Icon
      fill={color}
      className={cx(iconStyles, bannerIconPositionStyles[baseFontSize])}
    />
  );

  return (
    <div
      role="alert"
      className={cx(
        baseBannerStyles,
        bodyTypeScaleStyles[baseFontSize],
        bannerVariantStyles[theme][variant].body,
        {
          [bannerDismissibleStyles]: dismissible,
        },
        className,
      )}
      {...rest}
    >
      {renderIcon}
      <div className={getTextStyle(image != null, dismissible)}>{children}</div>
      {dismissible && (
        <IconButton
          className={cx(
            dismissibleIconStyles,
            bannerVariantStyles[theme][variant].dismissButton,
          )}
          aria-label="Close Message"
          onClick={onClose}
          darkMode={darkMode}
        >
          <XIcon />
        </IconButton>
      )}
    </div>
  );
}

Banner.displayName = 'Banner';

Banner.propTypes = {
  darkMode: PropTypes.bool,
  variant: PropTypes.oneOf(Object.values(Variant)),
  onClose: PropTypes.func,
  dismissable: PropTypes.bool,
  image: PropTypes.element,
  baseFontSize: PropTypes.oneOf(Object.values(BaseFontSize)),
};
