import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { transitionDuration } from '@leafygreen-ui/tokens';

export const iconButtonStyles = css`
  transition: transform ${transitionDuration.default}ms ease-in-out;
`;

export const iconFills = (theme: Theme, disabled: boolean) => {
  const fills = {
    [Theme.Dark]: disabled ? palette.gray.dark1 : palette.gray.light2,
    [Theme.Light]: disabled ? palette.gray.light1 : palette.gray.dark1,
  };

  return fills[theme];
};

export const rotatedStyles = css`
  transform: rotate(90deg);
`;
