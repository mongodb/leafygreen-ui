import { css } from '@leafygreen-ui/emotion';
import { createUniqueClassName, Theme } from '@leafygreen-ui/lib';
import {
  color,
  fontFamilies,
  spacing,
  State,
  transitionDuration,
  typeScales,
} from '@leafygreen-ui/tokens';

import { leftGlyphClassName } from '../InputOptionContent';

export const inputOptionClassName = createUniqueClassName('input_option');

interface InputOptionStyleArgs {
  theme: Theme;
  disabled?: boolean;
  highlighted?: boolean;
  isInteractive?: boolean;
}

export const getInputOptionStyles = ({
  theme,
  disabled,
  highlighted,
  isInteractive,
}: InputOptionStyleArgs) => {
  const ixnState = highlighted ? State.Focus : State.Default;
  return css`
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
    padding: ${spacing[200]}px ${spacing[300]}px;

    transition: ${transitionDuration.default}ms ease-in-out;
    transition-property: background-color, color;

    color: ${color[theme].text.primary[ixnState]};
    background-color: ${color[theme].background.primary[ixnState]};

    ${disabled &&
    css`
      cursor: not-allowed;
      color: ${color[theme].text.disabled[ixnState]};
    `}

    /* Interactive states */
    ${isInteractive &&
    !disabled &&
    css`
      /* Hover */
      &:hover {
        outline: none;
        color: ${color[theme].text.primary.hover};
        background-color: ${color[theme].background.primary.hover};

        .${leftGlyphClassName} {
          color: ${color[theme].icon.primary.hover};
        }
      }

      /* Focus (styling handled by highlighted prop) */
      &:focus,
      &:focus-visible {
        outline: none;
        border: unset;
      }
    `}
  `;
};

/** in px */
const wedgeWidth = spacing[100];
/** in px */
const wedgePaddingY = spacing[200];

export const getInputOptionWedge = ({
  theme,
  disabled,
  highlighted,
}: InputOptionStyleArgs) => css`
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

    ${highlighted &&
    css`
      transform: scaleY(1) translateY(-50%);
      background-color: ${color[theme].border.primary.focus};
    `}

    ${disabled &&
    css`
      content: unset;
    `}
  }
`;
