import { css } from '@leafygreen-ui/emotion';
import { createUniqueClassName, Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { transitionDuration } from '@leafygreen-ui/tokens';

import { State } from '../VerticalStep/VerticalStep.types';

export const stepIconClassName = createUniqueClassName('step');

const STEP_SIZE = 20;

export const getStepWrapperStyles = (isCompleted: boolean) => css`
  position: relative;

  &::after {
    background: ${isCompleted ? palette.green.dark1 : palette.gray.base};
    position: absolute;
    width: 1px;
    height: calc(100% - ${STEP_SIZE}px);
    left: 50%;
    transition: background ${transitionDuration.default}ms ease;
  }
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

export const themedStateColor = {
  [Theme.Dark]: {
    [State.Future]: palette.gray.light1,
    [State.Completed]: palette.black,
    [State.Current]: palette.green.base,
  },
  [Theme.Light]: {
    [State.Future]: palette.gray.dark1,
    [State.Completed]: palette.white,
    [State.Current]: palette.green.dark2,
  },
};

export const themedStateBgColor = {
  [Theme.Dark]: {
    [State.Future]: 'rgba(255, 255, 255, 0)',
    [State.Completed]: palette.green.base,
    [State.Current]: 'rgba(255, 255, 255, 0)',
  },
  [Theme.Light]: {
    [State.Future]: 'rgba(255, 255, 255, 0)',
    [State.Completed]: palette.green.dark1,
    [State.Current]: 'rgba(255, 255, 255, 0)',
  },
};

export const themedStateBorderColor = {
  [Theme.Dark]: {
    [State.Future]: palette.gray.light1,
    [State.Completed]: palette.green.base,
    [State.Current]: palette.green.base,
  },
  [Theme.Light]: {
    [State.Future]: palette.gray.base,
    [State.Completed]: palette.green.dark1,
    [State.Current]: palette.green.dark1,
  },
};

export const getThemedStateStyles = (theme: Theme, state: State) => css`
  color: ${themedStateColor[theme][state]};
  background-color: ${themedStateBgColor[theme][state]};
  border-color: ${themedStateBorderColor[theme][state]};
`;
