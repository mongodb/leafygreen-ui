import { useMemo, useRef, useState } from 'react';

import {
  useIsomorphicLayoutEffect,
  useObjectDependency,
} from '@leafygreen-ui/hooks';

import { getElementDocumentPosition } from './utils/positionUtils';
import { PopoverProps, UseReferenceElementReturnObj } from './Popover.types';

export function useReferenceElement(
  refEl?: PopoverProps['refEl'],
  scrollContainer?: PopoverProps['scrollContainer'],
): UseReferenceElementReturnObj {
  const placeholderRef = useRef<HTMLSpanElement | null>(null);
  const [referenceElement, setReferenceElement] = useState<HTMLElement | null>(
    null,
  );

  useIsomorphicLayoutEffect(() => {
    if (refEl && refEl.current) {
      setReferenceElement(refEl.current);
    }

    const placeholderEl = placeholderRef?.current;
    const maybeParentEl = placeholderEl !== null && placeholderEl?.parentNode;

    if (maybeParentEl && maybeParentEl instanceof HTMLElement) {
      setReferenceElement(maybeParentEl);
    }
  }, [placeholderRef.current, refEl?.current]);

  const referenceElDocumentPos = useObjectDependency(
    useMemo(
      () => getElementDocumentPosition(referenceElement, scrollContainer, true),
      [referenceElement, scrollContainer],
    ),
  );

  return {
    placeholderRef,
    referenceElement,
    referenceElDocumentPos,
    renderHiddenPlaceholder: !refEl,
  };
}
