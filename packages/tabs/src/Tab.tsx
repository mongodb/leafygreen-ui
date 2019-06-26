import React from 'react';
import PropTypes from 'prop-types';

export interface TabProps {
  id: string;
  active?: boolean;
  title?: string;
  children?: React.ReactNode;
  disabled?: boolean;
  as?: React.ElementType<any>;
  handleChange: React.ReactEventHandler;
}

function Tab({
  id,
  active = false,
  title,
  children,
  disabled = false,
  as = 'div',
  handleChange,
}: TabProps) {
  if (!active) {
    return null;
  }

  const Root = as;

  return (
    <Root disabled={disabled} aria-disabled={disabled} id={id}>
      {children}
    </Root>
  );
}

Tab.displayName = 'Tab';

Tab.propTypes = {
  id: PropTypes.string,
  active: PropTypes.bool,
  title: PropTypes.string,
  content: PropTypes.node,
  disabled: PropTypes.bool,
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
};

export default Tab;
