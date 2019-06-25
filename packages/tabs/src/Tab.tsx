import React from 'react';
import PropTypes from 'prop-types';

export interface TabProps {
  id: string;
  active?: boolean;
  title?: string;
  children?: React.ReactNode;
  disabled?: boolean;
  as?: React.ElementType<any>;
  onChange?: (e) => void;
}

function Tab({
  id,
  active = false,
  title,
  children,
  disabled = false,
  onChange,
  as = 'div',
}: TabProps) {
  const Root = as;

  return(
    <Root id={id}>{children}</Root>
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
