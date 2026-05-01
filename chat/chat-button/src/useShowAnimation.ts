import {
  MouseEvent,
  MouseEventHandler,
  useCallback,
  useEffect,
  useState,
} from 'react';

import { SHIMMER_TRANSITION_DURATION } from './shared.styles';

interface UseShowAnimationParams {
  /**
   * Whether animation should be enabled
   * @default true
   */
  enabled?: boolean;

  /**
   * Optional mouse enter handler to be called after updating hover state
   */
  onMouseEnter?: MouseEventHandler<HTMLButtonElement>;

  /**
   * Optional mouse leave handler to be called after updating hover state
   */
  onMouseLeave?: MouseEventHandler<HTMLButtonElement>;
}

interface UseShowAnimationReturn {
  /**
   * Whether to show the animation (initial or hover)
   */
  showAnimation: boolean;

  /**
   * Mouse enter handler that manages hover state
   */
  handleMouseEnter: MouseEventHandler<HTMLButtonElement>;

  /**
   * Mouse leave handler that manages hover state
   */
  handleMouseLeave: MouseEventHandler<HTMLButtonElement>;
}

/**
 * Hook to manage animation state for Chat button components
 *
 * @param enabled - Whether animation should be enabled (default: true)
 * @param onMouseEnter - Optional mouse enter handler to be called
 * @param onMouseLeave - Optional mouse leave handler to be called
 * @returns Object containing showAnimation state and mouse event handlers
 */
export function useShowAnimation({
  enabled = true,
  onMouseEnter,
  onMouseLeave,
}: UseShowAnimationParams): UseShowAnimationReturn {
  const [isInitialAnimation, setIsInitialAnimation] = useState(enabled);
  const [isHovered, setIsHovered] = useState(false);

  const showAnimation = isInitialAnimation || isHovered;

  const handleMouseEnter = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      if (enabled) {
        setIsHovered(true);
      }
      onMouseEnter?.(e);
    },
    [enabled, onMouseEnter],
  );

  const handleMouseLeave = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      if (enabled) {
        setIsHovered(false);
      }
      onMouseLeave?.(e);
    },
    [enabled, onMouseLeave],
  );

  // Turn off animation after initial animation loop
  useEffect(() => {
    if (!enabled) return;

    const timer = setTimeout(() => {
      setIsInitialAnimation(false);
    }, SHIMMER_TRANSITION_DURATION);

    return () => clearTimeout(timer);
  }, [enabled]);

  return {
    showAnimation,
    handleMouseEnter,
    handleMouseLeave,
  };
}
