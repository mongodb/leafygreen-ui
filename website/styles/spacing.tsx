import { css } from 'emotion';
import { spacing } from '@leafygreen-ui/tokens';

function generator(
  size: number,
  modifier: string,
  boxType: 'padding' | 'margin',
) {
  return {
    [`t${modifier}`]: css`
      ${boxType}-top: ${size}px;
    `,
    [`b${modifier}`]: css`
      ${boxType}-bottom: ${size}px;
    `,
    [`l${modifier}`]: css`
      ${boxType}-left: ${size}px;
    `,
    [`r${modifier}`]: css`
      ${boxType}-right: ${size}px;
    `,
    [`x${modifier}`]: css`
      ${boxType}-left: ${size}px;
      ${boxType}-right: ${size}px;
    `,
    [`y${modifier}`]: css`
      ${boxType}-top: ${size}px;
      ${boxType}-bottom: ${size}px;
    `,
  };
}

export const margin = Object.entries(spacing).reduce((acc, spacer) => {
  const [modifier, space] = spacer;
  return { ...acc, ...generator(space, modifier, 'margin') };
}, {});

export const padding = Object.entries(spacing).reduce((acc, spacer) => {
  const [modifier, space] = spacer;
  return { ...acc, ...generator(space, modifier, 'padding') };
}, {});
