import facepaint from 'facepaint';
import { transparentize } from 'polished';

import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import {
  BaseFontSize,
  color,
  fontFamilies,
  spacing,
  transitionDuration,
} from '@leafygreen-ui/tokens';

import { variantColors } from '../globalStyles';

import { ScrollState } from './Code.types';

// We use max-device-width to select specifically for iOS devices
const mq = facepaint([
  `@media only screen and (max-device-width: 812px) and (-webkit-min-device-pixel-ratio: 2)`,
  `@media only screen and (min-device-width: 813px) and (-webkit-min-device-pixel-ratio: 2)`,
]);

const singleLineComponentHeight = 36;
const lineHeight = 24;
const codeWrappingVerticalPadding = spacing[200];

export const wrapperStyle: Record<Theme, string> = {
  [Theme.Light]: css`
    border: 1px solid ${variantColors[Theme.Light][1]};
    border-radius: 12px;
    overflow: hidden;
  `,
  [Theme.Dark]: css`
    border: 1px solid ${variantColors[Theme.Dark][1]};
    border-radius: 12px;
    overflow: hidden;
  `,
};

export const contentWrapperStyles = css`
  position: relative;
  display: grid;
  grid-template-areas: 'code panel';
  grid-template-columns: auto 38px;
  border-radius: inherit;
  z-index: 0; // new stacking context
`;

export const contentWrapperStylesNoPanel = css`
  // No panel, all code
  grid-template-areas: 'code code';
`;

export const contentWrapperStyleWithPicker = css`
  grid-template-areas:
    'panel'
    'code';
  grid-template-columns: unset;
`;

export const expandableContentWrapperStyle = css`
  grid-template-areas: 'code panel' 'expandButton expandButton';
  grid-template-rows: auto 28px;
`;

export const expandableContentWrapperStyleNoPanel = css`
  grid-template-areas: 'code code' 'expandButton expandButton';
  grid-template-rows: auto 28px;
`;

export const expandableContentWrapperStyleWithPicker = css`
  grid-template-areas:
    'panel'
    'code'
    'expandButton';
  grid-template-rows: auto auto 28px;
`;

export const codeWrapperStyle = css`
  grid-area: code;
  overflow-x: auto;
  // Many applications have global styles that are adding a border and border radius to this element.
  border-radius: inherit;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border: 0;
  // We apply left / right padding in Syntax to support line highlighting
  padding-top: ${codeWrappingVerticalPadding}px;
  padding-bottom: ${codeWrappingVerticalPadding}px;
  margin: 0;
  position: relative;
  transition: box-shadow ${transitionDuration.faster}ms ease-in-out;
  transition: height ${transitionDuration.slower}ms ease-in-out;

  ${mq({
    // Fixes annoying issue where font size is overridden in mobile Safari to be 20px.
    // Ideally, we wouldn't need to set the text to wrap, but from what I can tell, this is the one possible solution to the problem.
    whiteSpace: ['pre', 'pre-wrap', 'pre'],
  })}

  &:focus-visible {
    outline: none;
  }
`;

export const codeWrapperStyleNoPanel = css`
  border-left: 0;
  border-radius: inherit;
  border-top-right-radius: 0;
  border-top-left-radius: 0;
`;
export const codeWrapperStyleWithLanguagePicker = css`
  border-left: 0;
  border-radius: inherit;
  border-top-right-radius: 0;
  border-top-left-radius: 0;
`;

export const singleLineCodeWrapperStyle = css`
  display: flex;
  align-items: center;
  padding-top: ${(singleLineComponentHeight - lineHeight) / 2}px;
  padding-bottom: ${(singleLineComponentHeight - lineHeight) / 2}px;
`;

export function getExpandableCodeWrapperStyle(
  expanded: boolean,
  codeHeight: number,
  collapsedCodeHeight: number,
) {
  return css`
    max-height: ${expanded ? codeHeight : collapsedCodeHeight}px;
    overflow-y: hidden;
    transition: max-height ${transitionDuration.slower}ms ease-in-out;
  `;
}

export const panelStyles = css`
  z-index: 2; // Above the shadows
  grid-area: panel;
`;

export function getCodeWrapperVariantStyle(theme: Theme): string {
  const colors = variantColors[theme];

  return css`
    background-color: ${colors[0]};
    color: ${colors[3]};
  `;
}

export const expandButtonStyle = css`
  align-items: center;
  border: none;
  /**
    Code wrapper's border radius is 12px. Matching that creates a very 
    slight gap between the button and the code wrapper. Decreasing by
    1px removes gap.
  */
  border-radius: 0 0 11px 11px;
  border-width: 1px 0 0 0;
  border-style: solid;
  display: flex;
  font-family: ${fontFamilies.default};
  font-size: ${BaseFontSize.Body1}px;
  gap: ${spacing[100]}px;
  grid-area: expandButton;
  justify-content: center;
  transition: all ${transitionDuration.default}ms ease-in-out;
  z-index: 2; // Moves button above the shadows
  &:hover {
    cursor: pointer;
  }
`;

export function getExpandButtonVariantStyle(theme: Theme): string {
  const colors = variantColors[theme];

  return css`
    background-color: ${colors[0]};
    border-color: ${colors[1]};
    color: ${colors[2]};
    &:hover {
      background-color: ${colors[1]};
    }
    &:focus-visible {
      background-color: ${color[theme].background.info.focus};
      color: ${theme === Theme.Light ? palette.blue.dark1 : colors[2]};
      outline: none;
    }
  `;
}

export const baseScrollShadowStyles = css`
  &:before,
  &:after {
    content: '';
    display: block;
    position: absolute;
    z-index: 1; // above the code
    top: 0;
    height: 100%;
    width: 40px;
    border-radius: 40%;
    box-shadow: unset;
    transition: box-shadow ${transitionDuration.faster}ms ease-in-out;
  }
  &:before {
    grid-column: 1;
    left: -40px;
  }
  &:after {
    grid-column: 2; // Placed either under Panel, or on the right edge
  }
`;

export const scrollShadowStylesNoPanel = css`
  &:after {
    grid-column: -1; // Placed on the right edge
  }
`;

export const scrollShadowStylesWithPicker = css`
  &:before,
  &:after {
    grid-row: 2; // Placed on the top under the Picker Panel
  }
`;

export function getScrollShadow(
  scrollState: ScrollState,
  theme: Theme,
): string {
  const dropShadowBefore =
    theme === Theme.Light
      ? `1px 0 10px 0 ${transparentize(0.75, 'black')}`
      : `15px 0px 15px 0 ${transparentize(0.7, 'black')}`;

  const dropShadowAfter =
    theme === Theme.Light
      ? `-1px 0px 10px ${transparentize(0.75, 'black')}`
      : `-15px 0px 15px 0 ${transparentize(0.7, 'black')}`;

  return css`
    &:before {
      ${(scrollState === ScrollState.Both ||
        scrollState === ScrollState.Left) &&
      css`
        box-shadow: ${dropShadowBefore};
      `};
    }
    &:after {
      ${(scrollState === ScrollState.Both ||
        scrollState === ScrollState.Right) &&
      `
        box-shadow: ${dropShadowAfter};
      `};
    }
  `;
}
