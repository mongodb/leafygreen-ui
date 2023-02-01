import React from 'react';
import PropTypes from 'prop-types';

import { css, cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { fontFamilies, typeScales } from '@leafygreen-ui/tokens';

import { variantColors } from './globalStyles';

export const windowChromeHeight = 28;
const controlSize = 12;
const controlSpacing = 8;
const borderRadius = 4;

const windowChromeStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${windowChromeHeight}px;
  padding-left: ${controlSize}px;
  padding-right: ${controlSize}px;
  border-radius: ${borderRadius}px ${borderRadius}px 0 0;
  font-family: ${fontFamilies.default};
`;

const windowChromeThemeStyles: Record<Theme, string> = {
  [Theme.Light]: css`
    color: ${palette.gray.dark2};
    background-color: ${variantColors.light[1]};
  `,
  [Theme.Dark]: css`
    color: ${palette.gray.light1};
    background-color: ${variantColors.dark[1]};
  `,
};

const textStyle = css`
  padding-left: ${controlSpacing}px;
  padding-right: ${controlSpacing}px;
  font-size: ${typeScales.body1.fontSize}px;
`;
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
