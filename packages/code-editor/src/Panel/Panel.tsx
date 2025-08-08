import React from 'react';

// @ts-ignore LG icons don't currently support TS
import CopyIcon from '@leafygreen-ui/icon/dist/Copy';
// @ts-ignore LG icons don't currently support TS
import EllipsisIcon from '@leafygreen-ui/icon/dist/Ellipsis';
// @ts-ignore LG icons don't currently support TS
import FormatIcon from '@leafygreen-ui/icon/dist/Format';
// @ts-ignore LG icons don't currently support TS
import PlayIcon from '@leafygreen-ui/icon/dist/Play';
import IconButton from '@leafygreen-ui/icon-button';
import {
  useBaseFontSize,
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';

import {
  getPanelButtonsStyles,
  getPanelChildrenStyles,
  getPanelStyles,
  getPanelTitleStyles,
} from './Panel.styles';
import { PanelProps } from './Panel.types';

export function Panel({
  title,
  showCopyButton,
  showFormatButton,
  showPlayButton,
  showSecondaryMenuButton,
  onCopyClick,
  onFormatClick,
  onPlayClick,
  onUndoClick,
  onRedoClick,
  onDownloadClick,
  onViewShortcutsClick,
  customSecondaryButtons,
  children,
  baseFontSize: baseFontSizeProp,
  darkMode,
}: PanelProps) {
  const { theme } = useDarkMode(darkMode);
  const baseFontSize = useBaseFontSize();

  return (
    <div className={getPanelStyles(theme)}>
      <div
        className={getPanelTitleStyles(theme, baseFontSizeProp || baseFontSize)}
      >
        {title}
      </div>
      <div className={getPanelChildrenStyles(theme)}>{children}</div>
      <div className={getPanelButtonsStyles(theme)}>
        {showPlayButton && (
          <IconButton>
            <PlayIcon />
          </IconButton>
        )}

        {showFormatButton && (
          <IconButton>
            <FormatIcon />
          </IconButton>
        )}
        {showCopyButton && (
          <IconButton>
            <CopyIcon />
          </IconButton>
        )}
        {showSecondaryMenuButton && (
          <IconButton>
            <EllipsisIcon />
          </IconButton>
        )}
      </div>
    </div>
  );
}
