import { transparentize } from 'polished';

import { css, cx } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import {
  borderRadius,
  color,
  fontFamilies,
  spacing,
  transitionDuration,
} from '@leafygreen-ui/tokens';

import { Size } from './SegmentedControl.types';

export const wrapperStyle = css`
  display: flex;
  gap: ${spacing[200]}px;
  align-items: center;
  z-index: 0;
  font-family: ${fontFamilies.default};
`;

export const getLabelStyles = (theme: Theme) => css`
  white-space: nowrap;
  color: ${color[theme].text.secondary.default};
`;

export const optionsWrapperStyleSize: Record<Size, string> = {
  [Size.XSmall]: css`
    --indicator-height: 100%;
    --indicator-radius: ${borderRadius[150]}px;
    --outer-radius: ${borderRadius[150]}px;
    --segment-gap: ${spacing[25]}px; // space between segments
    --wrapper-padding: ${spacing[0]}px;
  `,
  [Size.Small]: css`
    --indicator-height: calc(100% - 2 * var(--wrapper-padding));
    --indicator-radius: ${borderRadius[150]}px;
    --outer-radius: ${borderRadius[150]}px;
    --segment-gap: ${spacing[25]}px; // space between segments
    --wrapper-padding: ${spacing[50]}px;
  `,
  [Size.Default]: css`
    --indicator-height: calc(100% - 2 * var(--wrapper-padding));
    --indicator-radius: ${borderRadius[150]}px;
    --outer-radius: ${borderRadius[200]}px;
    --segment-gap: ${spacing[25]}px; // space between segments
    --wrapper-padding: 3px;
  `,
  [Size.Large]: css`
    --indicator-height: calc(100% - 2 * var(--wrapper-padding));
    --indicator-radius: ${borderRadius[150]}px;
    --outer-radius: ${borderRadius[200]}px;
    --segment-gap: ${spacing[25]}px; // space between segments
    --wrapper-padding: 3px;
  `,
};

export const optionsWrapperStyleTheme: Record<Theme, string> = {
  [Theme.Light]: css`
    --background-color: ${palette.gray.light3};
    --inner-shadow: 0px 1px 2px ${transparentize(0.7, palette.black)} inset;
    --outer-shadow: 0px 1px 1px ${palette.gray.light2};
    --hover-background-color: ${palette.white};
    --indicator-background-color: ${palette.black};
    --indicator-border-color: ${palette.black};
  `,
  [Theme.Dark]: css`
    --background-color: ${palette.gray.dark4};
    --border-color: rgba(255, 255, 255, 0);
    --inner-shadow: 0px 0px 0px 1px ${palette.gray.dark1} inset;
    --outer-shadow: 0px 0px 0px 0px rgba(255, 255, 255, 0);
    --hover-background-color: ${palette.gray.dark3};
    --indicator-background-color: ${palette.gray.light2};
    --indicator-border-color: ${palette.gray.light2};
  `,
};

export const optionsWrapperStyle = ({
  theme,
  size,
}: {
  theme: Theme;
  size: Size;
}) =>
  cx(
    optionsWrapperStyleSize[size],
    optionsWrapperStyleTheme[theme],
    css`
      position: relative;
      display: grid;
      grid-auto-flow: column;
      grid-auto-columns: minmax(
        0,
        1fr
      ); // allows the grid tracks to be as small as 0 but as large as 1fr, creating columns that will stay equal
      gap: var(--segment-gap);
      align-items: center;
      padding: var(--wrapper-padding);
      border-radius: var(--outer-radius);
      background-color: var(--background-color);

      &:focus {
        outline: none;
      }

      // Frame shadow
      &:after {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: inherit;
        box-shadow: var(--inner-shadow), var(--outer-shadow);
        z-index: 1;
        pointer-events: none;
      }
    `,
  );

export const selectionIndicatorStyle = css`
  position: absolute;
  width: 100%;
  height: var(--indicator-height);
  z-index: 2;
  border-radius: var(--indicator-radius);
  background-color: var(--indicator-background-color);
  transition: transform ${transitionDuration.default}ms ease-in-out;
`;

export const hoverIndicatorStyle = css`
  position: absolute;
  height: var(--indicator-height);
  width: 100%;
  border-radius: var(--indicator-radius);
  background-color: var(--hover-background-color);
  z-index: 0;
  opacity: 0;
  transition: opacity 100ms ease-in-out;
`;
