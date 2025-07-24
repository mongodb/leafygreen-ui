import { PropsWithChildren } from 'react';

/**
 * Determines the visual variant of the chat components, affecting their size and density.
 * - `compact`: A dense, smaller variant ideal for use in constrained spaces within product UIs like a drawer or side panel.
 * - `spacious`: A larger, more expressive variant with bigger fonts and more white space, designed for marketing pages or standalone popovers.
 * @default 'spacious'
 */
export const Variant = {
  Compact: 'compact',
  Spacious: 'spacious',
} as const;
export type Variant = (typeof Variant)[keyof typeof Variant];

export interface LeafyGreenChatContextProps {
  containerWidth?: number;
  variant: Variant;
}

export type LeafyGreenChatProviderProps = PropsWithChildren<{
  /**
   * Determines the visual variant of the chat components, affecting their size and density.
   * - `compact`: A dense, smaller variant ideal for use in constrained spaces within product UIs like a drawer or side panel.
   * - `spacious`: A larger, more expressive variant with bigger fonts and more white space, designed for marketing pages or standalone popovers.
   * @default 'spacious'
   */
  variant?: Variant;
}>;
