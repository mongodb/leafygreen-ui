import { LGGlyph } from '@leafygreen-ui/icon';
import { DarkModeProps } from '@leafygreen-ui/lib';

export type AssistantAvatarProps = LGGlyph.ComponentProps &
  DarkModeProps & {
    /**
     * Whether the avatar should render as disabled
     */
    disabled?: boolean;

    /**
     * Whether to show the animation overlay
     * @default false
     */
    showAnimation?: boolean;
  };
