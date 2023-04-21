import { css } from '@leafygreen-ui/emotion';
import { createUniqueClassName, Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import {
  fontFamilies,
  spacing,
  transitionDuration,
  typeScales,
} from '@leafygreen-ui/tokens';

export const titleClassName = createUniqueClassName('input-option-title');
export const descriptionClassName = createUniqueClassName(
  'input-option-description',
);

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

  &:focus,
  &:focus-visible {
    outline: none;
    border: unset;
  }
`;

export const titleSelectionStyles = css`
  .${titleClassName} {
    font-weight: bold;
  }
`;

export const inputOptionThemeStyles: Record<Theme, string> = {
  [Theme.Light]: css`
    color: ${palette.black};
  `,
  [Theme.Dark]: css`
    color: ${palette.gray.light2};
  `,
};

export const inputOptionHoverStyles: Record<Theme, string> = {
  [Theme.Light]: css`
    &:hover {
      outline: none;
      background-color: ${palette.gray.light2};
    }
  `,
  [Theme.Dark]: css`
    &:hover {
      outline: none;
      background-color: ${palette.gray.dark4};
    }
  `,
};

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

export const inputOptionActiveStyles: Record<Theme, string> = {
  [Theme.Light]: css`
    outline: none;
    background-color: ${palette.blue.light3};
    color: ${palette.blue.dark2};

    &:before {
      transform: scaleY(1) translateY(-50%);
      background-color: ${palette.blue.base};
    }
  `,
  [Theme.Dark]: css`
    outline: none;
    background-color: ${palette.blue.dark3};
    color: ${palette.blue.light3};

    &:before {
      transform: scaleY(1) translateY(-50%);
      background-color: ${palette.blue.light1};
    }
  `,
};

export const inputOptionDisabledStyles: Record<Theme, string> = {
  [Theme.Light]: css`
    cursor: not-allowed;

    &,
    & .${descriptionClassName} {
      color: ${palette.gray.light1};
    }

    &:hover {
      background-color: inherit;
    }

    &:before {
      content: unset;
    }
  `,
  [Theme.Dark]: css`
    cursor: not-allowed;

    &,
    & .${descriptionClassName} {
      color: ${palette.gray.dark1};
    }

    &:hover {
      background-color: inherit;
    }

    &:before {
      content: unset;
    }
  `,
};
