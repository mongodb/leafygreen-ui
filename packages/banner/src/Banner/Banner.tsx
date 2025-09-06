import React, { forwardRef } from 'react';

import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { BaseFontSize } from '@leafygreen-ui/tokens';
import { useUpdatedBaseFontSize } from '@leafygreen-ui/typography';

import BannerDismissButton from '../BannerDismissButton';
import BannerIcon from '../BannerIcon';
import { BannerProps, Variant } from '../shared.types';

import { getBannerStyles, getChildrenContainerStyles } from './Banner.styles';

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
const Banner = forwardRef<HTMLDivElement, BannerProps>(
  (
    {
      variant = Variant.Info,
      dismissible = false,
      onClose = () => {},
      image,
      children,
      className,
      darkMode: darkModeProp,
      baseFontSize: baseFontSizeProp,
      ...rest
    },
    ref,
  ) => {
    const { theme, darkMode } = useDarkMode(darkModeProp);
    const baseFontSize: BaseFontSize = useUpdatedBaseFontSize(baseFontSizeProp);

    return (
      <div
        role="alert"
        ref={ref}
        className={getBannerStyles({
          baseFontSize,
          className,
          dismissible,
          theme,
          variant,
        })}
        {...rest}
      >
        <BannerIcon
          image={image}
          theme={theme}
          baseFontSize={baseFontSize}
          variant={variant}
        />
        <div
          className={getChildrenContainerStyles({
            dismissible,
            hasImage: image !== null,
          })}
        >
          {children}
        </div>
        {dismissible && (
          <BannerDismissButton
            theme={theme}
            baseFontSize={baseFontSize}
            variant={variant}
            onClose={onClose}
            darkMode={darkMode}
          />
        )}
      </div>
    );
  },
);

export default Banner;

Banner.displayName = 'Banner';
