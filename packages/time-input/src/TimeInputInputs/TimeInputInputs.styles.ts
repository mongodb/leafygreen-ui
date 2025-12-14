import { css, cx } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { color } from '@leafygreen-ui/tokens';

const twelveHourFormatStyles = css`
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
      [twelveHourFormatStyles]: !is12HourFormat,
    },
  );

export const getTwentyFourHourStyles = ({ theme }: { theme: Theme }) => css`
  color: ${color[theme].text.secondary.default};
  white-space: nowrap;
`;
