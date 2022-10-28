import React from 'react';
import PropTypes from 'prop-types';
import { cx, css } from '@leafygreen-ui/emotion';
import { variantColors } from './globalStyles';
import { fontFamilies, typeScales } from '@leafygreen-ui/tokens';
import { useCodeContext } from './CodeContext';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';

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
  `,
  [Theme.Dark]: css`
    color: ${palette.gray.light1};
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
  const { theme } = useCodeContext();
  const colors = variantColors[theme];

  return (
    <div
      className={cx(
        windowChromeStyle,
        css`
          background-color: ${colors[1]};
        `,
        windowChromeThemeStyles[theme],
      )}
    >
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
