import { HTMLElementProps } from '@leafygreen-ui/lib';
import { ReactNode } from 'react';

export const Size = {
  XSmall: 'xsmall',
  Small: 'small',
  Normal: 'normal',
  Large: 'large',
} as const;

export type Size = typeof Size[keyof typeof Size];

export interface StateForStyles {
  hasHiddenStages: boolean;
  size: Size;
}

export interface PipelineProps extends HTMLElementProps<'div', never> {
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

export interface StageProps {
  /**
   * Content that will appear inside of the Stage component.
   **/
  children: ReactNode;

  /**
   * ClassName applied to Stage content container.
   **/
  className?: string;

  /**
   * The DOM node to use as the root node for the intersectionObserver. Defaults to window when null or undefined.
   **/
  intersectionNode?: HTMLElement | null;

  /**
   * Alter the rendered size of the component. Inherited from the parent Pipeline component.
   */
  size?: Size;

  /**
   * Either a single number or an array of numbers which indicate at what percentage of the target's visibility
   * the observer's callback should be executed.
   */
  threshold?: number | Array<number>;
}

export interface CounterProps {
  /**
   * Content that will appear inside of the Counter component.
   */
  children?: ReactNode;

  /**
   * Classname applied to Counter content container.
   **/
  className?: string;

  /**
   * Alter the rendered size of the component. Inherited from the parent Pipeline component.
   */
  size: Size;
}
