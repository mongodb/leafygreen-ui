import { ReactNode } from 'react';
import { Size } from './styles';

export interface StateForStyles {
  hasHiddenStages: boolean;
  size: Size;
}

export interface PipelineProps {
  /**
   * Content that will appear inside of the Pipeline component.
   */
  children: ReactNode;

  /**
   * Optional className prop to apply to Pipeline content container.
   */
  className?: string;

  /**
   * Alter the rendered size of the component
   */
  size: Size;

  /**
   * Renders the component with dark mode styles.
   *
   * @default false
   */
  darkMode?: boolean;
}
