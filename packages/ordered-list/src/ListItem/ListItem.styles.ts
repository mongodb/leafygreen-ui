import { css } from '@leafygreen-ui/emotion';
import { createUniqueClassName, Theme } from '@leafygreen-ui/lib';
import { color, spacing, transitionDuration } from '@leafygreen-ui/tokens';

export const contentClassName = createUniqueClassName('content');
export const stepIconClassName = createUniqueClassName('step');

const STEP_SIZE = 20;

export const baseStyles = css`
  display: flex;
  gap: ${spacing[200]}px;
  margin-bottom: ${spacing[100]}px;

  &:last-of-type {
    .${contentClassName} {
      margin: 0;
    }
  }
`;

export const contentStyles = css`
  margin-block-end: ${spacing[400]}px;
  transition: margin-block-end ${transitionDuration.slowest}ms ease-in-out;
  width: 100%;
`;

export const stepStyles = css`
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid;
  transition: ${transitionDuration.default}ms ease;
  width: ${STEP_SIZE}px;
  height: ${STEP_SIZE}px;
  position: relative;
  font-size: 12px;
  font-weight: 500;
`;

export const titleStyles = css`
  font-weight: bold;
  line-height: unset;
`;

export const getThemedStateStyles = (theme: Theme) => css`
  color: ${color[theme].text.primary.default};
  background-color: rgba(255, 255, 255, 0);
  border-color: ${color[theme].border.primary.default};
`;
