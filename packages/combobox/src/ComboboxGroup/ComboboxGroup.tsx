import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { cx } from '@leafygreen-ui/emotion';
import { useIdAllocator } from '@leafygreen-ui/hooks';

import { ComboboxGroupProps } from '../Combobox.types';
import { ComboboxContext } from '../ComboboxContext';

import {
  comboboxGroupLabel,
  comboboxGroupLabelThemeStyle,
  comboboxGroupStyle,
} from './ComboboxGroup.styles';

export function InternalComboboxGroup({
  label,
  className,
  children,
}: ComboboxGroupProps): JSX.Element {
  const { theme } = useContext(ComboboxContext);

  const groupId = useIdAllocator({ prefix: 'combobox-group' });
  const childCount = React.Children.count(children);

  return childCount > 0 ? (
    <div className={cx(comboboxGroupStyle[theme], className)}>
      <div
        className={cx(comboboxGroupLabel, comboboxGroupLabelThemeStyle[theme])}
        id={groupId}
      >
        {label}
      </div>
      <div role="group" aria-labelledby={groupId}>
        {children}
      </div>
    </div>
  ) : (
    <></>
  );
}

ComboboxGroup.displayName = 'ComboboxGroup';

ComboboxGroup.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
};

export function ComboboxGroup(_: ComboboxGroupProps): JSX.Element {
  throw Error('`ComboboxGroup` must be a child of a `Combobox` instance');
}
