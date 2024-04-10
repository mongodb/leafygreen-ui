import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import {
  fontFamilies,
  spacing,
  transitionDuration,
  typeScales,
} from '@leafygreen-ui/tokens';

import { SizeSet } from '../styleSets';

export const labelDescriptionContainerStyle = css`
  display: flex;
  flex-direction: column;
  margin-bottom: ${spacing[1]}px;
`;

export const wrapperStyle = css`
  display: flex;
  flex-direction: column;
`;

export const largeLabelStyles = css`
  font-size: ${typeScales.large.fontSize}px;
  line-height: ${typeScales.large.lineHeight}px;
`;

export const errorContainerStyles = css`
  padding-top: ${spacing[100]}px;
  display: flex;
  align-items: center;
  gap: ${spacing[100]}px;
`;

export const hideErrorContainerStyles = css`
  opacity: 0;
`;

export const errorIconThemeStyles: Record<Theme, string> = {
  [Theme.Light]: palette.red.base,
  [Theme.Dark]: palette.red.light1,
};

export const errorTextStyle = ({
  darkMode,
  sizeSet,
}: {
  darkMode: boolean;
  sizeSet: SizeSet;
}) => css`
  font-family: ${fontFamilies.default};
  color: ${darkMode ? palette.red.light1 : palette.red.base};
  font-size: ${sizeSet.text}px;
  transition: color ${transitionDuration.faster}ms ease-in-out;
  transition-delay: ${transitionDuration.faster}ms;
`;
