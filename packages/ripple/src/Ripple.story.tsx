import React, { useRef, useEffect } from 'react';
import { storiesOf } from '@storybook/react';
import { css } from '@leafygreen-ui/emotion';
import { registerRipple } from '.';
import { button } from '@storybook/addon-knobs';

const buttonClassName = css`
  display: inline-block;
  overflow: hidden;
  position: relative;
  text-decoration: none;
  border-radius: 4px;
  transition: 0.3s;
  border: none;
  font-size: 14px;
  text-align: center;
  background-color: #f9fbfa;
  color: #3d4f58;
  box-shadow: 0px 1px 2px 0px rgba(6, 22, 33, 0.4);
  border: 1px solid #89979b;
  padding: 7px 12px 8px 12px;
`;

function ButtonDemo() {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      registerRipple(ref.current, {});
    }
  });

  return (
    <button ref={ref} className={buttonClassName}>
      Click me!!!!
    </button>
  );
}

storiesOf('Ripple', module).add('Default', () => <ButtonDemo />);
