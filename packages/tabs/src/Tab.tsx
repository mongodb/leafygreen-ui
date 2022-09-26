import React from 'react';
import PropTypes from 'prop-types';
import { HTMLElementProps } from '@leafygreen-ui/lib';

export interface TabProps extends HTMLElementProps<'div'> {
  /**
   * Content that will appear as the title in the Tab list.
   */
  name: React.ReactNode;

  /**
   * Content that will appear inside of Tab panel.
   */
  children?: React.ReactNode;

  /**
   * Boolean that determines if the Tab is disabled.
   * @default false
   */
  disabled?: boolean;

  /**
   * If Tabs component is uncontrolled, this determines what Tab will be selected on first render.
   */
  default?: boolean;

  /**
   * Adds a className to the root element.
   */
  className?: string;

  /**
   * Destination when name is rendered as `a` tag.
   */
  href?: string;

  /**
   * Destination when name is rendered as `Link` tag.
   */
  to?: string;

  /**
   * Whether this tab is currently selected
   */
  selected?: boolean;

  /**
   * TODO: remove, or do something with this
   * @internal
   */
  ariaControl?: string;

  // Done in order to support any Router system, such that TabTitle component can accept any URL destination prop.
  [key: string]: any;
}

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
