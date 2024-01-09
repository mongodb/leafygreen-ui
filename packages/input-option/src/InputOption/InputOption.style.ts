import { css } from '@leafygreen-ui/emotion';
import { createUniqueClassName, Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import {
  fontFamilies,
  spacing,
  transitionDuration,
  typeScales,
} from '@leafygreen-ui/tokens';

import { RenderedContext } from './InputOption.types';
import { contextColors, State } from './themes';

export const titleClassName = createUniqueClassName('input-option-title');
export const descriptionClassName = createUniqueClassName(
  'input-option-description',
);
export const leftGlyphClassName = createUniqueClassName(
  'input-option-left-glyph',
);

const hoverSelector = '&:hover, &[data-hover="true"]';
const focusSelector = '&:focus, &:focus-visible, &[data-focus="true"]';

export const inputOptionStyles = css`
  position: relative;
  list-style: none;
  outline: none;
  border: unset;
  margin: 0;
  text-align: left;
  text-decoration: none;
  cursor: pointer;

  font-size: ${typeScales.body1.fontSize}px;
  line-height: ${typeScales.body1.lineHeight}px;
  font-family: ${fontFamilies.default};
  padding: ${spacing[2]}px ${spacing[2] + spacing[1]}px;

  transition: background-color ${transitionDuration.default}ms ease-in-out;

  ${focusSelector} {
    outline: none;
    border: unset;
  }
`;

/** in px */
const wedgeWidth = spacing[1];
/** in px */
const wedgePaddingY = spacing[2];

export const inputOptionWedge = css`
  // Left wedge
  &:before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    width: ${wedgeWidth}px;
    height: calc(100% - ${2 * wedgePaddingY}px);
    min-height: ${spacing[3]}px;
    background-color: rgba(255, 255, 255, 0);
    border-radius: 0 6px 6px 0;
    transform: scale3d(0, 0.3, 0) translateY(-50%);
    transform-origin: 0%; // 0% since we use translateY
    transition: ${transitionDuration.default}ms ease-in-out;
    transition-property: transform, background-color;
  }
`;

export const disabledStyles = css`
  cursor: not-allowed;

  &:before {
    content: unset;
  }
`;

export const getContextStyles = (
  renderedContext: RenderedContext,
  state: State,
  theme: Theme,
) => css`
  background-color: ${contextColors[renderedContext][theme][state].bgColor};

  &,
  & .${leftGlyphClassName} {
    color: ${contextColors[renderedContext][theme][state].leftGlyph};
  }
`;

export const getWedgeStyles = (
  renderedContext: RenderedContext,
  state: State,
  theme: Theme,
) => css`
  &:before {
    transform: scaleY(1) translateY(-50%);
    background-color: ${contextColors[renderedContext][theme][state]
      .wedgeBgColor};
  }
`;

export const getTextStyles = (
  renderedContext: RenderedContext,
  state: State,
  theme: Theme,
) => css`
  .${titleClassName} {
    color: ${contextColors[renderedContext][theme][state].title};
    font-weight: normal;
  }

  &,
  & .${descriptionClassName} {
    color: ${contextColors[renderedContext][theme][state].description};
  }
`;

export const getHoverStyles = (
  renderedContext: RenderedContext,
  theme: Theme,
) => css`
  ${hoverSelector} {
    outline: none;
    background-color: ${contextColors[renderedContext][theme].hover.bgColor};

    &,
    & .${leftGlyphClassName} {
      color: ${contextColors[renderedContext][theme].leftGlyphHover};
    }
  }
`;

export const menuTitleStyles = (state: State) => css`
  &,
  & .${titleClassName} {
    color: ${state === State.Destructive ? palette.red.light2 : palette.white};
  }
`;

export const boldTitleStyles = css`
  .${titleClassName} {
    font-weight: bold;
  }
`;
