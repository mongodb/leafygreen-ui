import React from 'react';
import PropTypes from 'prop-types';

import { TabProps } from './Tab.types';

/**
 * # Tab
 *
 * Tab panel component
 *
 * ```
  <Tab name='First Tab'>Tab 1</Tab>
```
 * @param props.children Content that will appear inside of Tab panel.
 * @param props.disabled Boolean that determines if the Tab is disabled.
 * @param props.name Name that will appear in Tab List.
 * @param props.className Adds a className to the root element.
 * @param props.default If Tabs component is uncontrolled, this determines what Tab will be selected on first render.
 * @param props.href Destination when name is rendered as `a` tag.
 * @param props.to Destination when name is rendered as `Link` tag.
 *
 */
function Tab({ selected, children, ...rest }: TabProps) {
  // default and name are not an HTML properties
  // onClick applies to TabTitle component, not Tab component
  delete rest.default, delete rest.name, delete rest.onClick, delete rest.href;

  return (
    <div {...rest} role="tabpanel">
      {selected ? children : null}
    </div>
  );
}

Tab.displayName = 'Tab';

Tab.propTypes = {
  selected: PropTypes.bool,
  children: PropTypes.node,
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  content: PropTypes.node,
  disabled: PropTypes.bool,
  ariaControl: PropTypes.string,
};

export default Tab;
