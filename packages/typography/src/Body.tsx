import React from 'react';
import Box from '@leafygreen-ui/box';
import { css, cx } from '@leafygreen-ui/emotion';
import { HTMLElementProps } from '@leafygreen-ui/lib';
import { sharedStyles, typeScale1, typeScale2 } from './styles';
import { useBaseFontSize } from '@leafygreen-ui/leafygreen-provider';

/**
 * Body
 */

type BodyFontWeight = 'regular' | 'medium';
type BodyProps<T extends keyof JSX.IntrinsicElements> = HTMLElementProps<T> & {
  /**
   * font-weight applied to typography element
   * default: `regular`
   */
  weight?: BodyFontWeight;
  as?: T;
};

function Body<T extends keyof JSX.IntrinsicElements>({
  className,
  weight = 'regular',
  as = 'p' as T,
  ...rest
}: BodyProps<T>) {
  const size = useBaseFontSize();
  const body = size === 16 ? typeScale2 : typeScale1;
  const fontWeights: {
    [key: string]: {
      [key in BodyFontWeight]: number;
    };
  } = {
    default: {
      regular: 400,
      medium: 500,
    },
    strong: {
      regular: 700,
      medium: 800,
    },
  } as const;

  // Currently hardcoding selectors to keys; could consider a dynamic solution that runs once
  const fontWeight = css`
    font-weight: ${fontWeights['default'][weight]};
    strong,
    b {
      font-weight: ${fontWeights['strong'][weight]};
    }
  `;

  return (
    <Box
      as={as}
      className={cx(sharedStyles, body, fontWeight, className)}
      {...rest}
    />
  );
}

Body.displayName = 'Body';

export default Body;
