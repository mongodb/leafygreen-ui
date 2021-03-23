import React, { useRef, useEffect } from 'react';
import { storiesOf } from '@storybook/react';
import { css } from '@leafygreen-ui/emotion';
import { registerRipple } from '.';
import { select, boolean } from '@storybook/addon-knobs';
import { Variant } from './utils';

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

function ButtonDemo({
  variant,
  darkMode,
}: {
  variant: Variant;
  darkMode: boolean;
}) {
  const refOne = useRef<HTMLButtonElement>(null);
  const refTwo = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (refOne.current != null) {
      registerRipple(refOne.current, { variant, darkMode });
    }
  }, [refOne, variant, darkMode]);

  useEffect(() => {
    if (refTwo.current != null) {
      registerRipple(refTwo.current, { variant: 'danger', darkMode: false });
    }
  }, [refTwo]);

  return (
    <div>
      <button ref={refOne} className={buttonClassName}>
        Click me!!!!
      </button>
      <button ref={refTwo} className={buttonClassName}>
        Will always be a danger button! No matter what!
      </button>
    </div>
  );
}

storiesOf('Ripple', module).add('Default', () => {
  const variant = select('Variant', Object.values(Variant), Variant.Primary);
  const darkMode = boolean('darkMode', false);

  return <ButtonDemo variant={variant} darkMode={darkMode} />;
});
