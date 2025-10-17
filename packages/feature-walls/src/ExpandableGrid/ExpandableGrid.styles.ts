import { css, cx } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import {
  color,
  fontWeights,
  spacing,
  transitionDuration,
} from '@leafygreen-ui/tokens';

const TRANSITION_DURATION = transitionDuration.slower;

const baseContainerStyles = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${spacing[400]}px;
`;

export const getContainerStyles = (className?: string) =>
  cx(baseContainerStyles, className);

const getGridStyles = ({ repeatCount }: { repeatCount: number }) => css`
  display: grid;
  grid-template-columns: repeat(${repeatCount}, 1fr);
  gap: ${spacing[400]}px;
  width: 100%;
`;

export const getVisibleChildrenContainerStyles = ({
  repeatCount,
}: {
  repeatCount: number;
}) => css`
  ${getGridStyles({ repeatCount })}
`;

export const childContainerStyles = css`
  width: 100%;
  height: fit-content;
`;

export const getExpandableWrapperStyles = ({
  isExpanded,
}: {
  isExpanded: boolean;
}) => css`
  display: grid;
  grid-template-rows: ${isExpanded ? '1fr' : '0fr'};
  transition: grid-template-rows ${TRANSITION_DURATION}ms ease-in-out;
  width: 100%;
`;

export const getExpandableChildrenContainerStyles = ({
  repeatCount,
}: {
  repeatCount: number;
}) => css`
  ${getGridStyles({ repeatCount })}
  overflow: hidden;
  min-height: 0;
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
