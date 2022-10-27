import React, { useContext } from 'react';
import { cx, css } from '@leafygreen-ui/emotion';
import { spacing } from '@leafygreen-ui/tokens';
import CopyButton from './CopyButton';
import LanguageSwitcher from './LanguageSwitcher';
import { PopoverProps } from './types';
import {
  LanguageOption,
  LanguageSwitcher as LanguageSwitcherProps,
} from './types';
import { palette } from '@leafygreen-ui/palette';
import CodeContext from './CodeContext';
import { Theme } from '@leafygreen-ui/lib';

function getSidebarVariantStyle(mode: Theme): string {
  switch (mode) {
    case Theme.Light:
      return css`
        background-color: ${palette.white};
        border-color: ${palette.gray.light2};
      `;

    case Theme.Dark:
      return css`
        background-color: ${palette.gray.dark2};
        border-color: ${palette.gray.dark2};
      `;
  }
}

function getPanelStyles(mode: Theme, withLanguageSwitcher: boolean) {
  const basePanelStyle = css`
    display: flex;
    align-items: center;
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
    justify-content: space-between;
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
  showCopyButton?: boolean;
  language?: LanguageOption;
  isMultiline?: boolean;
  customActionButtons?: Array<React.ReactElement>;
  showCustomActionButtons?: boolean;
  className?: string;
} & PopoverProps;

function Panel({
  language,
  languageOptions,
  contents,
  onChange,
  onCopy,
  showCopyButton,
  customActionButtons,
  showCustomActionButtons,
  usePortal,
  portalClassName,
  portalContainer,
  scrollContainer,
  popoverZIndex,
  className,
}: PanelProps) {
  const { theme, darkMode } = useContext(CodeContext);

  const popoverProps = {
    popoverZIndex,
    usePortal,
    portalClassName,
    portalContainer,
    scrollContainer,
  } as const;

  return (
    <div
      className={cx(getPanelStyles(theme, !!language), className)}
      data-testid="leafygreen-code-panel"
    >
      {language !== undefined &&
        languageOptions !== undefined &&
        onChange !== undefined && (
          <LanguageSwitcher
            onChange={onChange}
            language={language}
            languageOptions={languageOptions}
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
        // TODO: cloneElement can be removed when the provider is updated
        <>
          {customActionButtons?.map((action: React.ReactElement) =>
            React.cloneElement(action, {
              darkMode: darkMode,
            }),
          )}
        </>
      )}
    </div>
  );
}

Panel.displayName = 'Panel';

export default Panel;
