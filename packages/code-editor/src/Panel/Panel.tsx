import React from 'react';

// @ts-ignore LG icons don't currently support TS
import DownloadIcon from '@leafygreen-ui/icon/dist/Download';
// @ts-ignore LG icons don't currently support TS
import EllipsisIcon from '@leafygreen-ui/icon/dist/Ellipsis';
// @ts-ignore LG icons don't currently support TS
import FormatIcon from '@leafygreen-ui/icon/dist/Format';
// @ts-ignore LG icons don't currently support TS
import QuestionMarkWithCircleIcon from '@leafygreen-ui/icon/dist/QuestionMarkWithCircle';
// @ts-ignore LG icons don't currently support TS
import RedoIcon from '@leafygreen-ui/icon/dist/Redo';
// @ts-ignore LG icons don't currently support TS
import UndoIcon from '@leafygreen-ui/icon/dist/Undo';
import IconButton from '@leafygreen-ui/icon-button';
import {
  useBaseFontSize,
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';
import { Menu, MenuItem, MenuVariant } from '@leafygreen-ui/menu';
import Tooltip from '@leafygreen-ui/tooltip';

import { CodeEditorCopyButton } from '../CodeEditorCopyButton';

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
  showSecondaryMenuButton,
  onCopyClick,
  onFormatClick,
  onUndoClick,
  onRedoClick,
  onDownloadClick,
  onViewShortcutsClick,
  customSecondaryButtons,
  children,
  baseFontSize: baseFontSizeProp,
  darkMode,
  getContents,
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
      <div className={getPanelChildrenStyles()}>{children}</div>
      <div className={getPanelButtonsStyles()}>
        {showFormatButton && (
          <Tooltip
            align="top"
            justify="middle"
            trigger={
              <IconButton onClick={onFormatClick}>
                <FormatIcon />
              </IconButton>
            }
            triggerEvent="hover"
            darkMode={darkMode}
          >
            Prettify code
          </Tooltip>
        )}
        {showCopyButton && (
          <CodeEditorCopyButton
            isPanelVariant
            getContents={getContents ?? (() => '')}
            onCopy={onCopyClick}
          />
        )}
        {showSecondaryMenuButton && (
          <Menu
            trigger={
              <IconButton>
                <EllipsisIcon />
              </IconButton>
            }
            variant={MenuVariant.Compact}
            darkMode={darkMode}
          >
            <MenuItem glyph={<UndoIcon />} onClick={onUndoClick}>
              Undo
            </MenuItem>
            <MenuItem glyph={<RedoIcon />} onClick={onRedoClick}>
              Redo
            </MenuItem>
            <MenuItem glyph={<DownloadIcon />} onClick={onDownloadClick}>
              Download
            </MenuItem>
            <MenuItem
              glyph={<QuestionMarkWithCircleIcon />}
              onClick={onViewShortcutsClick}
            >
              View shortcuts
            </MenuItem>
            {customSecondaryButtons?.map(({ label, glyph, onClick, href }) => (
              <MenuItem glyph={glyph} onClick={onClick} href={href} key={label}>
                {label}
              </MenuItem>
            ))}
          </Menu>
        )}
      </div>
    </div>
  );
}
