import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';

import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { Body } from '@leafygreen-ui/typography';

import { descriptionThemeColor } from '../LoadingIndicator.styles';

import animationJson from './animation';
import { blobStyles, rootStyles } from './BlobLoader.styles';
import BlobLoaderProps from './BlobLoader.types';

const BlobLoader = ({
  description,
  darkMode: darkModeProp,
}: BlobLoaderProps) => {
  const { theme } = useDarkMode(darkModeProp);
  return (
    <div className={rootStyles}>
      <Player autoplay loop src={animationJson} style={blobStyles} />
      <Body color={descriptionThemeColor[theme]}>{description}</Body>
    </div>
  );
};

export default BlobLoader;
