import React, { useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { IdAllocator } from '@leafygreen-ui/lib';
import Option from './Option';
import SelectContext from './SelectContext';
import { colorSets } from './styleSets';

const optionGroupStyle = css`
  padding-top: 8px;
`;

const optionGroupLabelStyle = css`
  cursor: default;
  width: 100%;
  padding: 0 12px 2px;
  outline: none;
  overflow-wrap: anywhere;
  font-size: 13px;
  line-height: 16px;
  font-weight: bold;
`;

export type ReactEmpty = null | undefined | false | '';

export interface InternalProps {
  className: string | undefined;
  label: string;
  children: React.ReactNode;
}

const idAllocator = IdAllocator.create('select-option-group');

export function InternalOptionGroup({
  className,
  label,
  children,
}: InternalProps) {
  const { mode } = useContext(SelectContext);
  const colorSet = colorSets[mode].option;

  const groupId = useMemo(() => idAllocator.generate(), []);

  return (
    <div
      className={cx(
        optionGroupStyle,
        css`
          border-bottom: 1px solid ${colorSet.group.border};
        `,
        className,
      )}
    >
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

interface Props {
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
