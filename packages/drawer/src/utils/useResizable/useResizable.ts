//@ts-nocheck

import { keyMap } from '@leafygreen-ui/lib';
import { createRef, useCallback, useEffect, useRef, useState } from 'react';

interface Size {
  width: number;
  height: number;
}

const handleTypes = {
  left: 'left',
  right: 'right',
  top: 'top',
  bottom: 'bottom',
} as const;

type HandleType = (typeof handleTypes)[keyof typeof handleTypes];

type ResizableProps = {
  /**
   * Whether the resizable feature is enabled.
   * @default false
   */
  enabled?: boolean;

  /**
   * The initial size of the resizable element.
   * If not provided, the element will take its default size.
   */
  initialSize?: Partial<Size>;

  /**
   * The minimum size the resizable element can be resized to.
   * If not provided, there will be no minimum size restriction.
   */
  minSize: Partial<Size>;

  /**
   * The maximum size the resizable element can be resized to.
   * If not provided, there will be no maximum size restriction.
   */
  maxSize: Partial<Size>;

  /**
   * The threshold for closing the resizable element.
   * If the size is below this threshold, the element will close.
   * If not provided, there will be no close threshold.
   */
  closeThresholds?: Partial<Size>;

  /**
   * Callback function that is called when the resizable element is closed.
   * This can be used to perform any cleanup or state updates.
   */
  onClose?: () => void;

  /**
   * Callback function that is called when the resizable element is resized.
   * This can be used to perform any actions based on the new size.
   */
  onResize?: (size: { width: number; height: number }) => void;

  /**
   * The percentage of the viewport that the resizable element should occupy at maximum.
   * This can be used to ensure the element does not exceed a certain size relative to the viewport.
   * If provided, this percentage-based maximum will override the maxSize prop if the calculated pixel value is smaller.
   */
  maxViewportPercentages: Partial<Size>;
};

type ResizableReturn = {
  /**
   * The current width and height of the resizable element.
   */
  size: Size;

  /**
   * Function to set the size of the resizable element.
   * Accepts a Size object with width and height properties.
   */
  setSize: React.Dispatch<React.SetStateAction<Size>>;

  /**
   * Boolean indicating whether the resizable element is currently being resized.
   */
  isResizing: boolean;

  /**
   * A function that takes in a handle type ('left', 'right', 'top', 'bottom') and returns the props needed to be spread onto the resizer element. (e.g., onMouseDown)
   */
  getResizerProps: (handleType: HandleType) => {
    onMouseDown: (e: React.MouseEvent) => void;
  };

  /**
   * A ref to the resizable element that can be used to attach the resizer functionality.
   */
  resizableRef: React.RefObject<HTMLElement>;
};

