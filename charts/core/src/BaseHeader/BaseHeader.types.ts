import { HTMLElementProps } from '@leafygreen-ui/lib';

/**
 * Possible variants for the label in the header.
 */
export const LabelVariants = {
  Primary: 'primary',
  Secondary: 'secondary',
} as const;
type LabelVariants = (typeof LabelVariants)[keyof typeof LabelVariants];
export interface BaseHeaderProps extends HTMLElementProps<'div'> {
  /**
   * Props for the label in the header.
   */
  labelProps: {
    value: string;
    variant?: LabelVariants;
  };

  /**
   * Props for the collapse button in the header.
   */
  collapseButtonProps?: {
    show?: boolean;
    onClick?: (collapsedState: boolean) => void;
    collapsed?: boolean;
  };

  /**
   * Content to be rendered to the right of the label.
   */
  headerContent?: React.ReactNode;
}
