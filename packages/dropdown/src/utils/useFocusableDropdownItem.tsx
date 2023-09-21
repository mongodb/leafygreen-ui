import { useEffect, useState } from 'react';

import { DescendantContext, useDescendant } from '../DescendantContext';
import { HighlightBehavior } from '../Dropdown/Dropdown.types';
import { useHighlightContext } from '../HighlightContext';

export const useFocusableDropdownItem = () => {
  const { index, ref } = useDescendant(DescendantContext, {});
  const { highlightBehavior, highlightedRef, setHighlightedRef } =
    useHighlightContext();
  const [_, force] = useState({});

  useEffect(() => {
    if (index && index < 0) {
      force({});
    }
  }, [index]);

  const onFocus = () => {
    if (highlightBehavior === HighlightBehavior.Focus) {
      setHighlightedRef?.(ref.current);
    }
  };

  const highlighted = highlightedRef === ref.current;

  const onBlur = () => {
    if (highlightBehavior === HighlightBehavior.Focus) {
      setHighlightedRef?.(null);
    }
  };

  return {
    ref,
    onFocus,
    onBlur,
    tabIndex: -1,
    ['aria-selected']: highlighted,
  };
};
