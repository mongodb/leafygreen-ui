import React, { useEffect } from 'react';
import Checkbox from '@leafygreen-ui/checkbox';
import { css } from '@leafygreen-ui/emotion';
import { useRowContext, RowTypes } from './RowContext';
import Cell from './Cell';

const checkBoxCellStyles = css`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
`;

export default function CheckboxCell({
  index,
  disabled,
}: {
  index: string;
  disabled: boolean;
}) {
  const {
    state: { rowState },
    dispatch: rowDispatch,
  } = useRowContext();

  useEffect(() => {
    rowDispatch({
      type: RowTypes.RegisterRow,
      payload: {
        index,
        checked: false,
        disabled: disabled,
      },
    });
  }, []);

  useEffect(() => {
    rowDispatch({
      type: RowTypes.RegisterRow,
      payload: {
        index,
        disabled,
      },
    });
  }, [disabled]);

  const onChange = () => {
    rowDispatch({
      type: RowTypes.ToggleIndividualChecked,
      payload: {
        index,
        checked: !rowState[index].checked,
      },
    });
  };

  const checkboxProps = {
    onChange,
    disabled,
    checked: !!rowState[index]?.checked,
  };

  return (
    <Cell>
      <div className={checkBoxCellStyles}>
        <Checkbox {...checkboxProps} />
      </div>
    </Cell>
  );
}
