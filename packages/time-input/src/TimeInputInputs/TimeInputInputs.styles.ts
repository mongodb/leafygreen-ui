import { css, cx } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { color } from '@leafygreen-ui/tokens';

const twentyFourHourFormatStyles = css`
  align-items: center;
  gap: 12px;
`;

export const getWrapperStyles = ({
  is12HourFormat,
}: {
  is12HourFormat: boolean;
}) =>
  cx(
    css`
      display: flex;
      position: relative;
      z-index: 0; // Establish new stacking context
    `,
    {
      [twentyFourHourFormatStyles]: !is12HourFormat,
    },
  );

const getDisabledThemeStyles = (theme: Theme) => css`
  color: ${color[theme].text.disabled.default};
`;

export const getTwentyFourHourStyles = ({
  theme,
  disabled,
}: {
  theme: Theme;
  disabled: boolean;
}) =>
  cx(
    css`
      color: ${color[theme].text.secondary.default};
      white-space: nowrap;
    `,
    {
      [getDisabledThemeStyles(theme)]: disabled,
    },
  );
