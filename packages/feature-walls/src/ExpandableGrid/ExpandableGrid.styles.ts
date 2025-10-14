import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import {
  color,
  fontWeights,
  spacing,
  transitionDuration,
} from '@leafygreen-ui/tokens';

export const TRANSITION_DURATION = transitionDuration.slower;

export const containerStyles = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${spacing[600]}px;
`;

export const getChildrenContainerStyles = ({
  height,
  isExpandable,
  repeatCount,
}: {
  height: string;
  isExpandable: boolean;
  repeatCount: number;
}) => css`
  overflow: hidden;
  display: grid;
  grid-template-columns: repeat(${repeatCount}, 1fr);
  gap: ${spacing[400]}px;
  transition: height ${TRANSITION_DURATION}ms ease-in-out;
  width: 100%;
  height: ${isExpandable ? height : '100%'};
`;

export const childContainerStyles = css`
  width: 100%;
  height: fit-content;
`;

export const getExpandButtonStyles = (theme: Theme) => css`
  height: 20px;
  background: transparent;
  border: none;
  box-shadow: none;
  color: ${color[theme].text.primary.default};
  font-weight: ${fontWeights.regular};

  &:hover {
    background: transparent;
    border: none;
    box-shadow: none;
  }

  &:focus-visible {
    background: transparent;
  }

  svg {
    color: ${color[theme].icon.secondary.default};
  }
`;
