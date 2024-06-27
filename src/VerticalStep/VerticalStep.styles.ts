import { css } from '@leafygreen-ui/emotion';
import { createUniqueClassName, Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import {
  breakpoints,
  fontWeights,
  spacing,
  transitionDuration,
  typeScales,
} from '@leafygreen-ui/tokens';

import { stepIconClassName } from '../StepIcon';

import { State } from './VerticalStep.types';

export const contentClassName = createUniqueClassName('content');

export const baseStyles = css`
  display: flex;
  gap: ${spacing[200]}px;

  // This adds the line between steps
  &:not(:last-of-type) {
    .${stepIconClassName} {
      &::after {
        content: '';
      }
    }
  }

  &:last-of-type {
    .${contentClassName} {
      margin: 0;
    }
  }
`;

export const getWrapperStyles = (isCompleted = false) => css`
  display: grid;
  transition: grid-template-rows ${transitionDuration.slowest}ms ease-in-out;
  grid-template-rows: 1fr;

  ${isCompleted &&
  css`
    grid-template-rows: 0fr;
  `}
`;

export const getInnerStyles = (hasMedia = false) => css`
  overflow: hidden;
  padding-inline-start: ${spacing[200]}px;

  ${hasMedia &&
  css`
    @media (min-width: ${breakpoints.Tablet}px) {
      display: grid;
    }

    column-gap: ${spacing[400]}px;
    grid-template:
      'desc img'
      'cta img'
      'cta img';
    grid-template-columns: minmax(370px, 1fr) auto;
  `}
`;

export const mediaStyles = css`
  grid-area: img;
  margin-block-start: ${spacing[200]}px;
  max-width: 800px;
  width: 100%;

  @media (min-width: ${breakpoints.Tablet}px) {
    margin-block-start: 0;
  }

  img,
  svg {
    max-width: 100%;
    vertical-align: middle;
  }
`;

export const titleStyles: Record<Theme, Record<State, string>> = {
  [Theme.Dark]: {
    [State.Current]: palette.white,
    [State.Completed]: palette.green.base,
    [State.Future]: palette.gray.light1,
  },
  [Theme.Light]: {
    [State.Current]: palette.black,
    [State.Completed]: palette.green.dark2,
    [State.Future]: palette.gray.dark1,
  },
};

export const getTitleStyles = (theme: Theme, state: State) => {
  return css`
    color: ${titleStyles[theme][state]};
    padding-inline-start: ${spacing[200]}px;
    line-height: ${typeScales.body1.lineHeight}px;
    transition: ${transitionDuration.default}ms font-weight ease-in-out;

    ${state !== State.Completed &&
    css`
      font-weight: ${fontWeights.bold};
    `}
  `;
};

export const getContentStyles = (isOpen = false, hasButtons = false) => css`
  margin-block-end: ${spacing[400]}px;
  transition: margin-block-end ${transitionDuration.slowest}ms ease-in-out;
  width: 100%;

  ${isOpen &&
  hasButtons &&
  css`
    margin-block-end: ${spacing[200]}px;
  `}
`;
