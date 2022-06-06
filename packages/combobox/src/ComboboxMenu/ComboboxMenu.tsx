import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import Popover from '@leafygreen-ui/popover';
import { ComboboxContext } from '../ComboboxContext';

export const ComboboxMenu = () => {
  const { multiselect, disabled, darkMode, size, isOpen, withIcons } =
    useContext(ComboboxContext);

  return (
    <Popover
      active={isOpen && !disabled}
      spacing={4}
      align="bottom"
      justify="middle"
      refEl={comboboxRef}
      adjustOnMutation={true}
      className={menuWrapperStyle({ darkMode, size, width: menuWidth })}
      {...popoverProps}
    >
      <div
        id={menuId}
        role="listbox"
        aria-labelledby={labelId}
        aria-expanded={isOpen}
        ref={menuRef}
        className={menuStyle({ maxHeight })}
        onMouseDownCapture={e => e.preventDefault()}
      >
        {renderedMenuContents}
      </div>
    </Popover>
  );
};
