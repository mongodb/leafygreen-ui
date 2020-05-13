import React, { SetStateAction } from 'react';
import Checkbox from '@leafygreen-ui/checkbox';
import { uiColors } from '@leafygreen-ui/palette';
import { css, cx } from '@leafygreen-ui/emotion';
import { SharedRowProps } from './utils';

const thStyles = css`
  width: 40px;
  border-width: 0px 1px 3px 1px;
  border-color: ${uiColors.gray.light2};
  border-style: solid;
`;

const innerDivStyles = css`
  display: flex;
  justify-content: center;
`;

const stickyHeader = css`
  position: sticky;
`;

export interface HeaderRowProps
  extends React.ComponentPropsWithoutRef<'tr'>,
    SharedRowProps {
  sticky?: boolean;
  indeterminate?: boolean;
  setCheckAll?: React.Dispatch<SetStateAction<boolean>>;
  setSelectable?: React.Dispatch<SetStateAction<boolean>>;
}

function HeaderRow({
  sticky = false,
  selectable = false,
  setCheckAll = () => false,
  setIndeterminate = () => {},
  setSelectable = () => {},
  children,
  checked,
  indeterminate,
  className,
  ...rest
}: HeaderRowProps) {
  React.useEffect(() => {
    setSelectable(selectable);
  }, [selectable]);

  const handleChange = () => {
    if (!checked) {
      setIndeterminate(false);
    }

    setCheckAll(curr => !curr);
  };

  return (
    <tr {...rest} className={cx({ [stickyHeader]: sticky }, className)}>
      {selectable && (
        <th className={thStyles}>
          <div className={innerDivStyles}>
            <Checkbox
              checked={checked}
              indeterminate={indeterminate}
              onChange={handleChange}
            />
          </div>
        </th>
      )}
      {children}
    </tr>
  );
}

HeaderRow.displayName = 'HeaderRow';

export default HeaderRow;
