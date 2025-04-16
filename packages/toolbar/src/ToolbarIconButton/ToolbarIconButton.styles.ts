import { css, cx } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { spacing } from '@leafygreen-ui/tokens';

export const baseIconButtonStyles = css`
  &,
  &:hover,
  &[data-hover='true'],
  &::before {
    border-radius: 6px;
  }
`;

export const getIconButtonActiveStyles = ({ theme }: { theme: Theme }) =>
  cx(
    css`
      background: ${theme === Theme.Light
        ? palette.green.light3
        : palette.green.dark3};

      color: ${theme === Theme.Light
        ? palette.green.dark2
        : palette.green.light1};
    `,
  );

export const getIconButtonStyles = ({
  active,
  theme,
  disabled,
}: {
  active: boolean;
  theme: Theme;
  disabled: boolean;
}) =>
  cx(
    css`
      ${baseIconButtonStyles}
    `,
    {
      [getIconButtonActiveStyles({ theme })]: active && !disabled,
    },
  );

export const triggerStyles = css`
  display: flex;
  height: ${spacing[1200]}px;
  align-items: center;
`;
