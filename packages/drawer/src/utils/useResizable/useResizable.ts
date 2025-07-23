import { keyMap } from '@leafygreen-ui/lib';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  ResizableProps,
  ResizableReturn,
  DragFrom,
} from './useResizable.types';

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
  const keyboardSizes = [initialSize!, minSize, maxSize];
  const sortedKeyboardSizes = [...keyboardSizes].sort((a, b) => a - b);

  // Update size when enabled state or initialSize changes
  useEffect(() => {
    setSize(initialSize);
  }, [enabled, initialSize]);

  /**
   * Sets the current resizing state and updates the ref synchronously.
   * @param event
   * @returns void
   */
  const handleMouseMove = (event: MouseEvent) => {
    // Only proceed if resizing is enabled and the element is currently being resized
    if (!isResizingRef.current) return;

    let newSize = initialElementSize.current;
    let effectiveMaxSize = maxSize;

    // The difference in mouse position from the initial position
    const deltaX = event.clientX - initialMousePos.current.x;
    const deltaY = event.clientY - initialMousePos.current.y;

    switch (dragFrom) {
      case DragFrom.Left:
        newSize = initialElementSize.current - deltaX;
        break;
      case DragFrom.Right:
        newSize = initialElementSize.current + deltaX;
        break;
      case DragFrom.Top:
        newSize = initialElementSize.current - deltaY;
        break;
      case DragFrom.Bottom:
        newSize = initialElementSize.current + deltaY;
        break;
      default:
        break;
    }

    if (maxViewportPercentages) {
      const viewportPercent = maxViewportPercentages / 100;
      const viewPortInnerSize =
        dragFrom === DragFrom.Left || dragFrom === DragFrom.Right
          ? window.innerWidth
          : window.innerHeight;
      effectiveMaxSize = Math.min(
        effectiveMaxSize,
        viewPortInnerSize * viewportPercent,
      );
    }

    if (newSize < minSize) {
      newSize = minSize;
    } else if (newSize > effectiveMaxSize) {
      newSize = effectiveMaxSize;
    }

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

      const keyMappings: Record<
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

      if (dragFrom && e.code in keyMappings[dragFrom]) {
        const direction = keyMappings[dragFrom][e.code];
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
    if (isResizing && enabled) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing, handleMouseMove, handleMouseUp, enabled]);

  // Effect hook to add and remove global keydown event listener
  // This listener is added to 'window' to allow resizing with arrow keys
  useEffect(() => {
    if (isFocused && enabled) {
      window.addEventListener('keydown', handleKeyDown);
    } else {
      window.removeEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [enabled, isFocused, handleKeyDown]);

  // Effect hook to handle CSS transitions for resizing
  // This is to ensure that the resizing does not have a transition effect while resizing
  // but transitions back to the new size smoothly after resizing is done.
  useEffect(() => {
    if (isResizing) {
      resizableRef.current?.style.setProperty('transition', 'none');
    } else {
      resizableRef.current?.style.removeProperty('transition');
    }
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