export const useResizable = ({
  enabled = true,
  initialSize,
  minSize,
  maxSize,
  closeThresholds,
  onClose,
  onResize,
  maxViewportPercentages,
}: ResizableProps): ResizableReturn => {
  // Use a properly typed ref
  const resizableRef = useRef<HTMLElement>(null);

  const [size, setSize] = useState<Size>({
    width: initialSize?.width ?? 0,
    height: initialSize?.height ?? 0,
  });

  const [widths, setWidths] = useState<number[]>([]);
  const keyboardWidths = [initialSize.width, minSize.width, maxSize.width];
  const sortedKeyboardWidths = [...keyboardWidths].sort((a, b) => a - b);

  // Update size when enabled state or initialSize changes
  useEffect(() => {
    setSize({
      width: initialSize?.width ?? minSize?.width ?? 0,
      height: initialSize?.height ?? minSize?.height ?? 0,
    });
  }, [
    enabled,
    initialSize?.width,
    initialSize?.height,
    minSize?.width,
    minSize?.height,
  ]);

  // console.log('useResizable hook:', {
  //   initialSize,
  //   currentSize: size,
  //   minSize,
  //   maxSize,
  //   enabled,
  //   refCurrent: resizableRef.current,
  // });

  // State to track if the element is currently being resized
  const [isResizing, setIsResizing] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  // Refs to store initial mouse position and element size at the start of a drag
  const initialMousePos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const initialElementSize = useRef<Size>({ width: 0, height: 0 });

  // Ref to store the type of handle currently being dragged ('left', 'right', 'top', 'bottom')
  const currentHandleType = useRef<HandleType | null>(null);

  // Ref to hold the current value of isResizing to prevent stale closures in event handlers
  // This ref is updated synchronously in onMouseDown/onMouseUp
  const isResizingRef = useRef<boolean>(isResizing);

  const handleMouseMove = (e: MouseEvent) => {
    // Only proceed if resizing is enabled and the element is currently being resized
    if (!enabled || !isResizingRef.current) return;

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

    switch (currentHandleType.current) {
      case handleTypes.left:
        newWidth = initialElementSize.current.width - deltaX;
        // Check snap close using closeThresholds.width

        console.log('🎃', { closeThresholds, newWidth });
        if (
          closeThresholds &&
          closeThresholds.width !== undefined &&
          newWidth < closeThresholds.width
        ) {
          console.log('🥊🥊🥊🥊');
          shouldSnapClose = true;
        }
        break;
      case handleTypes.right:
        newWidth = initialElementSize.current.width + deltaX;
        // Check snap close using closeThresholds.width
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
      currentHandleType.current = null; // Clear the handle type
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
      //   currentHandleType.current = null; // Clear the handle type
      // });
      return; // Exit the function as the element is snapping closed
    }

    // Determine the effective maximum width, considering both fixed max and viewport percentage
    let effectiveMaxWidth = maxSize.width || 0;
    if (maxViewportPercentages && maxViewportPercentages.width !== undefined) {
      effectiveMaxWidth = Math.min(
        effectiveMaxWidth,
        window.innerWidth * maxViewportPercentages.width,
      );
    }

    // Clamp width if the current handle type affects width
    if (
      currentHandleType.current === 'left' ||
      currentHandleType.current === 'right'
    ) {
      if (newWidth < minSize.width) {
        newWidth = minSize.width;
      } else if (newWidth > effectiveMaxWidth) {
        newWidth = effectiveMaxWidth;
      }
    }

    // Determine the effective maximum height, considering both fixed max and viewport percentage
    let effectiveMaxHeight = maxSize.height;
    if (maxViewportPercentages && maxViewportPercentages.height !== undefined) {
      effectiveMaxHeight = Math.min(
        effectiveMaxHeight,
        window.innerHeight * maxViewportPercentages.height,
      );
    }

    // Clamp height if the current handle type affects height
    if (
      currentHandleType.current === 'top' ||
      currentHandleType.current === 'bottom'
    ) {
      if (newHeight < minSize.height) {
        newHeight = minSize.height;
      } else if (newHeight > effectiveMaxHeight) {
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
      currentHandleType.current = null; // Clear the handle type
    });
  }, [enabled]);

  // Function to generate onMouseDown props for specific handle types
  const getResizerProps = useCallback(
    (handleType: HandleType) => {
      // console.log('🥎', { handleType, enabled });

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
          currentHandleType.current = handleType; // Store the type of handle being dragged

          // Capture initial mouse position and current element size
          initialMousePos.current = { x: e.clientX, y: e.clientY };
          console.log('Resize start:', {
            mousePosition: { x: e.clientX, y: e.clientY },
            handleType,
            resizableElement: resizableRef.current,
          });

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
          currentHandleType.current = handleType; // Store the type of handle being dragged

          console.log('🐙🐙🐙🐙🐙Keyboard event on resizer:');
        },
        onBlur: () => {
          // Handle blur event if needed, e.g., to reset styles or state
          console.log('🌻🌻🌻🌻Blur event on resizer');
          setIsFocused(false);
        },
      };
    },
    [enabled],
  );

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    getKeyboardInteraction(e, currentHandleType.current);
  });

  const getKeyboardInteraction = useCallback(
    (e: React.KeyboardEvent, handleType: HandleType | null) => {
      console.log('🪻🪻🪻 handleKeyDown', { key: e.code, handleType });
      switch (handleType) {
        case handleTypes.left: {
          switch (e.code) {
            case keyMap.ArrowLeft: {
              console.log('⬅️ Left arrow key pressed');

              const nextLargerWidth = sortedKeyboardWidths.find(
                width => width > size.width,
              );

              if (nextLargerWidth) {
                setSize(prevSize => ({
                  ...prevSize,
                  width: nextLargerWidth,
                }));
                // Call onResize if provided
                onResize?.();
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

              if (nextSmallerWidth) {
                setSize(prevSize => ({
                  ...prevSize,
                  width: nextSmallerWidth,
                }));
                // Call onResize if provided
                onResize?.();
              } else {
                onClose?.();
                setIsResizing(false); // Stop the resizing state
                // Reset to effective initial size, handling partial initialSize input
                setSize({
                  width: initialSize?.width ?? minSize?.width ?? 0,
                  height: initialSize?.height ?? minSize?.height ?? 0,
                });
                currentHandleType.current = null; // Clear the handle type
              }

              console.log({ nextSmallerWidth, sortedKeyboardWidths });
              break;
            }
          }

          break;
        }
        case handleTypes.right: {
          console.log('Right handle interaction');
          switch (e.code) {
            case keyMap.ArrowRight: {
              console.log('➡️ Right arrow key pressed for right handle');
              // For right handle, right arrow makes element wider
              const nextLargerWidth = sortedKeyboardWidths.find(
                width => width > size.width,
              );

              if (nextLargerWidth) {
                setSize(prevSize => ({
                  ...prevSize,
                  width: nextLargerWidth,
                }));
                // Call onResize if provided
                onResize?.();
              }
              break;
            }
            case keyMap.ArrowLeft: {
              console.log('⬅️ Left arrow key pressed for right handle');
              // For right handle, left arrow makes element narrower
              const nextSmallerWidth = [...sortedKeyboardWidths]
                .reverse()
                .find(width => width < size.width);

              if (nextSmallerWidth) {
                setSize(prevSize => ({
                  ...prevSize,
                  width: nextSmallerWidth,
                }));
                // Call onResize if provided
                onResize?.();
              } else {
                onClose?.();
                setIsResizing(false);
                setSize({
                  width: initialSize?.width ?? minSize?.width ?? 0,
                  height: initialSize?.height ?? minSize?.height ?? 0,
                });
                currentHandleType.current = null;
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
  );

  // Effect hook to add and remove global mouse event listeners
  // These listeners are added to 'window' to ensure dragging works even if the mouse
  // moves off the resizer handle during the drag.
  useEffect(() => {
    if (isResizing) {
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
  }, [isResizing, handleMouseMove, handleMouseUp]);

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
  });

  return {
    size,
    setSize,
    isResizing,
    getResizerProps,
    resizableRef,
  };
};

// TODO:
// 1. Add support for keyboard events to allow resizing with arrow keys
// 2. Add css to temp remove CSS transition when resizing
// 3. Move from direction to from getResizerProps to the hook. Look at other design systems
