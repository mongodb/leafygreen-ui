import { keyMap } from '@leafygreen-ui/lib';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  ResizableProps,
  ResizableReturn,
  HandleType,
} from './useResizable.types';

export const useResizable = ({
  enabled = true,
  initialSize = 0,
  minSize: minSizeProp = 0,
  maxSize: maxSizeProp = 0,
  closeThresholds = 0,
  onClose,
  onResize,
  maxViewportPercentages,
  handleType,
}: ResizableProps): ResizableReturn => {
  const resizableRef = useRef<HTMLElement>(null);
  // State to track if the element is currently being resized
  const [isResizing, setIsResizing] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  // Refs to store initial mouse position and element size at the start of a drag
  const initialMousePos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const initialElementSize = useRef<number>(0);

  // Ref to hold the current value of isResizing to prevent stale closures in event handlers
  // This ref is updated synchronously in onMouseDown/onMouseUp
  const isResizingRef = useRef<boolean>(isResizing);

  const [size, setSize] = useState<number>(initialSize);

  const minSize = minSizeProp ?? initialSize!;
  const maxSize = maxSizeProp ?? initialSize!;

  const keyboardWidths = [initialSize!, minSize, maxSize];
  const sortedKeyboardWidths = [...keyboardWidths].sort((a, b) => a - b);

  // Update size when enabled state or initialSize changes
  useEffect(() => {
    setSize(initialSize);
  }, [enabled, initialSize]);

  const handleMouseMove = (e: MouseEvent) => {
    // Only proceed if resizing is enabled and the element is currently being resized
    if (!isResizingRef.current) return;

    let newSize = initialElementSize.current;
    let shouldSnapClose = false;

    // The difference in mouse position from the initial position
    const deltaX = e.clientX - initialMousePos.current.x;
    const deltaY = e.clientY - initialMousePos.current.y;

    // console.log('🐞', {
    //   x: e.clientX,
    //   y: e.clientY,
    //   deltaX,
    //   deltaY,
    //   initialElementSize,
    // });

    switch (handleType) {
      case 'left': // TODO:
        newSize = initialElementSize.current - deltaX;

        if (
          closeThresholds &&
          closeThresholds !== undefined &&
          newSize < closeThresholds
        ) {
          shouldSnapClose = true;
        }
        break;
      case 'right':
        newSize = initialElementSize.current + deltaX;

        if (
          closeThresholds &&
          closeThresholds !== undefined &&
          newSize < closeThresholds
        ) {
          shouldSnapClose = true;
        }
        break;
      default:
        break;
    }

    // console.log('🐞', { x: e.clientX, y: e.clientY, deltaX, deltaY, newSize });

    // If any snap-close condition is met, trigger onClose and reset
    if (shouldSnapClose) {
      onClose?.(); // Trigger the external close action (e.g., close the drawer)
      // Use requestAnimationFrame to ensure the CSS transition for 'transform' starts
      // before 'isResizing' is set to false. This prevents an abrupt jump.
      // requestAnimationFrame(() => {
      isResizingRef.current = false; // Synchronously update ref
      setIsResizing(false); // Stop the resizing state
      setSize(0);
      // });
      return;
    }

    // Determine the effective maximum width, considering both fixed max and viewport percentage //TODO:
    let effectiveMaxSize = maxSize;

    if (maxViewportPercentages && maxViewportPercentages !== undefined) {
      const viewportWidthPercent = maxViewportPercentages / 100;
      effectiveMaxSize = Math.min(
        effectiveMaxSize,
        window.innerWidth * viewportWidthPercent,
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

  // Callback for when the mouse button is released, ending the drag operation
  const handleMouseUp = useCallback(() => {
    if (!enabled) return;
    // Use requestAnimationFrame to ensure any final size/transform changes
    // are rendered with transitions enabled before stopping resizing.
    requestAnimationFrame(() => {
      isResizingRef.current = false; // Synchronously update ref
      setIsResizing(false); // Set resizing state to false
    });
  }, [enabled]);

  // Function to generate onMouseDown props for specific handle types
  const getResizerProps = useCallback(() => {
    if (!enabled) {
      return {};
    }

    return {
      onMouseDown: (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent default browser behavior like text selection
        console.log('😈 onMouseDown');

        // Synchronously update the ref BEFORE setting state
        isResizingRef.current = true;
        setIsResizing(true); // This will trigger re-render and useEffect later

        // Capture initial mouse position and current element size
        initialMousePos.current = { x: e.clientX, y: e.clientY };

        if (resizableRef.current) {
          initialElementSize.current =
            handleType === 'left' || handleType === 'right'
              ? resizableRef.current.offsetWidth
              : resizableRef.current.offsetHeight;
        }
      },
      tabIndex: 0, // Make the resizer focusable
      onFocus: (e: React.KeyboardEvent) => {
        // Handle keyboard events for resizing if needed
        // For now, we just prevent default to avoid any unwanted behavior
        e.preventDefault();
        setIsFocused(true);
      },
      onBlur: () => {
        // Handle blur event if needed, e.g., to reset styles or state
        setIsFocused(false);
      },
    };
  }, [enabled]);

  const getKeyboardInteraction = useCallback(
    (e: KeyboardEvent, handleType: HandleType | null) => {
      console.log('🪻🪻🪻 handleKeyDown', { key: e.code, handleType });
      switch (handleType) {
        case 'left': {
          // TODO: move these to a function
          switch (e.code) {
            case keyMap.ArrowLeft: {
              console.log('⬅️ Left arrow key pressed');

              const nextLargerWidth = sortedKeyboardWidths.find(
                width => width > size,
              );

              if (nextLargerWidth !== undefined) {
                setSize(nextLargerWidth);
                onResize?.(size);
              }

              break;
            }
            case keyMap.ArrowRight: {
              console.log('➡️ Right arrow key pressed');

              const nextSmallerWidth = [...sortedKeyboardWidths]
                .reverse()
                .find(width => width < size);

              if (nextSmallerWidth !== undefined) {
                setSize(nextSmallerWidth);
                // Call onResize if provided
                onResize?.(size);
              } else {
                onClose?.();
                setIsResizing(false); // Stop the resizing state
                // Reset to effective initial size, handling partial initialSize input
                setSize(initialSize);
              }

              break;
            }
          }

          break;
        }
        case 'right': {
          console.log('Right handle interaction');
          switch (e.code) {
            case keyMap.ArrowRight: {
              console.log('➡️ Right arrow key pressed for right handle');
              // For right handle, right arrow makes element wider
              const nextLargerWidth = sortedKeyboardWidths.find(
                width => width > size,
              );

              if (nextLargerWidth !== undefined) {
                setSize(nextLargerWidth);
                // Call onResize if provided
                onResize?.(size);
              }
              break;
            }
            case keyMap.ArrowLeft: {
              console.log('⬅️ Left arrow key pressed for right handle');
              // For right handle, left arrow makes element narrower
              const nextSmallerWidth = [...sortedKeyboardWidths]
                .reverse()
                .find(width => width < size);

              if (nextSmallerWidth !== undefined) {
                setSize(nextSmallerWidth);
                // Call onResize if provided
                onResize?.(size);
              } else {
                onClose?.();
                setIsResizing(false);
                setSize(initialSize);
              }
              break;
            }
          }
          break;
        }
        default:
          break;
      }
    },
    [size, sortedKeyboardWidths, onResize, onClose, initialSize, minSize],
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      getKeyboardInteraction(e, handleType);
    },
    [getKeyboardInteraction],
  );

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

    // Cleanup function to remove event listeners when the component unmounts
    // or when 'isResizing' changes (e.g., resizing stops)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing, handleMouseMove, handleMouseUp, enabled]);

  useEffect(() => {
    if (isFocused && enabled) {
      // Add keyboard event listeners if the resizer is focused
      window.addEventListener('keydown', handleKeyDown);
    } else {
      window.removeEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [enabled, isFocused, handleKeyDown]);

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
// 5. Update DrawerLayout props
// 6. Figure out the correct TS and defaults for the sizes  ✅
