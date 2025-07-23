import { keyMap } from '@leafygreen-ui/lib';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  ResizableProps,
  ResizableReturn,
  DragFrom,
} from './useResizable.types';
import { calculateNewSize } from './useResizable.utils';

// Mappings for keyboard interactions based on the dragFrom direction
const DIRECTION_KEY_MAPPINGS: Record<
  DragFrom,
  { [key: string]: 'larger' | 'smaller' }
> = {
  left: {
    [keyMap.ArrowLeft]: 'larger',
    [keyMap.ArrowRight]: 'smaller',
  },
  right: {
    [keyMap.ArrowRight]: 'larger',
    [keyMap.ArrowLeft]: 'smaller',
  },
  top: {
    [keyMap.ArrowUp]: 'larger',
    [keyMap.ArrowDown]: 'smaller',
  },
  bottom: {
    [keyMap.ArrowDown]: 'larger',
    [keyMap.ArrowUp]: 'smaller',
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
    (e: React.KeyboardEvent | KeyboardEvent, dragFrom: DragFrom | null) => {
      const getNextSizes = (direction: 'larger' | 'smaller') => {
        const currentSize = size;
        const sizes = sortedKeyboardSizes;

        if (direction === 'larger') {
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

      if (dragFrom && e.code in DIRECTION_KEY_MAPPINGS[dragFrom]) {
        const direction = DIRECTION_KEY_MAPPINGS[dragFrom][e.code];
        const nextSize = getNextSizes(direction);
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
      event.preventDefault(); // Prevent default browser behavior like scrolling
      getKeyboardInteraction(event, dragFrom);
    },
    [getKeyboardInteraction],
  );

  /**
   * Returns the props for the resizer element.
   * This includes mouse down, focus, blur, and style properties.
   * The resizer is used to initiate resizing of the element.
   */
  const getResizerProps = useCallback(() => {
    if (!enabled) {
      return;
    }

    return {
      onMouseDown: (e: MouseEvent | React.MouseEvent) => {
        e.preventDefault(); // Prevent default browser behavior like text selection

        // Synchronously update the ref BEFORE setting state
        isResizingRef.current = true;
        setIsResizing(true); // This will trigger re-render and useEffect later

        // Capture initial mouse position and current element size
        initialMousePos.current = { x: e.clientX, y: e.clientY };

        if (resizableRef.current) {
          initialElementSize.current =
            dragFrom === DragFrom.Left || dragFrom === DragFrom.Right
              ? resizableRef.current.offsetWidth
              : resizableRef.current.offsetHeight;
        }
      },
      tabIndex: 0, // Make the resizer focusable
      onFocus: () => {
        // Set focus state when resizer receives focus
        setIsFocused(true);
      },
      onBlur: () => {
        // Handle blur event if needed, e.g., to reset styles or state
        setIsFocused(false);
      },
      style: {
        cursor:
          dragFrom === DragFrom.Left || dragFrom === DragFrom.Right
            ? 'col-resize'
            : 'row-resize', // Set cursor style for resizing
      },
    };
  }, [enabled]);

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
