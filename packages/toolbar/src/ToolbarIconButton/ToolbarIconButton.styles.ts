import { css, cx } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { spacing } from '@leafygreen-ui/tokens';

export const getBaseStyles = ({ active }: { active: boolean }) =>
  cx(css`
    padding: 0;
    margin: 0;
    height: ${spacing[1200]}px;
    display: flex;
    align-items: center;
  `);

export const baseIconButtonStyles = css`
  &,
  &:hover,
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
}: {
  active: boolean;
  theme: Theme;
}) =>
  cx(
    css`
      ${baseIconButtonStyles}
    `,
    {
      [getIconButtonActiveStyles({ theme })]: active,
    },
  );
