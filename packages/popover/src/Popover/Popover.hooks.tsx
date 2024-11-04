import React, { useMemo, useRef, useState } from 'react';

import {
  useIsomorphicLayoutEffect,
  useObjectDependency,
} from '@leafygreen-ui/hooks';
import {
  useMigrationContext,
  usePopoverPortalContainer,
  usePopoverPropsContext,
} from '@leafygreen-ui/leafygreen-provider';

import { getElementDocumentPosition } from '../utils/positionUtils';

import {
  PopoverProps,
  RenderMode,
  UseContentNodeReturnObj,
  UseReferenceElementReturnObj,
} from './Popover.types';

/**
 * This hook handles logic for determining what prop values are used for the `Popover`
 * component. If a prop is not provided, the value from the `PopoverContext` will be used.
 */
export function usePopoverProps({
  renderMode: renderModeProp,
  dismissMode,
  onToggle,
  portalClassName,
  portalContainer,
  portalRef,
  scrollContainer,
  onEnter,
  onEntering,
  onEntered,
  onExit,
  onExiting,
  onExited,
  popoverZIndex: popoverZIndexProp,
  spacing,
  ...rest
}: Partial<
  Omit<
    PopoverProps,
    | 'active'
    | 'adjustOnMutation'
    | 'align'
    | 'children'
    | 'className'
    | 'justify'
    | 'refEl'
  >
>) {
  const { forceUseTopLayer } = useMigrationContext();
  const context = usePopoverPropsContext();
  const popoverPortalContext = usePopoverPortalContainer();

  const renderMode = forceUseTopLayer
    ? RenderMode.TopLayer
    : renderModeProp || context.renderMode || RenderMode.TopLayer;
  const usePortal = renderMode === RenderMode.Portal;
  const useTopLayer = renderMode === RenderMode.TopLayer;

  const topLayerProps = useTopLayer
    ? {
        dismissMode: dismissMode || context.dismissMode,
        onToggle: onToggle || context.onToggle,
      }
    : {};

  const portalProps = usePortal
    ? {
        portalClassName: portalClassName || context.portalClassName,
        portalContainer:
          portalContainer ||
          context.portalContainer ||
          popoverPortalContext.portalContainer,
        portalRef: portalRef || context.portalRef,
        scrollContainer:
          scrollContainer ||
          context.scrollContainer ||
          popoverPortalContext.scrollContainer,
      }
    : {};

  const reactTransitionGroupProps = {
    onEnter: onEnter || context.onEnter,
    onEntering: onEntering || context.onEntering,
    onEntered: onEntered || context.onEntered,
    onExit: onExit || context.onExit,
    onExiting: onExiting || context.onExiting,
    onExited: onExited || context.onExited,
  };

  const styleProps = {
    popoverZIndex: useTopLayer
      ? undefined
      : popoverZIndexProp || context.popoverZIndex,
    spacing: spacing || context.spacing,
  };

  return {
    renderMode,
    usePortal,
    ...topLayerProps,
    ...portalProps,
    ...reactTransitionGroupProps,
    ...styleProps,
    ...rest,
  };
}

/**
 * This hook handles logic for determining the reference element for the popover element.
 * 1. If a `refEl` is provided, the ref value is used as the reference element.
 * 2. As a fallback, a hidden placeholder element is rendered, and the parent element of the
 *    placeholder is used as the reference element.
 *
 * Additionally, this hook calculates the document position of the reference element.
 */
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
      return;
    }

    const placeholderEl = placeholderRef?.current;
    const maybeParentEl = placeholderEl !== null && placeholderEl?.parentNode;

    if (maybeParentEl && maybeParentEl instanceof HTMLElement) {
      setReferenceElement(maybeParentEl);
      return;
    }
  }, [placeholderRef.current, refEl]);

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
  };
}

export function useContentNode(): UseContentNodeReturnObj {
  const [contentNode, setContentNode] = React.useState<HTMLDivElement | null>(
    null,
  );

  const contentNodeRef = useRef(contentNode);
  contentNodeRef.current = contentNode;

  return {
    contentNode,
    contentNodeRef,
    setContentNode,
  };
}
