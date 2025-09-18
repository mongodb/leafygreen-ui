import React, { useState } from 'react';

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
import Modal from '@leafygreen-ui/modal';
import Tooltip from '@leafygreen-ui/tooltip';

import { useCodeEditorContext } from '../CodeEditor/CodeEditorContext';
import { CodeEditorCopyButton } from '../CodeEditorCopyButton';
import { CopyButtonVariant } from '../CodeEditorCopyButton/CodeEditorCopyButton.types';
import { ShortcutTable } from '../ShortcutTable';

import {
  getPanelButtonsStyles,
  getPanelInnerContentStyles,
  getPanelStyles,
  getPanelTitleStyles,
  ModalStyles,
} from './Panel.styles';
import { PanelProps } from './Panel.types';

/**
 * Panel component provides a toolbar interface for the CodeEditor with formatting, copying, and custom action buttons.
 *
 * The Panel displays at the top of the CodeEditor and can include:
 * - A title for the code language or content description
 * - Format button for code prettification (when formatting is available)
 * - Copy button for copying code to clipboard
 * - Secondary menu with additional actions (undo, redo, download, view shortcuts)
 * - Custom secondary buttons for application-specific actions
 * - Custom children content in the left slot
 *
 * @example
 * ```tsx
 * <CodeEditor
 *   defaultValue="const greeting = 'Hello World';"
 *   language={LanguageName.javascript}
 *   panel={
 *     <Panel
 *       title="JavaScript"
 *       showFormatButton
 *       showCopyButton
 *       showSecondaryMenuButton
 *       downloadFileName="my-custom-script.js"
 *       customSecondaryButtons={[
 *         {
 *           label: 'My Custom Button',
 *           glyph: <CloudIcon />,
 *           onClick: () => console.log('custom button clicked'),
 *           'aria-label': 'Do custom action',
 *         },
 *       ]}
 *     />
 *   }
 * />
 * ```
 */
export function Panel({
  baseFontSize: baseFontSizeProp,
  customSecondaryButtons,
  darkMode,
  downloadFileName,
  innerContent,
  onCopyClick,
  onDownloadClick,
  onFormatClick,
  onRedoClick,
  onUndoClick,
  onViewShortcutsClick,
  showCopyButton,
  showFormatButton,
  showSecondaryMenuButton,
  title,
}: PanelProps) {
  const [shortcutsModalOpen, setShortcutsModalOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme } = useDarkMode(darkMode);
  const baseFontSize = useBaseFontSize();

  const { getContents, formatCode, undo, redo, downloadContent, lgIds } =
    useCodeEditorContext();

  const handleFormatClick = async () => {
    if (formatCode) {
      try {
        await formatCode();
        onFormatClick?.();
      } catch (error) {
        console.error('Error formatting code:', error);
      }
    } else {
      onFormatClick?.();
    }
  };

  const handleUndoClick = () => {
    setMenuOpen(false);
    if (undo) {
      undo();
    }
    onUndoClick?.();
  };

  const handleRedoClick = () => {
    setMenuOpen(false);
    if (redo) {
      redo();
    }
    onRedoClick?.();
  };

  const handleDownloadClick = () => {
    setMenuOpen(false);
    if (downloadContent) {
      downloadContent(downloadFileName);
    }
    onDownloadClick?.();
  };

  const handleViewShortcutsClick = () => {
    // Close the menu first, then open the modal
    setMenuOpen(false);
    setShortcutsModalOpen(true);
    onViewShortcutsClick?.();
  };

  return (
    <>
      <div className={getPanelStyles(theme)} data-lgid={lgIds.panel}>
        <div
          className={getPanelTitleStyles(
            theme,
            baseFontSizeProp || baseFontSize,
          )}
          data-lgid={lgIds.panelTitle}
        >
          {title}
        </div>
        <div className={getPanelInnerContentStyles()}>{innerContent}</div>
        <div className={getPanelButtonsStyles()}>
          {showFormatButton && (
            <Tooltip
              align="top"
              justify="middle"
              trigger={
                <IconButton
                  onClick={handleFormatClick}
                  aria-label="Format code"
                  data-lgid={lgIds.panelFormatButton}
                >
                  <FormatIcon />
                </IconButton>
              }
            >
              Prettify code
            </Tooltip>
          )}
          {showCopyButton && (
            <CodeEditorCopyButton
              variant={CopyButtonVariant.IconButton}
              getContentsToCopy={getContents ?? (() => '')}
              onCopy={onCopyClick}
              data-lgid={lgIds.panelCopyButton}
            />
          )}
          {showSecondaryMenuButton && (
            <Menu
              trigger={
                <IconButton
                  aria-label="Show more actions"
                  data-lgid={lgIds.panelSecondaryMenuButton}
                >
                  <EllipsisIcon />
                </IconButton>
              }
              variant={MenuVariant.Compact}
              renderDarkMenu={false}
              open={menuOpen}
              setOpen={setMenuOpen}
              data-lgid={lgIds.panelSecondaryMenu}
            >
              <MenuItem
                glyph={<UndoIcon />}
                onClick={handleUndoClick}
                aria-label="Undo changes"
              >
                Undo
              </MenuItem>
              <MenuItem
                glyph={<RedoIcon />}
                onClick={handleRedoClick}
                aria-label="Redo changes"
              >
                Redo
              </MenuItem>
              <MenuItem
                glyph={<DownloadIcon />}
                onClick={handleDownloadClick}
                aria-label="Download code"
              >
                Download
              </MenuItem>
              <MenuItem
                glyph={<QuestionMarkWithCircleIcon />}
                onClick={handleViewShortcutsClick}
                aria-label="View shortcuts"
              >
                View shortcuts
              </MenuItem>
              {customSecondaryButtons?.map(
                ({
                  label,
                  glyph,
                  onClick,
                  href,
                  'aria-label': ariaLabel,
                  disabled,
                }) => (
                  <MenuItem
                    glyph={glyph}
                    onClick={onClick}
                    href={href}
                    key={label}
                    aria-label={ariaLabel || label}
                    disabled={disabled}
                  >
                    {label}
                  </MenuItem>
                ),
              )}
            </Menu>
          )}
        </div>
      </div>
      <Modal
        open={shortcutsModalOpen}
        setOpen={setShortcutsModalOpen}
        className={ModalStyles}
      >
        <ShortcutTable />
      </Modal>
    </>
  );
}
