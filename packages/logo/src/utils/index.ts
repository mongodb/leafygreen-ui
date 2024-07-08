import { css } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';

export const getAccessibleProps = ({
  role,
  'aria-label': ariaLabel,
}: {
  role: string;
  'aria-label': string;
}) => {
  if (role === 'img') {
    return {
      role: 'img',
      'aria-label': ariaLabel,
    };
  }

  return {
    role: 'presentation',
    alt: '',
    'aria-hidden': true,
  };
};

export const getColor = ({
  knockout,
  size,
  flat,
  gradient,
  darkMode,
}: {
  knockout: boolean;
  darkMode: boolean;
  size: number;
  flat: string;
  gradient: string;
}) => {
  let fill;

  if (!knockout) {
    if (size <= 10) {
      fill = flat;
    } else {
      fill = gradient;
    }
  } else {
    if (darkMode) {
      fill = palette.white;
    } else {
      fill = palette.black;
    }
  }

  return css`
    fill: ${fill};
  `;
};
