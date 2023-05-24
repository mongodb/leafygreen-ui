import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';

import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { Body } from '@leafygreen-ui/typography';

import animationJson from './animation.json';
import {
  darkModeSpinnerStyles,
  descriptionThemeColor,
  horizontalVariantStyles,
  SpinnerBottomMargins,
  SpinnerSizes,
} from './Spinner.styles';
import SpinnerProps from './Spinner.types';

const Spinner = ({
  variant = 'default',
  description,
  sizeOverride,
  darkMode: darkModeProp,
}: SpinnerProps) => {
  const size = sizeOverride ?? SpinnerSizes[variant];
  const spinnerMarginBottom = SpinnerBottomMargins[variant];
  const { darkMode, theme } = useDarkMode(darkModeProp);
  return (
    <div
      className={cx({
        [horizontalVariantStyles]: variant === 'horizontal',
      })}
    >
      <Player
        autoplay
        loop
        src={animationJson}
        className={cx({ [darkModeSpinnerStyles]: darkMode })}
        style={{
          width: size,
          height: size,
          marginBottom: description ? spinnerMarginBottom : undefined,
        }}
      />
      <Body color={descriptionThemeColor[theme]}>{description}</Body>
    </div>
  );
};

export default Spinner;
