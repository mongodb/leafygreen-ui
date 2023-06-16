import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import PropTypes from 'prop-types';

import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { Body, useUpdatedBaseFontSize } from '@leafygreen-ui/typography';

import { descriptionThemeColor } from '../LoadingIndicator.styles';

import animationJson from './animation';
import { blobStyles, rootStyles } from './PageLoader.styles';
import { PageLoaderProps } from './PageLoader.types';

/**
 * Displays an animation of various brand shapes morphing from one to another paired with description text
 */
const PageLoader = ({
  baseFontSize: baseFontSizeProp,
  description,
  darkMode: darkModeProp,
  className,
  ...rest
}: PageLoaderProps) => {
  const { theme } = useDarkMode(darkModeProp);
  const baseFontSize = useUpdatedBaseFontSize(baseFontSizeProp);
  return (
    <div className={cx(rootStyles, className)} {...rest}>
      <Player autoplay loop src={animationJson} style={blobStyles} />
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

PageLoader.propTypes = {
  darkMode: PropTypes.bool,
  description: PropTypes.string,
};

export default PageLoader;
