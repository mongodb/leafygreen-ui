
import React from 'react';
import { HTMLElementProps } from '@leafygreen-ui/lib';
import { css, cx } from '@leafygreen-ui/emotion';

const visuallyHidden = css`
  clip: rect(0, 0, 0, 0);
  clip-path: inset(50%);
  height: 1px;
  width: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
`

function VisuallyHidden({ children, className, ...rest }: HTMLElementProps<'div'>) {
  return <div {...rest} className={cx(visuallyHidden, className)}>{children}</div>;
}

VisuallyHidden.displayName = 'VisuallyHidden'

export default VisuallyHidden
