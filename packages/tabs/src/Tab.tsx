import React from 'react';
import PropTypes from 'prop-types';
import { HTMLElementProps } from '@leafygreen-ui/lib';

export interface TabProps extends HTMLElementProps<'a'> {
  /**
   * Value supplied to the data-tab-id attribute. Used to determine what Tab is active.
   */
  value: string;

  /**
   * Content that will appear as the title in the Tab list.
   */
  title: string;

  /**
   * Content that will appear inside of Tab panel.
   */
  children?: React.ReactNode;

  /**
   * Boolean that determines if the Tab is disabled.
   */
  disabled?: boolean;

  /**
   * If Tabs component is uncontrolled, this determines what Tab will be active on first render.
   */
  default?: boolean;

  /**
   * Value supplied to aria-control attribute.
   */
  className?: string;

  active?: boolean;

  index?: number;

  ariaControl?: string;
}

/**
 * # Tab
 *
 * Tab panel component
 *
 * ```
  <Tab value='tab-1' title='First Tab'>Tab 1</Tab>
```
 * @param props.value Value supplied to the data-tab-id attribute. Used to determine what Tab is active.
 * @param props.active Set internally. Used to determine if the Tab is active.
 * @param props.children Content that will appear inside of Tab panel.
 * @param props.disabled Boolean that determines if the Tab is disabled.
 * @param props.title Title that will appear in Tab List.
 * @param props.ariaControl Value supplied to aria-control attribute.
 * @param props.default If Tabs component is uncontrolled, this determines what Tab will be active on first render.
 */
function Tab({
  value,
  active,
  children,
  disabled = false,
  ariaControl,
  ...rest
}: TabProps) {
  if (!active) {
    return null;
  }

  // default and title are not an HTML properties
  delete rest.default, rest.title;

  return (
    <div
      {...rest}
      aria-disabled={disabled}
      aria-selected={active}
      aria-controls={ariaControl}
      data-tab-id={value}
      role="tabpanel"
    >
      {children}
    </div>
  );
}

Tab.displayName = 'Tab';

Tab.propTypes = {
  value: PropTypes.string,
  active: PropTypes.bool,
  children: PropTypes.node,
  title: PropTypes.string,
  content: PropTypes.node,
  disabled: PropTypes.bool,
  ariaControl: PropTypes.string,
};

export default Tab;
