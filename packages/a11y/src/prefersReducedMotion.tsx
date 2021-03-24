import { css } from '@leafygreen-ui/emotion';

/**
 * Returns an emotion CSS instance for rendering styles that respect
 * OS-level preferences for reduced motion.
 *
 * Use this function to remove scale, size, and positional transitions
 * for users with that preference set.
 * @param styles String of styles to render within media query.
 */
export default function prefersReducedMotion(styles: string) {
  if (styles != null && typeof styles === 'string') {
    return css`
      @media (prefers-reduced-motion: reduce) {
        ${styles}
      }
    `;
  }

  return '';
}
