import { TitleBarProps } from '@lg-chat/title-bar';

import { DarkModeProps, HTMLElementProps } from '@leafygreen-ui/lib';

export interface ChatWindowProps
  extends Omit<HTMLElementProps<'div'>, 'title'>,
    DarkModeProps,
    TitleBarProps {}
