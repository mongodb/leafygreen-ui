import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import { HTMLElementProps, createDataProp } from '@leafygreen-ui/lib';
import MagnifyingGlassIcon from '@leafygreen-ui/icon/dist/MagnifyingGlass';
import { Variant } from '../types';

const focusRing = createDataProp('focus-ring');

const containerStyle = css`
  position: relative;
  z-index: 0;
  height: 30px;
  margin: 0px 15px 12px 15px;
  box-sizing: border-box;
`;

const inputStyle = css`
  box-sizing: border-box;
  height: 30px;
  padding: 0px 24px 0px 12px;
  width: 100%;
  font-size: 14px;
  border: 1px solid ${uiColors.gray.base};
  border-radius: 5px;
  position: relative;
  z-index: 1;
  font-family: 'Akzidenz', Helvetica, Arial, sans-serif;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: ${uiColors.gray.base};
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
    background-color: ${uiColors.focus};
  }
`;

const magnifyingGlassStyle = css`
  position: absolute;
  top: 8px;
  right: 8px;
  color: ${uiColors.gray.base};
  z-index: 1;
`;

type InputProps = HTMLElementProps<'input'> & {
  onChange: React.ChangeEventHandler;
  onKeyDown: React.KeyboardEventHandler;
  variant: Variant;
};

const Input = React.forwardRef(({ variant, ...rest }: InputProps, ref) => {
  const placeholderVariant =
    variant === Variant.Organization ? 'an Organization' : 'a Project';
  const placeholder = `Search for ${placeholderVariant}...`;

  return (
    <li className={containerStyle} role="none">
      <input
        {...rest}
        {...focusRing.prop}
        placeholder={placeholder}
        className={inputStyle}
        ref={ref as React.RefObject<HTMLInputElement>}
        aria-label={placeholder}
        type="search"
      />
      <div className={interactionRing} />
      <MagnifyingGlassIcon className={magnifyingGlassStyle} />
    </li>
  );
});

Input.displayName = 'Input';

Input.propTypes = {
  onChange: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func.isRequired,
};

export default Input;
