import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { spacing } from '@leafygreen-ui/tokens';

export const iconButtonStyles = css`
  /* width: 16px; // match the icon size
  height: 16px; // match the icon size */
  /* margin-right: ${spacing[2]}px; */
`;

export const iconFills = (theme: Theme, disabled: boolean) => {
  const fills = {
    [Theme.Dark]: disabled ? palette.gray.dark1 : palette.gray.light2,
    [Theme.Light]: disabled ? palette.gray.light1 : palette.gray.dark1,
  };

  return fills[theme];
};
