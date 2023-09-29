import React from 'react';
import PropTypes from 'prop-types';

import { css, cx } from '@leafygreen-ui/emotion';
import { useIdAllocator } from '@leafygreen-ui/hooks';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

import { colorSets } from '../styleSets';

import { optionGroupLabelStyle, optionGroupStyle } from './OptionGroup.styles';
import { InternalOptionProps, OptionGroupProps } from './OptionGroup.types';

export function InternalOptionGroup({
  className,
  label,
  children,
  ...rest
}: InternalOptionProps) {
  const { theme } = useDarkMode();
  const colorSet = colorSets[theme].option;

  const groupId = useIdAllocator({ prefix: 'select-option-group' });

  return (
    <div className={cx(optionGroupStyle, className)} {...rest}>
      <div
        id={groupId}
        className={cx(
          optionGroupLabelStyle,
          css`
            color: ${colorSet.group.label};
          `,
        )}
      >
        {label}
      </div>
      <div role="group" aria-labelledby={groupId}>
        {children}
      </div>
    </div>
  );
}

InternalOptionGroup.displayName = 'OptionGroup';

export function OptionGroup(_: OptionGroupProps): JSX.Element {
  throw Error('`OptionGroup` must be a child of a `Select` instance');
}

OptionGroup.displayName = 'OptionGroup';

OptionGroup.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.oneOf([false, null, undefined, '']),
        PropTypes.element,
      ]),
    ),
  ]).isRequired,
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};

export type OptionGroupElement = React.ReactComponentElement<
  typeof OptionGroup
>;
