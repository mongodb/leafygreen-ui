/**
 * A union interface requiring _either_ `aria-label` or `aria-labelledby`
 */
export type AriaLabelProps =
  | {
      'aria-label': string;
      'aria-labelledby'?: string;
    }
  | {
      'aria-label'?: string;
      'aria-labelledby': string;
    };
