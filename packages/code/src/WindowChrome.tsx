import React from 'react';
import PropTypes from 'prop-types';
import { cx, css } from '@leafygreen-ui/emotion';
import { Mode, variantColors } from '@leafygreen-ui/syntax';
import { darken } from 'polished';

export const windowChromeHeight = 28;
const controlSize = 12;
const controlSpacing = 8;
const borderRadius = 4;

const windowChromeStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: ${windowChromeHeight}px;
  padding-left: ${controlSize}px;
  padding-right: ${controlSize}px;
  border-radius: ${borderRadius}px ${borderRadius}px 0 0;
`;

const windowControlsStyle = css`
  display: flex;
  height: ${controlSize}px;
`;

const fakeControlsStyle = css`
  height: ${controlSize}px;
  width: ${controlSpacing * 3 + controlSize * 3}px;
`;

const textStyle = css`
  padding-left: ${controlSpacing}px;
  padding-right: ${controlSpacing}px;
  font-size: 14px;
`;

function WindowControl({ color }: { color: string }) {
  return (
    <div
      className={css`
        height: ${controlSize}px;
        width: ${controlSize}px;
        border-radius: 50px;
        margin-right: 8px;
        background-color: ${color};
        border: 1px solid ${darken(0.03, color)};
      `}
    />
  );
}

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
      <div className={windowControlsStyle}>
        {['#FF5952', '#E7BF2A', '#54C22C'].map(color => (
          <WindowControl key={color} color={color} />
        ))}
      </div>

      <div className={textStyle}>{chromeTitle}</div>

      <div className={fakeControlsStyle} />
    </div>
  );
}

WindowChrome.displayName = 'WindowChrome';

WindowChrome.propTypes = {
  darkMode: PropTypes.bool,
  chromeTitle: PropTypes.string,
};

export default WindowChrome;
