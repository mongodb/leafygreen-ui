import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import PropTypes from 'prop-types';

import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { Body, useUpdatedBaseFontSize } from '@leafygreen-ui/typography';

import { descriptionThemeColor } from '../LoadingIndicator.styles';

import animationJson from './animation';
import {
  darkModeSpinnerStyles,
  horizontalDisplayOptionStyles,
  rootStyles,
  SpinnerBottomMargins,
  SpinnerSizes,
} from './Spinner.styles';
import { DisplayOption, SpinnerProps } from './Spinner.types';

const Spinner = ({
  baseFontSize: baseFontSizeProp,
  displayOption = 'default',
  description,
  sizeOverride,
  darkMode: darkModeProp,
  className,
  ...rest
}: SpinnerProps) => {
  const size = sizeOverride ?? SpinnerSizes[displayOption];
  const spinnerMarginBottom = SpinnerBottomMargins[displayOption];
  const { darkMode, theme } = useDarkMode(darkModeProp);
  const baseFontSize = useUpdatedBaseFontSize(baseFontSizeProp);
  return (
    <div
      className={cx(
        rootStyles,
        {
          [horizontalDisplayOptionStyles]:
            displayOption === DisplayOption.DefaultHorizontal,
        },
        className,
      )}
      {...rest}
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
      {description && (
        <Body color={descriptionThemeColor[theme]} baseFontSize={baseFontSize}>
          {description}
        </Body>
      )}
    </div>
  );
};

Spinner.propTypes = {
  darkMode: PropTypes.bool,
  description: PropTypes.string,
};

export default Spinner;
