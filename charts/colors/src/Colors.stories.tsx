import React from 'react';

import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { borderRadius, color, spacing } from '@leafygreen-ui/tokens';

import { colors } from './colors';

export default {
  title: 'Composition/Charts/Colors',
  component: null,
};

const COLOR_BOX_SIZE = 90;

const getColorGridStyles = (theme: Theme) => css`
  background-color: ${color[theme].background.primary.default};
  padding: ${spacing[400]}px;
`;

const getHeaderStyles = (theme: Theme) => css`
  color: ${color[theme].text.primary.default};
`;

const gridContainerStyles = css`
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: repeat(3, ${COLOR_BOX_SIZE}px);
  grid-template-rows: repeat(5, ${COLOR_BOX_SIZE}px);
  gap: ${spacing[400]}px;
`;

const getColorBoxStyles = (theme: Theme) => css`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: ${color[theme].text.inversePrimary.default};
  border-radius: ${borderRadius[200]}px;
`;

const ColorGrid = ({ theme }: { theme: Theme }) => {
  const isDarkMode = theme === Theme.Dark;
  const themeColors = colors[theme];

  return (
    <div className={getColorGridStyles(theme)}>
      <h2 className={getHeaderStyles(theme)}>
        {isDarkMode ? 'Dark Mode' : 'Light Mode'}
      </h2>
      <div className={gridContainerStyles}>
        {themeColors.map((color, index) => (
          <div
            key={index}
            className={css`
              ${getColorBoxStyles(theme)};
              background-color: ${color};
            `}
          >
            {index + 1}
          </div>
        ))}
      </div>
    </div>
  );
};

export const LiveExample = () => (
  <>
    <ColorGrid theme={Theme.Light} />
    <ColorGrid theme={Theme.Dark} />
  </>
);
