import React from 'react';
import { cx, css } from '@leafygreen-ui/emotion';
import { spacing } from '@leafygreen-ui/tokens';
import CopyButton from './CopyButton';
import LanguageSwitcher from './LanguageSwitcher';
import { variantColors } from './globalStyles';
import { PopoverProps } from './types';
import {
  Mode,
  LanguageOption,
  LanguageSwitcher as LanguageSwitcherProps,
} from './types';

function getSidebarVariantStyle(mode: Mode): string {
  const colors = variantColors[mode];

  switch (mode) {
    case Mode.Light:
      return css`
        border-color: ${colors[1]};
        background-color: white;
      `;

    case Mode.Dark:
      return css`
        border-color: ${colors[1]};
        background-color: ${colors[1]};
      `;
  }
}

function getPanelStyles(mode: Mode, withLanguageSwitcher: boolean) {
  const basePanelStyle = css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    flex-shrink: 0;
    gap: ${spacing[1]}px;
    padding: 6px;
    border-left: solid 1px;

    svg {
      width: 16px;
      height: 16px;
    }
  `;

  const languageSwitcherPanelStyle = css`
    flex-direction: row;
    border-left: unset;
    border-bottom: 1px solid;
    padding: 0;
    padding-right: 8px;
    height: 40px; // 28px (icon) + 2 x 6px (focus shadow). Can't use padding b/c switcher
  `;

  return cx(
    basePanelStyle,
    {
      [languageSwitcherPanelStyle]: withLanguageSwitcher,
    },
    getSidebarVariantStyle(mode),
  );
}

type PanelProps = Partial<Omit<LanguageSwitcherProps, 'language'>> & {
  onCopy?: Function;
  contents: string;
  darkMode?: boolean;
  showCopyButton?: boolean;
  language?: LanguageOption;
  isMultiline?: boolean;
  customActionButtons?: Array<React.ReactNode>;
  showCustomActionButtons?: boolean;
} & PopoverProps;

function Panel({
  language,
  languageOptions,
  contents,
  onChange,
  onCopy,
  showCopyButton,
  darkMode,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  isMultiline = false,
  customActionButtons,
  showCustomActionButtons,
  usePortal,
  portalClassName,
  portalContainer,
  scrollContainer,
  popoverZIndex,
}: PanelProps) {
  const mode = darkMode ? Mode.Dark : Mode.Light;

  const popoverProps = {
    popoverZIndex,
    usePortal,
    portalClassName,
    portalContainer,
    scrollContainer,
  } as const;

  return (
    <div
      className={getPanelStyles(mode, !!language)}
      data-testid="leafygreen-code-panel"
    >
      {language !== undefined &&
        languageOptions !== undefined &&
        onChange !== undefined && (
          <LanguageSwitcher
            onChange={onChange}
            language={language}
            languageOptions={languageOptions}
            darkMode={darkMode}
            {...popoverProps}
          />
        )}

      {showCopyButton && (
        <CopyButton
          onCopy={onCopy}
          darkMode={darkMode}
          contents={contents}
          withLanguageSwitcher={!!language}
        />
      )}
      {showCustomActionButtons && (
        <>{customActionButtons?.map((action: React.ReactNode) => action)}</>
      )}
    </div>
  );
}

Panel.displayName = 'Panel';

export default Panel;
