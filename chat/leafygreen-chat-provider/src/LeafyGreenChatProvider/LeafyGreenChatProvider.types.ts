import { PropsWithChildren } from 'react';

/**
 * @deprecated The spacious variant will be removed by EOY 2025. All new feature work will be done with the compact variant.
 * The spacious variant will only receive critical, high-priority bug fixes.
 *
 * Determines the visual variant of the chat components, affecting their size and density.
 * - `compact`: A dense, smaller variant ideal for use in constrained spaces within product UIs like a drawer or side panel.
 * - `spacious`: A larger, more expressive variant with bigger fonts and more white space, designed for marketing pages or standalone popovers.
 * @default 'compact'
 */
export const Variant = {
  Compact: 'compact',
  Spacious: 'spacious',
} as const;
export type Variant = (typeof Variant)[keyof typeof Variant];

export interface LeafyGreenChatContextProps {
  containerWidth?: number;
  /**
   * @deprecated The spacious variant will be removed by EOY 2025. All new feature work will be done with the compact variant.
   * The spacious variant will only receive critical, high-priority bug fixes.
   */
  variant: Variant;
}

export type LeafyGreenChatProviderProps = PropsWithChildren<{
  /**
   * @deprecated The spacious variant will be removed by EOY 2025. All new feature work will be done with the compact variant.
   * The spacious variant will only receive critical, high-priority bug fixes.
   *
   * Determines the visual variant of the chat components, affecting their size and density.
   * - `compact`: A dense, smaller variant ideal for use in constrained spaces within product UIs like a drawer or side panel.
   * - `spacious`: A larger, more expressive variant with bigger fonts and more white space, designed for marketing pages or standalone popovers.
   * @default 'compact'
   */
  variant?: Variant;
}>;
