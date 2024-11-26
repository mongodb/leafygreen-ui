import { css } from '@leafygreen-ui/emotion';
import { createUniqueClassName, Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import {
  color,
  focusRing,
  spacing,
  transitionDuration,
  typeScales,
} from '@leafygreen-ui/tokens';

import { canvasHeaderClassname } from '../CanvasHeader/CanvasHeader.styles';

export const resourceNameButtonClassName = createUniqueClassName(
  'canvas-header-resource',
);

export const resourceBaseStyles = css`
  display: flex;
  gap: ${spacing[200]}px;
`;

export const resourceIconBaseStyles = css`
  line-height: ${typeScales.body2.lineHeight}px;
  color: ${palette.gray.base};

  svg {
    vertical-align: middle;
  }
`;

export const inlineContainerStyles = css`
  line-break: anywhere;
  position: relative;
  display: inline;
`;

export const getResourceNameButtonStyles = (theme: Theme) => css`
  display: inline;
  cursor: pointer;
  border-radius: 6px;
  color: ${color[theme].text.secondary?.default};

  &:focus-visible,
  .${canvasHeaderClassname}[data-focus="true"] & {
    outline: 1px solid white;
    box-shadow: ${focusRing[theme].default};
  }
`;

export const getResourceNameStyles = (theme: Theme) => css`
  display: inline;
  color: inherit;
  font-size: ${typeScales.body2.fontSize}px;
  line-height: ${typeScales.body2.lineHeight}px;
  transition: border-color ${transitionDuration.default}ms ease-in-out;
  border-bottom: 2px solid;
  border-color: transparent;
  padding-bottom: 2px;

  .${resourceNameButtonClassName}:hover &,
    .${canvasHeaderClassname}[data-hover="true"] & {
    border-color: ${color[theme].border.secondary?.default};
  }
`;

export const getResourceCopyIconWrapperStyles = (theme: Theme) => css`
  position: relative;
  right: 0;
  margin-left: -24px;
  opacity: 0;
  transition: ${transitionDuration.default}ms ease-in-out;
  transition-property: border-color, opacity;
  background-color: ${color[theme].background.primary.default};
  padding-inline: ${spacing[100]}px;
  border-radius: 0 ${spacing[150]}px ${spacing[150]}px 0;

  svg {
    position: relative;
    top: ${spacing[150] / 2}px;
  }

  .${resourceNameButtonClassName}:hover &,
  .${resourceNameButtonClassName}:focus-visible &, 
  .${canvasHeaderClassname}[data-hover="true"] &,
  .${canvasHeaderClassname}[data-focus="true"] & {
    opacity: 1;
  }

  // Add a linear gradient over the resource name
  &:before {
    content: '';
    position: absolute;
    display: inline-block;
    left: -${spacing[300]}px;
    top: 0;
    width: ${spacing[300]}px;
    height: 100%;
    background: linear-gradient(
      to right,
      ${palette.transparent},
      ${color[theme].background.primary.default}
    );
  }
`;

export const resourceCopiedStyles = css`
  opacity: 1;
`;

export const resourceBadgeStyles = css`
  position: relative;
  display: inline-flex;
  flex-shrink: 0;
  gap: ${spacing[200]}px;
  padding-left: ${spacing[200]}px;
`;
