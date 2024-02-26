import { css } from '@leafygreen-ui/emotion';
import { createUniqueClassName, Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import {
  focusRing,
  spacing,
  transitionDuration,
  typeScales,
} from '@leafygreen-ui/tokens';

import { canvasHeaderClassname } from '../CanvasHeader/CanvasHeader.styles';

export const resourceNameContainerClassname =
  createUniqueClassName('canvas-header');

export const resourceBaseStyles = css`
  display: flex;
  gap: ${spacing[200]}px;
`;

export const resourceNameContainerBaseStyles = css`
  line-break: anywhere;
  cursor: pointer;
  color: unset;
  outline: 0;
  border-radius: 6px;
`;

export const resourceIconBaseStyles = css`
  line-height: ${typeScales.body2.lineHeight}px;
  color: ${palette.gray.base};

  svg {
    vertical-align: middle;
  }
`;

export const resourceNameBaseStyles = css`
  border-bottom: 2px solid;
  border-color: transparent;
  padding-bottom: 2px;
`;

export const resourceNameStyles = css`
  // gap between the text and copy icon
  padding-right: ${spacing[100]}px;

  transition: border-color ${transitionDuration.default}ms ease-in-out;
`;

export const resourceCopyStyles = css`
  opacity: 0;

  transition: ${transitionDuration.default}ms ease-in-out;
  transition-property: border-color, opacity;

  svg {
    position: relative;
    top: 2px;
  }

  .${resourceNameContainerClassname}:hover &,
  .${resourceNameContainerClassname}:focus-visible &, 
  .${canvasHeaderClassname}[data-hover="true"] &,
  .${canvasHeaderClassname}[data-focus="true"] & {
    opacity: 1;
  }
`;

export const resourceCopiedStyles = css`
  opacity: 1;
`;

export const resourceNameContainerThemeStyles: Record<Theme, string> = {
  [Theme.Light]: css`
    color: ${palette.gray.dark1};

    &:focus-visible,
    .${canvasHeaderClassname}[data-focus="true"] & {
      box-shadow: ${focusRing.light.default};
    }
  `,
  [Theme.Dark]: css`
    color: ${palette.gray.light1};

    &:focus-visible,
    .${canvasHeaderClassname}[data-focus="true"] & {
      box-shadow: ${focusRing.dark.default};
    }
  `,
};

export const resourceNameUnderlineStyles: Record<Theme, string> = {
  [Theme.Light]: css`
    .${resourceNameContainerClassname}:hover &,
    .${canvasHeaderClassname}[data-hover="true"] & {
      border-color: ${palette.gray.light2};
    }
  `,
  [Theme.Dark]: css`
    .${resourceNameContainerClassname}:hover &,
    .${canvasHeaderClassname}[data-hover="true"] & {
      border-color: ${palette.gray.dark2};
    }
  `,
};
