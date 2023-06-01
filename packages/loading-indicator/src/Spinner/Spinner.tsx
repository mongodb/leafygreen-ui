import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import PropTypes from 'prop-types';

import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { Body, useUpdatedBaseFontSize } from '@leafygreen-ui/typography';

import { descriptionThemeColor } from '../LoadingIndicator.styles';

import animationJson from './animation';
import {
  colorOverrideStyles,
  darkModeSpinnerStyles,
  horizontalDisplayOptionStyles,
  rootStyles,
  SpinnerBottomMargins,
  SpinnerSizes,
  spinnerTransformStyles,
} from './Spinner.styles';
import { DisplayOption, SpinnerProps } from './Spinner.types';

/**
 * Displays an spinner animation paired with description text
 */
const Spinner = ({
  baseFontSize: baseFontSizeProp,
  displayOption = DisplayOption.DefaultVertical,
  description,
  sizeOverride,
  colorOverride,
  darkMode: darkModeProp,
  className,
  ...rest
}: SpinnerProps) => {
  // base size for the lottie animation's svg
  const BASE_SIZE = 16;
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
        className={cx({
          // if the size is smaller than the base size of the lottie animation svg, there needs to be a transform to reposition the viewbox
          [spinnerTransformStyles(BASE_SIZE - size)]: size < BASE_SIZE,
          [darkModeSpinnerStyles]: darkMode,
          [colorOverrideStyles(colorOverride as string)]: !!colorOverride,
        })}
        style={{
          width: size,
          height: size,
          marginBottom: description ? spinnerMarginBottom : undefined,
        }}
      />
      {description && (
        <Body
          className={descriptionThemeColor[theme]}
          baseFontSize={baseFontSize}
        >
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
