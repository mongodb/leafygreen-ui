import React from 'react';

import LeafyGreenProvider, {
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';
import { FontWeight } from '@leafygreen-ui/tokens';
import { Body, Disclaimer } from '@leafygreen-ui/typography';

import {
  disclaimerStyles,
  getContainerStyles,
  getTitleStyles,
} from './DisclaimerText.styles';
import { DisclaimerTextProps } from './DisclaimerText.types';

export const DisclaimerText = ({
  children,
  className,
  darkMode: darkModeProp,
  title,
  ...rest
}: DisclaimerTextProps) => {
  const { darkMode, theme } = useDarkMode(darkModeProp);

  return (
    <LeafyGreenProvider darkMode={darkMode}>
      <div className={getContainerStyles(className)} {...rest}>
        {title && (
          <Body weight={FontWeight.SemiBold} className={getTitleStyles(theme)}>
            {title}
          </Body>
        )}
        <Disclaimer className={disclaimerStyles}>{children}</Disclaimer>
      </div>
    </LeafyGreenProvider>
  );
};

DisclaimerText.displayName = 'DisclaimerText';
