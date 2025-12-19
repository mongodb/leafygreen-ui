import { css, cx } from '@leafygreen-ui/emotion';

// When the time input is in 12 hour format, the input is rendered with a select input to the right of the input. To make these two elements appear seamlessly next to each other, we need to remove the right border radius of the input.
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
