import { css } from 'emotion';
import { spacing } from '@leafygreen-ui/tokens';

type Position = 't' | 'b' | 'l' | 'r' | 'x' | 'y';
type Modifier = keyof typeof spacing;
type Combined = `${Position}${Modifier}`; 

function generator(
  size: number,
  modifier: Modifier,
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
  } as const;
}

export const margin: Partial<Record<Combined, string>> = Object.entries(spacing).reduce((acc, spacer) => {
  const [modifier, space] = spacer;
  return {
    ...acc,
    ...generator(space, (modifier as unknown) as Modifier, 'margin'),
  };
}, {});

export const padding: Partial<Record<Combined, string>>  = Object.entries(spacing).reduce((acc, spacer) => {
  const [modifier, space] = spacer;
  return {
    ...acc,
    ...generator(space, (modifier as unknown) as Modifier, 'padding'),
  };
}, {});
