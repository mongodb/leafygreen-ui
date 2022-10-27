import React from 'react';
import PropTypes from 'prop-types';
import { cx, css } from '@leafygreen-ui/emotion';
import { variantColors } from './globalStyles';
import { fontFamilies, typeScales } from '@leafygreen-ui/tokens';

const Mode = {
  Light: 'light',
  Dark: 'dark',
} as const;

type Mode = typeof Mode[keyof typeof Mode];

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

const textStyle = css`
  padding-left: ${controlSpacing}px;
  padding-right: ${controlSpacing}px;
  font-size: ${typeScales.body1.fontSize}px;
`;
interface WindowChromeProps {
  darkMode?: boolean;
  chromeTitle?: string;
}

function WindowChrome({
  darkMode = false,
  chromeTitle = '',
}: WindowChromeProps) {
  const mode = darkMode ? Mode.Dark : Mode.Light;
  const colors = variantColors[mode];

  return (
    <div
      className={cx(
        windowChromeStyle,
        css`
          background-color: ${colors[1]};
          color: ${colors[2]};
        `,
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
