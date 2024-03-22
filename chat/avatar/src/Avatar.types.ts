export const Size = {
  Small: 'small',
  Default: 'default',
} as const;

export type Size = (typeof Size)[keyof typeof Size];

export const avatarSizes: Record<Size, number> = {
  [Size.Default]: 52,
  [Size.Small]: 40,
};

export interface SizeProps {
  /**
   * If provided, overrides the size prop to a customizable number (in px)
   */
  sizeOverride?: number;
  /**
   * Determines the size of the avatar
   * @default Size.Default
   */
  size?: Size;
}
