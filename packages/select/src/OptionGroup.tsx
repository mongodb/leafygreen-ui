import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { useIdAllocator } from '@leafygreen-ui/hooks';
import Option from './Option';
import SelectContext from './SelectContext';
import { colorSets } from './styleSets';
import { HTMLElementProps } from '@leafygreen-ui/lib';

const optionGroupStyle = css`
  padding: 8px 0;
`;

const optionGroupLabelStyle = css`
  cursor: default;
  width: 100%;
  padding: 0 12px 2px;
  outline: none;
  overflow-wrap: anywhere;
  font-size: 12px;
  line-height: 16px;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.4px;
`;

export type ReactEmpty = null | undefined | false | '';

export interface InternalProps extends HTMLElementProps<'div', HTMLDivElement> {
  className: string | undefined;
  label: string;
  children: React.ReactNode;
}

export function InternalOptionGroup({
  className,
  label,
  children,
  ...rest
}: InternalProps) {
  const { theme } = useContext(SelectContext);
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

interface Props extends HTMLElementProps<'div', HTMLDivElement> {
  className?: string;
  label: string;
  disabled?: boolean;
  children:
    | React.ReactFragment
    | React.ReactComponentElement<typeof Option>
    | Array<
        | React.ReactComponentElement<typeof Option>
        | React.ReactFragment
        | ReactEmpty
      >;
}

export default function OptionGroup(_: Props): JSX.Element {
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
