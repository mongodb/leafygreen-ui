import React, { forwardRef, ReactNode, useMemo, useRef, useState } from 'react';

import {
  useIsomorphicLayoutEffect,
  useMutationObserver,
  useObjectDependency,
  usePrevious,
  useViewportSize,
} from '@leafygreen-ui/hooks';

import {
  getElementDocumentPosition,
  getElementViewportPosition,
} from './utils/positionUtils';
import { contentClassName, hiddenPlaceholderStyle } from './Popover.styles';
import { Align, Justify, PopoverProps } from './Popover.types';

const mutationOptions = {
  // If attributes changes, such as className which affects layout
  attributes: true,
  // Watch if text changes in the node
  characterData: true,
  // Watch for any immediate children are modified
  childList: true,
  // Extend watching to entire sub tree to make sure we catch any modifications
  subtree: true,
};

interface UseReferenceElementReturnObj {
  /**
   * `HiddenPlaceholder` is used if `refEl` is undefined. The placeholder's parent is
   * used as the element against which the popover component will be positioned
   */
  HiddenPlaceholder: React.ForwardRefExoticComponent<
    React.RefAttributes<HTMLSpanElement>
  >;

  /**
   * Ref to access hidden placeholder element
   */
  placeholderRef: React.MutableRefObject<HTMLSpanElement | null>;

  /**
   * Element against which the popover component will be positioned
   */
  referenceElement: HTMLElement | null;

  /**
   * Boolean to determine if a hidden placeholder should be rendered
   */
  renderHiddenPlaceholder: boolean;
}

export function useReferenceElement(
  refEl?: PopoverProps['refEl'],
): UseReferenceElementReturnObj {
  const placeholderRef = useRef<HTMLSpanElement | null>(null);

  const referenceElement = useMemo(() => {
    if (refEl && refEl.current) {
      return refEl.current;
    }

    const placeholderEl = placeholderRef?.current;
    const maybeParentEl = placeholderEl !== null && placeholderEl?.parentNode;

    if (maybeParentEl && maybeParentEl instanceof HTMLElement) {
      return maybeParentEl;
    }

    return null;
  }, [placeholderRef.current, refEl?.current]);

  return {
    HiddenPlaceholder,
    placeholderRef,
    referenceElement,
    renderHiddenPlaceholder: !refEl,
  };
}

const HiddenPlaceholder = forwardRef<HTMLSpanElement, {}>((_, fwdRef) => {
  /**
   * Using \<span\> as placeholder to prevent validateDOMNesting warnings
   * Warnings will still show up if `usePortal` is false
   */
  return <span ref={fwdRef} className={hiddenPlaceholderStyle} />;
});

HiddenPlaceholder.displayName = 'HiddenPlaceholder';

interface UseContentNodeReturnObj {
  /**
   * `contentNode` is the direct child of the popover element and wraps the children. It
   * is used to calculate the position of the popover because its parent has a transition.
   * This prevents getting the width of the popover until the transition completes
   */
  contentNode: HTMLDivElement | null;

  /**
   * We shadow the `contentNode` onto this `contentNodeRef` as <Transition> from
   * react-transition-group only accepts useRef objects. Without this, StrictMode
   * warnings are produced by react-transition-group.
   */
  contentNodeRef: React.MutableRefObject<HTMLDivElement | null>;

  /**
   * `ContentWrapper` is used to wrap the children of the popover component. We need
   * an inner wrapper with a ref because placing the ref on the parent will create an
   * infinite loop in some cases when dynamic styles are applied.
   */
  ContentWrapper: React.ForwardRefExoticComponent<
    {
      children: ReactNode;
    } & React.RefAttributes<HTMLDivElement>
  >;

  /**
   * Dispatch method to attach `contentNode` to the `ContentWrapper`
   */
  setContentNode: React.Dispatch<React.SetStateAction<HTMLDivElement | null>>;
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
    ContentWrapper,
    setContentNode,
  };
}

