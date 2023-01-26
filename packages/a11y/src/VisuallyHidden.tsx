import React from 'react';
import PropTypes from 'prop-types';

import { css, cx } from '@leafygreen-ui/emotion';
import { HTMLElementProps } from '@leafygreen-ui/lib';

const visuallyHidden = css`
  clip: rect(0, 0, 0, 0);
  clip-path: inset(50%);
  height: 1px;
  width: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
`;

function VisuallyHidden({
  children,
  className,
  ...rest
}: HTMLElementProps<'div'>) {
  return (
    <div {...rest} className={cx(visuallyHidden, className)}>
      {children}
    </div>
  );
}

VisuallyHidden.displayName = 'VisuallyHidden';

VisuallyHidden.propTypes = {
  children: PropTypes.string,
  className: PropTypes.string,
};

export default VisuallyHidden;
