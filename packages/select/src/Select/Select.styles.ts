import { css } from '@leafygreen-ui/emotion';
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
  margin-top: ${spacing[1]}px;
  padding-left: 2px;
  transition: color ${transitionDuration.faster}ms ease-in-out;
  transition-delay: ${transitionDuration.faster}ms;
`;
