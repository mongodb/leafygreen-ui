import React from 'react';
import { css, cx } from '@leafygreen-ui/emotion';

const displayFlex = css`
  display: flex;
  flex-grow: 1;
`;

const centeredHorizontal = css`
  justify-content: center;
`;

const centeredVertical = css`
  align-items: center;
`;

interface CenteredProps {
  children: React.ReactNode;
  horizontal?: boolean;
  vertical?: boolean;
}

function Centered({
  children,
  horizontal = false,
  vertical = false,
}: CenteredProps) {
  return (
    <div
      className={cx(displayFlex, {
        [centeredHorizontal]: horizontal,
        [centeredVertical]: vertical,
      })}
    >
      {children}
    </div>
  );
}

export default Centered;
