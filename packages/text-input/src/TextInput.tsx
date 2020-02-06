import React from 'react';
import PropTypes from 'prop-types';

interface TextInputProps {
  label?: string;
  description?: string;
  optional?: boolean;
  disabled?: boolean;
  placeholder?: string;
}

const TextInput = React.forwardRef((props: TextInputProps, forwardRef) => {
  const {
    label = '',
    description = '',
    optional = false,
    disabled = false,
    placeholder = '',
  } = props;

  return (
    <div>
      <label>{label}</label>
      <p>{description}</p>
      <input type="text" name="text-input" required={!optional} disabled={disabled} placeholder={placeholder}/>
    </div>
  );
});

TextInput.displayName = 'TextInput';

// @ts-ignore: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/37660
TextInput.propTypes = {
  label: PropTypes.string,
  description: PropTypes.string,
  optional: PropTypes.bool,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
};

export default TextInput;
