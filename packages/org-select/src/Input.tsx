import React from 'react';
import { css } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import { createDataProp } from '@leafygreen-ui/lib';
import Icon from '@leafygreen-ui/icon';

const focusRing = createDataProp('focus-ring');

const containerStyle = css`
  position: relative;
  z-index: 0;
  height: 30px;
  margin: 0px 20px 12px 20px;
`;

const inputStyle = css`
  height: 30px;
  padding: 0px 24px 0px 12px;
  width: 100%;
  font-size: 14px;
  border: 1px solid ${uiColors.gray.base};
  border-radius: 5px;
  position: relative;
  z-index: 1;

  &: focus {
    outline: none;
  }

  &::placeholder {
    color: ${uiColors.gray.light1};
    font-family: 'Akzidenz', Helvetica, Arial, sans-serif;
  }
`;

const interactionRing = css`
  transition: transform 0.15s ease-in-out;
  background-color: ${uiColors.gray.light2};
  position: absolute;
  top: -3px;
  bottom: -3px;
  left: -3px;
  right: -3px;
  transform: scale(0.95, 0.75);
  border-radius: 8px;

  ${focusRing.selector}:hover + &,
  ${focusRing.selector}:focus + & {
    transform: scale(1);
  }

  ${focusRing.selector}:focus + & {
    background-color: #9dd0e7;
  }
`;

const magnifyingGlassStyle = css`
  position: absolute;
  top: 8px;
  right: 8px;
  color: ${uiColors.gray.base};
  z-index: 1;
`;

interface InputProps {
  onChange: React.ChangeEventHandler;
  onKeyDown: React.KeyboardEventHandler;
}

const Input = React.forwardRef(({ onChange, ...rest }: InputProps, ref) => {
  return (
    <li className={containerStyle} role="none">
      <input
        {...rest}
        {...focusRing.prop}
        placeholder="Search for an organization..."
        className={inputStyle}
        onChange={onChange}
        ref={ref as React.RefObject<HTMLInputElement>}
        aria-label="Search for an organization"
      />
      <div className={interactionRing} />
      <Icon glyph="MagnifyingGlass" className={magnifyingGlassStyle} />
    </li>
  );
});

Input.displayName = 'Input';

export default Input;
