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

// https://jira.mongodb.org/browse/LG-2858
export type AriaLabelPropsWithLabel =
  | {
      label: string;
      'aria-label'?: string;
      'aria-labelledby'?: string;
    }
  | {
      label?: string;
      'aria-label': string;
      'aria-labelledby'?: string;
    }
  | {
      label?: string;
      'aria-label'?: string;
      'aria-labelledby': string;
    };
