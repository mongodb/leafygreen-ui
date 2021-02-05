import debounce from 'lodash/debounce';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { LGGlyph } from '@leafygreen-ui/icon/src/types';

export const sideNavWidth = 184;
export const sideNavCollapsedWidth = 48;
export const transitionDurationMilliseconds = 1500;

export type GlyphElement = React.ReactElement<LGGlyph.ComponentProps> & {
  type?: { isGlyph?: boolean };
};

export const GlyphVisibility = {
  Visible: 'visible',
  NavCollapsed: 'nav-collapsed',
  NavExpanded: 'nav-expanded',
} as const;

export type GlyphVisibility = typeof GlyphVisibility[keyof typeof GlyphVisibility];

/**
 * Manually detect hover so that hover state can be passed through context.
 * Using pure CSS would require a component to import a data prop selector
 * from every sub-component or an equivalent amount of work.
 *
 * This is currently only used for the `SideNav` collapse state, but
 * could be used for `SideNavGroup` collapse state too; just drop in:
 *
 * ```
 * const { hovered, onMouseOver, onMouseLeave } = useHover({
 *   transitionDurationMilliseconds,
 *   onMouseOver: onMouseOverProp,
 *   onMouseLeave: onMouseLeaveProp,
 *   enabled: collapsed,
 * });
 *
 * const shouldRenderCollapsedState = collapsed && !hovered;
 * ```
 */
export function useHover({
  transitionDurationMilliseconds,
  onMouseOver: onMouseOverProp,
  onMouseLeave: onMouseLeaveProp,
  enabled = true,
}: {
  transitionDurationMilliseconds?: number;
  onMouseOver?: React.MouseEventHandler;
  onMouseLeave?: React.MouseEventHandler;
  enabled: boolean;
}): {
  hovered: boolean;
  onMouseOver: React.MouseEventHandler;
  onMouseLeave: React.MouseEventHandler;
} {
  const [hovered, setHovered] = useState(false);

  // Debounce hover changes to prevent jitter when rapidly moving the mouse
  // on and off. Alternatively we could set transition-delay for this
  // and all sub-components, but that would be less convenient and wouldn't
  // prevent unnecessary re-renders.
  const debouncedSetHovered = useMemo(
    () => ({
      toTrue: debounce(() => setHovered(true), transitionDurationMilliseconds),
      toFalse: debounce(
        () => setHovered(false),
        transitionDurationMilliseconds,
      ),
    }),
    [transitionDurationMilliseconds],
  );

  useEffect(() => {
    if (!enabled) {
      debouncedSetHovered.toTrue.cancel();
      debouncedSetHovered.toFalse.cancel();
      setHovered(false);
    }
  }, [debouncedSetHovered, enabled]);

  const onMouseOver: React.MouseEventHandler = useCallback(
    event => {
      if (enabled) {
        debouncedSetHovered.toFalse.cancel();
        debouncedSetHovered.toTrue();
      }
      onMouseOverProp?.(event);
    },
    [debouncedSetHovered, enabled, onMouseOverProp],
  );

  const onMouseLeave: React.MouseEventHandler = useCallback(
    event => {
      if (enabled) {
        debouncedSetHovered.toTrue.cancel();
        debouncedSetHovered.toFalse();
      }
      onMouseLeaveProp?.(event);
    },
    [debouncedSetHovered, enabled, onMouseLeaveProp],
  );

  return { hovered, onMouseOver, onMouseLeave };
}
