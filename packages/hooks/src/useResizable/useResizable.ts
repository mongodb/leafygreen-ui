import React, { useCallback, useEffect, useRef, useState } from 'react';

import { keyMap } from '@leafygreen-ui/lib';

import { SIZE_GROWTH_KEY_MAPPINGS } from './useResizable.constants';
import {
  Arrow,
  Position,
  ResizableProps,
  ResizableReturn,
  SizeGrowth,
} from './useResizable.types';
import {
  calculateNewSize,
  getResizerAriaAttributes,
  getResizerStyles,
} from './useResizable.utils';

/**
 * Custom hook to handle resizable functionality for a component.
 * It allows resizing the component using mouse and keyboard interactions.
 *
 * @param {ResizableProps} props - The properties for the resizable functionality.
 * @returns {ResizableReturn} - The state and methods for the resizable component.
 */
export const useResizable = <T extends HTMLElement = HTMLDivElement>({
  enabled = true,
  initialSize = 0,
  minSize: minSizeProp = 0,
  maxSize: maxSizeProp = 0,
  onResize,
  maxViewportPercentages,
  position,
}: ResizableProps): ResizableReturn<T> => {
  const resizableRef = useRef<T>(null);
  const [isResizing, setIsResizing] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  // Refs to store initial mouse position and element size at the start of a drag
  const initialMousePos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const initialElementSize = useRef<number>(0);
  // Ref to hold the current value of isResizing to prevent stale closures in event handlers
  const isResizingRef = useRef<boolean>(isResizing);
  const [size, setSize] = useState<number>(initialSize);
  const minSize = minSizeProp ?? initialSize;
  const maxSize = maxSizeProp ?? initialSize;
  const isVertical = position === Position.Left || position === Position.Right;

  // Keeps track of all the sizes that can be used for resizing with keyboard
  const keyboardSizes = [initialSize, minSize, maxSize];
  const sortedKeyboardSizes = [...keyboardSizes].sort((a, b) => a - b);

  // Update size when enabled state or initialSize changes
  useEffect(() => {
    setSize(initialSize);
  }, [enabled, initialSize]);

  /**
   * Calculates and sets the current resizing state and updates the ref synchronously.
   */
  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      // Only proceed if resizing is enabled and the element is currently being resized
      if (!isResizingRef.current) return;

      const newSize = calculateNewSize(
        event,
        initialElementSize.current,
        initialMousePos.current,
        position,
        minSize,
        maxSize,
        maxViewportPercentages,
      );

      setSize(newSize);
      onResize?.(newSize);
    },
    [maxSize, maxViewportPercentages, minSize, onResize, position],
  );

  /**
   * Handles the mouse up event to stop resizing.
   */
  const handleMouseUp = useCallback(() => {
    // Use requestAnimationFrame to ensure any final size/transform changes
    // are rendered with transitions enabled before stopping resizing.
    requestAnimationFrame(() => {
      isResizingRef.current = false; // Synchronously update ref
      setIsResizing(false); // Set resizing state to false
    });
  }, []);

  /**
   * Handles the size update based on the next size value.
   */
  const updateSize = useCallback(
    (nextSize: number | undefined) => {
      if (nextSize !== undefined) {
        setSize(nextSize);
        onResize?.(nextSize);
      }
    },
    [onResize],
  );

  /**
   * Handles keyboard interactions for resizing based on the position.
   *
   * For example:
   * - If position is 'left' and the left arrow key is pressed, it decreases the size.
   * - If position is 'right' and the left arrow key is pressed, it increases the size.
   */
  const getNextKeyboardSize = useCallback(
    (event: React.KeyboardEvent | KeyboardEvent, position: Position | null) => {
      const getNextSize = (sizeGrowth: SizeGrowth | undefined) => {
        const currentSize = size;
        const sizes = sortedKeyboardSizes;

        if (!sizeGrowth) return currentSize; // No change if sizeGrowth is undefined

        if (sizeGrowth === SizeGrowth.Increase) {
          return sizes.find(size => size > currentSize);
        } else {
          return [...sizes].reverse().find(size => size < currentSize);
        }
      };

      if (position && event.code in SIZE_GROWTH_KEY_MAPPINGS[position]) {
        const sizeGrowth =
          SIZE_GROWTH_KEY_MAPPINGS[position][event.code as Arrow];
        const nextSize = getNextSize(sizeGrowth);
        updateSize(nextSize);
      }
    },
    [size, sortedKeyboardSizes, updateSize],
  );

  /**
   * Prevents default behavior and calls getNextKeyboardSize to handle resizing.
   */
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent | KeyboardEvent) => {
      if (position === Position.Left || position === Position.Right) {
        if (
          event.code === keyMap.ArrowLeft ||
          event.code === keyMap.ArrowRight
        ) {
          event.preventDefault();
        }
      } else {
        if (event.code === keyMap.ArrowUp || event.code === keyMap.ArrowDown) {
          event.preventDefault();
        }
      }
      getNextKeyboardSize(event, position);
    },
    [getNextKeyboardSize, position],
  );

  /**
   * Handles mouse down event for resizing
   */
  const handleMouseDown = useCallback(
    (e: MouseEvent | React.MouseEvent) => {
      if (!enabled) return;

      e.preventDefault();

      isResizingRef.current = true;
      setIsResizing(true);

      initialMousePos.current = { x: e.clientX, y: e.clientY };

      if (resizableRef.current) {
        initialElementSize.current = isVertical
          ? resizableRef.current.offsetWidth
          : resizableRef.current.offsetHeight;
      }
    },
    [enabled, isVertical],
  );

  /**
   * Handle focus event for the resizer
   */
  const handleFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  /**
   * Handle blur event for the resizer
   */
  const handleBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  /**
   * Returns the props for the resizer element.
   * This includes mouse down, focus, blur, and style properties.
   * The resizer is used to initiate resizing of the element.
   */
  const getResizerProps = useCallback(() => {
    if (!enabled) {
      return;
    }

    // Use callbacks defined outside to prevent recreation of functions
    const props = {
      onMouseDown: handleMouseDown,
      onFocus: handleFocus,
      onBlur: handleBlur,
      ...getResizerAriaAttributes(size, minSize, maxSize, isVertical),
      tabIndex: 0, // Make the resizer focusable
      className: getResizerStyles(isVertical, isResizing),
    };

    return props;
  }, [
    enabled,
    size,
    minSize,
    maxSize,
    handleMouseDown,
    handleFocus,
    handleBlur,
    isResizing,
    isVertical,
  ]);

  /**
   * Effect hook to add and remove global mouse event listeners
   * These listeners are added to 'window' to ensure dragging works even if the mouse
   * moves off the resizer handle during the drag.
   */
  useEffect(() => {
    if (!isResizing && !enabled) return;

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing, handleMouseMove, handleMouseUp, enabled]);

  /**
   * Effect hook to add and remove global keydown event listener
   * This listener is added to 'window' to allow resizing with arrow keys
   */
  useEffect(() => {
    if (!isFocused && !enabled) return;

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [enabled, isFocused, handleKeyDown]);

  /**
   * Effect hook to handle CSS transitions for resizing
   * This is to ensure that the resizing does not have a transition effect while resizing
   * but transitions back to the new size smoothly after resizing is done.
   */
  useEffect(() => {
    if (!isResizing) return;
    const ref = resizableRef.current;

    ref?.style.setProperty('transition', 'none');
    document.body.style.setProperty(
      'cursor',
      isVertical ? 'col-resize' : 'row-resize',
    );

    return () => {
      ref?.style.removeProperty('transition');
      document.body.style.removeProperty('cursor');
    };
  }, [isResizing, isVertical]);

  return {
    size,
    setSize,
    isResizing,
    getResizerProps,
    resizableRef,
  };
};