const ContentWrapper = forwardRef<HTMLDivElement, { children: ReactNode }>(
  ({ children }, fwdRef) => {
    return (
      <div ref={fwdRef} className={contentClassName}>
        {children}
      </div>
    );
  },
);

ContentWrapper.displayName = 'ContentWrapper';

type UsePopoverPositioningProps = Pick<
  PopoverProps,
  'active' | 'adjustOnMutation' | 'align' | 'justify' | 'scrollContainer'
> & {
  contentNode: HTMLDivElement | null;
  referenceElement: HTMLElement | null;
};

export function usePopoverPositioning({
  active,
  adjustOnMutation,
  align = Align.Bottom,
  contentNode,
  justify = Justify.Start,
  referenceElement,
  scrollContainer,
}: UsePopoverPositioningProps) {
  /**
   * Don't render the popover initially since computing the position depends on the window
   * which isn't available if the component is rendered on server side.
   */
  const [isReadyToRender, setIsReadyToRender] = useState(false);
  const [forceUpdateCounter, setForceUpdateCounter] = useState(0);

  /**
   * We calculate the position of the popover when it becomes active, so it's only safe
   * for us to enable the mutation observers once the popover is active.
   */
  const observeMutations = adjustOnMutation && active;

  const viewportSize = useViewportSize();

  const lastTimeRefElMutated = useMutationObserver(
    referenceElement,
    mutationOptions,
    Date.now,
    observeMutations,
  );

  const lastTimeContentElMutated = useMutationObserver(
    contentNode?.parentNode as HTMLElement,
    mutationOptions,
    Date.now,
    observeMutations,
  );

  // We don't memoize these values as they're reliant on scroll positioning
  const referenceElViewportPos = useObjectDependency(
    getElementViewportPosition(referenceElement, scrollContainer, true),
  );

  // We use contentNode.parentNode since the parentNode has a transition applied to it and we want to be able to get the width of this element before it is transformed. Also as noted below, the parentNode cannot have a ref on it.
  // Previously the contentNode was passed in but since it is a child of transformed element it was not possible to get an untransformed width.
  const contentElViewportPos = useObjectDependency(
    getElementViewportPosition(
      contentNode?.parentNode as HTMLElement,
      scrollContainer,
    ),
  );

  const referenceElDocumentPos = useObjectDependency(
    useMemo(
      () => getElementDocumentPosition(referenceElement, scrollContainer, true),
      [
        referenceElement,
        scrollContainer,
        viewportSize,
        lastTimeRefElMutated,
        active,
        align,
        justify,
        forceUpdateCounter,
      ],
    ),
  );

  const contentElDocumentPos = useObjectDependency(
    useMemo(
      () => getElementDocumentPosition(contentNode),
      [
        contentNode?.parentNode,
        viewportSize,
        lastTimeContentElMutated,
        active,
        align,
        justify,
        forceUpdateCounter,
      ],
    ),
  );

  const prevJustify = usePrevious<Justify>(justify);
  const prevAlign = usePrevious<Align>(align);

  const layoutMightHaveChanged =
    (prevJustify !== justify &&
      (justify === Justify.Fit || prevJustify === Justify.Fit)) ||
    (prevAlign !== align && justify === Justify.Fit);

  useIsomorphicLayoutEffect(() => {
    // justify={Justify.Fit} can cause the content's height/width to change
    // If we're switching to/from Fit, force an extra pass to make sure the popover is positioned correctly.
    // Also if we're switching between alignments and have Justify.Fit, it may switch between setting the width and
    // setting the height, so force an update in that case as well.
    if (layoutMightHaveChanged) {
      setForceUpdateCounter(n => n + 1);
    }
  }, [layoutMightHaveChanged]);

  useIsomorphicLayoutEffect(() => setIsReadyToRender(true), []);

  return {
    contentElDocumentPos,
    contentElViewportPos,
    isReadyToRender,
    referenceElDocumentPos,
    referenceElViewportPos,
  };
}
