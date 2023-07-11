import React, { forwardRef } from 'react';

import { css, cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { createUniqueClassName, HTMLElementProps } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { useUpdatedBaseFontSize } from '@leafygreen-ui/typography';

import { getCommonCellStyles } from './styles';

export const tdInnerDivClassName = createUniqueClassName('td-inner-div');

/**
 * @deprecated
 */
interface HeaderCellProps
  extends React.PropsWithChildren<
    HTMLElementProps<'th', HTMLTableHeaderCellElement>
  > {
  /**
   * Renders the cell as a th element
   */
  isHeader: true;

  /**
   * Determines whether the cell renders as disabled
   */
  isDisabled?: boolean;
}

/**
 * @deprecated
 */
interface TableCellProps
  extends React.PropsWithChildren<
    HTMLElementProps<'td', HTMLTableCellElement>
  > {
  /**
   * Determines whether the cell renders as disabled
   */
  isDisabled?: boolean;
  /**
   * Renders the cell as a th element
   */
  isHeader?: false;
}

/**
 * @deprecated
 */
type CellProps = HeaderCellProps | TableCellProps;

const baseStyles = css`
  position: relative;
`;

const thStyles = css`
  font-weight: 600;
`;

const lightModeThStyles = css`
  border-right: 3px solid ${palette.gray.light2};
  background-color: ${palette.gray.light3};
`;

const darkModeThStyles = css`
  border-right: 3px solid ${palette.gray.dark2};
  background-color: ${palette.gray.dark4};
`;

const innerDivStyles = css`
  display: flex;
  align-items: center;
`;

const lightModeDisabledHeaderStyles = css`
  border-top: 1px solid ${palette.gray.light3};
  border-bottom: 1px solid ${palette.gray.light3};
  color: ${palette.black};
  cursor: auto;
`;

const darkModeDisabledHeaderStyles = css`
  color: ${palette.white};
  cursor: auto;
`;

/**
 * @deprecated
 */
export type CellElement = React.ReactComponentElement<typeof Cell>;

/**
 * @deprecated
 */
const Cell = forwardRef(
  (
    { children, className, isHeader = false, isDisabled, ...rest }: CellProps,
    ref: React.Ref<HTMLTableHeaderCellElement | HTMLTableCellElement>,
  ) => {
    const Root = isHeader ? 'th' : 'td';

    const baseFontSize = useUpdatedBaseFontSize();
    const { darkMode } = useDarkMode();

    const props: Partial<CellProps> = {
      ref,
      className: cx(
        getCommonCellStyles(baseFontSize),
        baseStyles,
        {
          [thStyles]: isHeader,
          [lightModeThStyles]: isHeader && !darkMode,
          [darkModeThStyles]: isHeader && darkMode,
          [lightModeDisabledHeaderStyles]: isHeader && isDisabled && !darkMode,
          [darkModeDisabledHeaderStyles]: isHeader && isDisabled && darkMode,
        },
        className,
      ),
    };

    if (isHeader) {
      props.scope = 'row';
      props.role = 'rowheader';
    }

    return (
      <Root {...props} {...rest}>
        <div className={cx(tdInnerDivClassName, innerDivStyles)}>
          <span
            className={css`
              display: flex;
            `}
          >
            {children}
          </span>
        </div>
      </Root>
    );
  },
);

Cell.displayName = 'Cell';

export default Cell;
