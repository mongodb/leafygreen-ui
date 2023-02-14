import React from 'react';
import PropTypes from 'prop-types';

import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

import {
  textStyle,
  windowChromeStyle,
  windowChromeThemeStyles,
} from './WindowChrome.styles';

interface WindowChromeProps {
  chromeTitle?: string;
}

function WindowChrome({ chromeTitle = '' }: WindowChromeProps) {
  const { theme } = useDarkMode();

  return (
    <div className={cx(windowChromeStyle, windowChromeThemeStyles[theme])}>
      <div className={textStyle}>{chromeTitle}</div>
    </div>
  );
}

WindowChrome.displayName = 'WindowChrome';

WindowChrome.propTypes = {
  darkMode: PropTypes.bool,
  chromeTitle: PropTypes.string,
};

export default WindowChrome;
