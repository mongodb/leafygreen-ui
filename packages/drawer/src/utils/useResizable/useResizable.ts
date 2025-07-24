import { keyMap } from '@leafygreen-ui/lib';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  ResizableProps,
  ResizableReturn,
  DragFrom,
  SizeGrowth,
} from './useResizable.types';
import { calculateNewSize } from './useResizable.utils';

// Mappings for keyboard interactions based on the dragFrom direction
const SIZE_GROWTH_KEY_MAPPINGS: Record<
  DragFrom,
  { [key: string]: SizeGrowth }
> = {
  left: {
    [keyMap.ArrowLeft]: 'increase',
    [keyMap.ArrowRight]: 'decrease',
  },
  right: {
    [keyMap.ArrowRight]: 'increase',
    [keyMap.ArrowLeft]: 'decrease',
  },
  top: {
    [keyMap.ArrowUp]: 'increase',
    [keyMap.ArrowDown]: 'decrease',
  },
  bottom: {
    [keyMap.ArrowDown]: 'increase',
    [keyMap.ArrowUp]: 'decrease',
  },
};

export const useResizable = <T extends HTMLElement = HTMLDivElement>({
  enabled = true,
  initialSize = 0,
  minSize: minSizeProp = 0,
  maxSize: maxSizeProp = 0,
  onResize,
  maxViewportPercentages,
  dragFrom,
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

  // Keeps track of all the sizes that can be used for resizing with keyboard
  const keyboardSizes = [initialSize!, minSize, maxSize];
  const sortedKeyboardSizes = [...keyboardSizes].sort((a, b) => a - b);

  // Update size when enabled state or initialSize changes
  useEffect(() => {
    setSize(initialSize);
  }, [enabled, initialSize]);

  /**
   * Calculates and sets the current resizing state and updates the ref synchronously.
   * @param event
   * @returns void
   */
  const handleMouseMove = (event: MouseEvent) => {
    // Only proceed if resizing is enabled and the element is currently being resized
    if (!isResizingRef.current) return;

    let newSize = calculateNewSize(
      event,
      initialElementSize.current,
      initialMousePos.current,
      dragFrom,
      minSize,
      maxSize,
      maxViewportPercentages,
    );

    setSize(newSize);
    onResize?.(newSize);
  };

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
  }, [enabled]);

  /**
   * Handles keyboard interactions for resizing.
   * Allows resizing using arrow keys based on the dragFrom direction.
   *
   * For example:
   * - If dragFrom is 'left' and the left arrow key is pressed, it increases the size.
   * - If dragFrom is 'left' and the right arrow key is pressed, it decreases the size.
   */
  const getKeyboardInteraction = useCallback(
    (event: React.KeyboardEvent | KeyboardEvent, dragFrom: DragFrom | null) => {
      if (dragFrom === DragFrom.Left || dragFrom === DragFrom.Right) {
        if (event.code == keyMap.ArrowLeft || event.code == keyMap.ArrowRight) {
          event.preventDefault();
        } else {
          if (event.code == keyMap.ArrowUp || event.code == keyMap.ArrowDown) {
            event.preventDefault();
          }
        }
      }

      const getNextSizes = (sizeGrowth: SizeGrowth) => {
        const currentSize = size;
        const sizes = sortedKeyboardSizes;

        if (sizeGrowth === SizeGrowth.Increase) {
          return sizes.find(size => size > currentSize);
        } else {
          return [...sizes].reverse().find(size => size < currentSize);
        }
      };

      const handleSizeChange = (nextSize: number | undefined) => {
        if (nextSize !== undefined) {
          setSize(nextSize);
          onResize?.(nextSize);
        }
      };

      if (dragFrom && event.code in SIZE_GROWTH_KEY_MAPPINGS[dragFrom]) {
        const sizeGrowth = SIZE_GROWTH_KEY_MAPPINGS[dragFrom][event.code];
        const nextSize = getNextSizes(sizeGrowth);
        handleSizeChange(nextSize);
      }
    },
    [size, sortedKeyboardSizes, onResize, initialSize, minSize],
  );

  /**
   * Handles key down events for resizing.
   * Prevents default behavior and calls getKeyboardInteraction to handle resizing.
   * This allows resizing using arrow keys based on the dragFrom direction.
   */
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent | KeyboardEvent) => {
      getKeyboardInteraction(event, dragFrom);
    },
    [getKeyboardInteraction],
  );

  /**
   * Handles mouse down event for resizing
   */
  const handleOnMouseDown = useCallback(
    (e: MouseEvent | React.MouseEvent) => {
      if (!enabled) return;

      e.preventDefault(); // Prevent default browser behavior like text selection

      // Synchronously update the ref BEFORE setting state
      isResizingRef.current = true;
      setIsResizing(true); // This will trigger re-render and useEffect later

      const isHorizontal =
        dragFrom === DragFrom.Left || dragFrom === DragFrom.Right;

      // Capture initial mouse position and current element size
      initialMousePos.current = { x: e.clientX, y: e.clientY };

      if (resizableRef.current) {
        initialElementSize.current = isHorizontal
          ? resizableRef.current.offsetWidth
          : resizableRef.current.offsetHeight;
      }
    },
    [enabled, dragFrom],
  );

  /**
   * Handle focus event for the resizer
   */
  const handleOnFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  /**
   * Handle blur event for the resizer
   */
  const handleOnBlur = useCallback(() => {
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

    const isHorizontal =
      dragFrom === DragFrom.Left || dragFrom === DragFrom.Right;

    // Use callbacks defined outside to prevent recreation of functions
    const props = {
      onMouseDown: handleOnMouseDown,
      onFocus: handleOnFocus,
      onBlur: handleOnBlur,
      // ARIA attributes for accessibility
      role: 'separator', // Defines the element as an interactive divider that separates content regions.
      'aria-valuenow': size, // Represents the current position of the separator as a value between aria-valuemin and aria-valuemax.
      'aria-valuemin': minSize, //The minimum value of the separator's range.
      'aria-valuemax': maxSize, // The maximum value of the separator's range.
      'aria-orientation': isHorizontal ? 'vertical' : 'horizontal', // The visual orientation of the separator bar.
      'aria-label': `${isHorizontal ? 'Vertical' : 'Horizontal'} resize handle`, // Descriptive label
      'aria-valuetext': `${size} pixels`, // Provide size in a more readable format
      tabIndex: 0, // Make the resizer focusable
      style: {
        cursor: isHorizontal ? 'col-resize' : 'row-resize', // Set cursor style for resizing
      },
    };

    return props;
  }, [
    enabled,
    size,
    minSize,
    maxSize,
    dragFrom,
    handleOnMouseDown,
    handleOnFocus,
    handleOnBlur,
  ]);

  // Effect hook to add and remove global mouse event listeners
  // These listeners are added to 'window' to ensure dragging works even if the mouse
  // moves off the resizer handle during the drag.
  useEffect(() => {
    const cleanupListeners = () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    if (isResizing && enabled) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      cleanupListeners();
    }

    return () => {
      cleanupListeners();
    };
  }, [isResizing, handleMouseMove, handleMouseUp, enabled]);

  // Effect hook to add and remove global keydown event listener
  // This listener is added to 'window' to allow resizing with arrow keys
  useEffect(() => {
    const cleanupListeners = () => {
      window.removeEventListener('keydown', handleKeyDown);
    };

    if (isFocused && enabled) {
      window.addEventListener('keydown', handleKeyDown);
    } else {
      cleanupListeners();
    }

    return () => {
      cleanupListeners();
    };
  }, [enabled, isFocused, handleKeyDown]);

  // Effect hook to handle CSS transitions for resizing
  // This is to ensure that the resizing does not have a transition effect while resizing
  // but transitions back to the new size smoothly after resizing is done.
  useEffect(() => {
    const cleanupStyles = () => {
      resizableRef.current?.style.removeProperty('transition');
    };

    if (isResizing) {
      resizableRef.current?.style.setProperty('transition', 'none');
    } else {
      cleanupStyles();
    }

    return () => {
      cleanupStyles();
    };
  }, [isResizing]);

  return {
    size,
    setSize,
    isResizing,
    getResizerProps,
    resizableRef,
  };
};

// TODO:
// 1. Add support for keyboard events to allow resizing with arrow keys ✅
// 2. Add css to temp remove CSS transition when resizing ✅
// 3. Move from direction to from getResizerProps to the hook. Look at other design systems
// 4. Make resize cusor show up even when the mouse is not on top of the resizer handle
// 5. Update DrawerLayout props ✅
// 6. Figure out the correct TS and defaults for the sizes  ✅
// 7. Add setOpen to drawer component to allow closing the drawer from inside ❌
// 8. Add back dragFrom to getResizerProps ❌
// 9. Remove snap close logic from the hook ✅
// 10.Disable resize on small widths? DO i need to
// 11.Ensure correct a11y practices
// 12.Fixes closing transition  ✅
// 13.Weird resize bug, the drawer goes crazy
// 14.Toolbar interaction story is still flakey
