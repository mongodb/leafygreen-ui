import { useEffect, useState } from 'react';

import { DescendantContext, useDescendant } from '../DescendantContext';
import { HighlightBehavior } from '../Dropdown/Dropdown.types';
import { useHighlightContext } from '../HighlightContext';

export const useFocusableDropdownItem = ({
  disabled,
}: {
  disabled?: boolean;
}) => {
  const { index, ref } = useDescendant(DescendantContext, { disabled });
  const { highlightBehavior, highlightedElement, setHighlightedElement } =
    useHighlightContext();
  const [_, force] = useState({});

  useEffect(() => {
    if (index && index < 0) {
      force({});
    }
  }, [index]);

  const onFocus = () => {
    if (highlightBehavior === HighlightBehavior.Focus) {
      setHighlightedElement?.(ref.current);
    }
  };

  const highlighted = highlightedElement === ref.current;

  const onBlur = () => {
    if (highlightBehavior === HighlightBehavior.Focus) {
      setHighlightedElement?.(null);
    }
  };

  return {
    ref,
    index,
    onFocus,
    onBlur,
    tabIndex: -1,
    highlighted,
    ['aria-selected']: highlighted,
  };
};
