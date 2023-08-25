/**
 * A union interface requiring _either_ `aria-label` or `aria-labelledby`
 */
export type AriaLabelProps =
  | {
      /**
       * Screen reader label text
       *
       * Optional if `label` or `aria-labelledby` is provided
       *
       */
      'aria-label': string;
      /**
       * Screen-reader label element.
       *
       * Optional if `label` or `aria-label` is provided
       */
      'aria-labelledby'?: string;
    }
  | {
      /**
       * Screen reader label text
       *
       * Optional if `label` or `aria-labelledby` is provided
       *
       */
      'aria-label'?: string;
      /**
       * Screen-reader label element.
       *
       * Optional if `label` or `aria-label` is provided
       */
      'aria-labelledby': string;
    };

/**
 * A union interface requiring _either_ `label`, `aria-label` or `aria-labelledby`
 */
export type AriaLabelPropsWithLabel =
  | ({
      /**
       * Text shown in bold above the input element.
       *
       * Optional if `aria-labelledby` or `aria-label` is provided
       */
      label?: string;
    } & AriaLabelProps)
  | ({
      /**
       * Text shown in bold above the input element.
       *
       * Optional if `aria-labelledby` or `aria-label` is provided
       */
      label: string;
    } & Partial<AriaLabelProps>);
