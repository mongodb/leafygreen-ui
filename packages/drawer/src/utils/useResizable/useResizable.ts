import { keyMap } from '@leafygreen-ui/lib';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  ResizableProps,
  ResizableReturn,
  HandleType,
  Size,
} from './useResizable.types';

export const useResizable = ({
  enabled = true,
  initialSize = { width: 0, height: 0 },
  minSize: minSizeProp = { width: 0, height: 0 },
  maxSize: maxSizeProp = { width: 0, height: 0 },
  closeThresholds = { width: 0, height: 0 },
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
  const initialElementSize = useRef<Size>({ width: 0, height: 0 });

  // Ref to hold the current value of isResizing to prevent stale closures in event handlers
  // This ref is updated synchronously in onMouseDown/onMouseUp
  const isResizingRef = useRef<boolean>(isResizing);

  const [size, setSize] = useState<Size>({
    width: initialSize.width!,
    height: initialSize.height!,
  });

  const minSize = {
    width: minSizeProp.width ?? initialSize.width!,
    height: minSizeProp.height ?? initialSize.height!,
  };

  const maxSize = {
    width: maxSizeProp.width ?? initialSize.width!,
    height: maxSizeProp.height ?? initialSize.height!,
  };

  const keyboardWidths = [initialSize.width!, minSize.width, maxSize.width];
  const sortedKeyboardWidths = [...keyboardWidths].sort((a, b) => a - b);

  // Update size when enabled state or initialSize changes
  useEffect(() => {
    setSize({
      width: initialSize?.width!,
      height: initialSize?.height!,
    });
  }, [
    enabled,
    initialSize?.width,
    initialSize?.height,
    minSize?.width,
    minSize?.height,
  ]);

  const handleMouseMove = (e: MouseEvent) => {
    // Only proceed if resizing is enabled and the element is currently being resized
    if (!isResizingRef.current) return;

    let newWidth = initialElementSize.current.width;
    let newHeight = initialElementSize.current.height;
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
        newWidth = initialElementSize.current.width - deltaX;

        if (
          closeThresholds &&
          closeThresholds.width !== undefined &&
          newWidth < closeThresholds.width
        ) {
          shouldSnapClose = true;
        }
        break;
      case 'right':
        newWidth = initialElementSize.current.width + deltaX;

        if (
          closeThresholds &&
          closeThresholds.width !== undefined &&
          newWidth < closeThresholds.width
        ) {
          shouldSnapClose = true;
        }
        break;
        // case 'top':
        //   newHeight = initialElementSize.current.height - deltaY;
        //   // Check snap close using closeThresholds.height
        //   if (
        //     closeThresholds &&
        //     closeThresholds.height !== undefined &&
        //     newHeight < closeThresholds.height
        //   ) {
        //     shouldSnapClose = true;
        //   }
        //   break;
        // case 'bottom':
        newHeight = initialElementSize.current.height + deltaY;
        // Check snap close using closeThresholds.height
        if (
          closeThresholds &&
          closeThresholds.height !== undefined &&
          newHeight < closeThresholds.height
        ) {
          shouldSnapClose = true;
        }
        break;
      default:
        break;
    }

    console.log('🐞', { x: e.clientX, y: e.clientY, deltaX, deltaY, newWidth });

    // If any snap-close condition is met, trigger onClose and reset
    if (shouldSnapClose) {
      // console.log('🧚🏽‍♀️should snap close');
      onClose?.(); // Trigger the external close action (e.g., close the drawer)
      setIsResizing(false); // Stop the resizing state
      // Reset to effective initial size, handling partial initialSize input
      setSize({
        width: initialSize?.width ?? minSize?.width ?? 0,
        height: initialSize?.height ?? minSize?.height ?? 0,
      });
      // Reset the size to initial or minimum size
      // Use requestAnimationFrame to ensure the CSS transition for 'transform' starts
      // before 'isResizing' is set to false. This prevents an abrupt jump.
      // requestAnimationFrame(() => {
      //   isResizingRef.current = false; // Synchronously update ref
      //   setIsResizing(false); // Stop the resizing state
      //   // Reset to effective initial size, handling partial initialSize input
      //   setSize({
      //     width: initialSize?.width ?? minSize?.width ?? 0,
      //     height: initialSize?.height ?? minSize?.height ?? 0,
      //   });
      // });
      return; // Exit the function as the element is snapping closed
    }

    // Determine the effective maximum width, considering both fixed max and viewport percentage //TODO:
    let effectiveMaxWidth = maxSize.width;

    if (maxViewportPercentages && maxViewportPercentages.width !== undefined) {
      const viewportWidthPercent = maxViewportPercentages.width / 100;
      effectiveMaxWidth = Math.min(
        effectiveMaxWidth,
        window.innerWidth * viewportWidthPercent,
      );
    }

    // Clamp width if the current handle type affects width
    if (handleType === 'left' || handleType === 'right') {
      if (newWidth > effectiveMaxWidth) {
        newWidth = effectiveMaxWidth;
      }
    }

    // Determine the effective maximum height, considering both fixed max and viewport percentage
    let effectiveMaxHeight = maxSize.height;
    if (maxViewportPercentages && maxViewportPercentages.height !== undefined) {
      const viewportHeightPercent = maxViewportPercentages.height / 100;
      effectiveMaxHeight = Math.min(
        effectiveMaxHeight,
        window.innerHeight * viewportHeightPercent,
      );
    }

    // Clamp height if the current handle type affects height
    if (handleType === 'top' || handleType === 'bottom') {
      if (newHeight > effectiveMaxHeight) {
        newHeight = effectiveMaxHeight;
      }
    }

    // Update the size state with the clamped values
    const newSize: Size = { width: newWidth, height: newHeight };
    setSize(newSize);

    // Call onResize prop if provided
    if (onResize) {
      onResize(newSize);
    }
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
        // console.log('Resize start:', {
        //   mousePosition: { x: e.clientX, y: e.clientY },
        //   handleType,
        //   resizableElement: resizableRef.current,
        // });

        if (resizableRef.current) {
          initialElementSize.current = {
            width: resizableRef.current.offsetWidth,
            height: resizableRef.current.offsetHeight,
          };
        }
      },
      tabIndex: 0, // Make the resizer focusable
      onFocus: (e: React.KeyboardEvent) => {
        // Handle keyboard events for resizing if needed
        // For now, we just prevent default to avoid any unwanted behavior
        e.preventDefault();
        setIsFocused(true);

        console.log('🐙🐙🐙🐙🐙Keyboard event on resizer:');
      },
      onBlur: () => {
        // Handle blur event if needed, e.g., to reset styles or state
        console.log('🌻🌻🌻🌻Blur event on resizer');
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
                width => width > size.width,
              );

              if (nextLargerWidth !== undefined) {
                setSize(prevSize => ({
                  ...prevSize,
                  width: nextLargerWidth,
                }));
                // Call onResize if provided
                onResize?.(size);
              }

              console.log({ nextLargerWidth, sortedKeyboardWidths });

              break;
            }
            case keyMap.ArrowRight: {
              console.log('➡️ Right arrow key pressed');

              console.log({ sortedKeyboardWidths, currentSize: size.width });

              const nextSmallerWidth = [...sortedKeyboardWidths]
                .reverse()
                .find(width => width < size.width);

              if (nextSmallerWidth !== undefined) {
                setSize(prevSize => ({
                  ...prevSize,
                  width: nextSmallerWidth,
                }));
                // Call onResize if provided
                onResize?.(size);
              } else {
                onClose?.();
                setIsResizing(false); // Stop the resizing state
                // Reset to effective initial size, handling partial initialSize input
                setSize({
                  width: initialSize?.width ?? minSize?.width ?? 0,
                  height: initialSize?.height ?? minSize?.height ?? 0,
                });
              }

              console.log({ nextSmallerWidth, sortedKeyboardWidths });
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
                width => width > size.width,
              );

              if (nextLargerWidth !== undefined) {
                setSize(prevSize => ({
                  ...prevSize,
                  width: nextLargerWidth,
                }));
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
                .find(width => width < size.width);

              if (nextSmallerWidth !== undefined) {
                setSize(prevSize => ({
                  ...prevSize,
                  width: nextSmallerWidth,
                }));
                // Call onResize if provided
                onResize?.(size);
              } else {
                onClose?.();
                setIsResizing(false);
                setSize({
                  width: initialSize?.width ?? minSize?.width ?? 0,
                  height: initialSize?.height ?? minSize?.height ?? 0,
                });
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
// 6. Figure out the correct TS and defaults for the sizes
