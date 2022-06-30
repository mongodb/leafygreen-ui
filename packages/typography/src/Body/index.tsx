import React from 'react';
import { css, cx } from '@leafygreen-ui/emotion';
import { bodyTypeScaleStyles } from './styles';
import { useUpdatedBaseFontSize } from '../useUpdatedBaseFontSize';
import BaseTypography, {
  BaseTypographyProps,
} from '../BaseTypography/BaseTypography';

/**
 * Body
 */

type BodyFontWeight = 'regular' | 'medium';
type BodyProps<T extends keyof JSX.IntrinsicElements> =
  BaseTypographyProps<T> & {
    /**
     * font-weight applied to typography element
     * default: `regular`
     */
    weight?: BodyFontWeight;
  };

const fontWeights: Record<
  'default' | 'strong',
  Record<BodyFontWeight, number>
> = {
  default: {
    regular: 400,
    medium: 500,
  },
  strong: {
    regular: 700,
    medium: 700,
  },
} as const;

export function Body<T extends keyof JSX.IntrinsicElements>({
  darkMode: darkModeProp,
  className,
  weight = 'regular' as BodyFontWeight,
  ...rest
}: BodyProps<T>) {
  const baseFontSize = useUpdatedBaseFontSize();

  // Currently hardcoding selectors to keys; could consider a dynamic solution that runs once
  const fontWeight = css`
    font-weight: ${fontWeights['default'][weight]};
    strong,
    b {
      font-weight: ${fontWeights['strong'][weight]};
    }
  `;

  return (
    <BaseTypography
      className={cx(bodyTypeScaleStyles[baseFontSize], fontWeight, className)}
      {...rest}
    />
  );
}

Body.displayName = 'Body';

export default Body;
