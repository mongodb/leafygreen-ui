import React from 'react';
import PropTypes from 'prop-types';
import { HTMLElementProps } from '@leafygreen-ui/lib';
import omit from 'lodash/omit';

interface TextInputProps {
  label?: string;
  description?: string;
  inputField?: React.ReactNode;
  errorMessage?: string;
}

const TextInput = React.forwardRef((props: TextInputProps, forwardRef) => {
  const {
    label = '',
    description = '',
    inputField = null,
    errorMessage = '',
  } = props;

  const commonProps = {};

  const rest = omit(props, []);

  const renderTextInput = (Root: React.ElementType<any> = 'input') => (
    <Root
      ref={forwardRef}
      type={Root === 'input' ? 'input' : undefined}
      {...(rest as HTMLElementProps<any>)}
      {...commonProps}
    >
        {label}
        {description}
        {inputField}
        {errorMessage}
    </Root>
  );

  return renderTextInput();
});

TextInput.displayName = 'TextInput';

// @ts-ignore: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/37660
TextInput.propTypes = {
  label: PropTypes.string,
  description: PropTypes.string,
  inputField: PropTypes.node,
  errorMessage: PropTypes.string,
};

export default TextInput;
