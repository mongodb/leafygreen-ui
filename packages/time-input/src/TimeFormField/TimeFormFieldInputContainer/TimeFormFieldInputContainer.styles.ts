import { css, cx } from '@leafygreen-ui/emotion';

const selectStyles = css`
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
`;

const baseStyles = css`
  &:hover,
  &:focus-within {
    z-index: 1;
  }
`;

export const getContainerStyles = ({
  is12HourFormat,
}: {
  is12HourFormat: boolean;
}) =>
  cx(baseStyles, {
    [selectStyles]: is12HourFormat,
  });
