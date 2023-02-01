import React from 'react';

import { css, cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { spacing } from '@leafygreen-ui/tokens';

import CopyButton from '../CopyButton/CopyButton';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';
import {
  LanguageOption,
  LanguageSwitcher as LanguageSwitcherProps,
  PopoverProps,
} from '../types';

const basePanelStyle = css`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  gap: ${spacing[1]}px;

  svg {
    width: 16px;
    height: 16px;
  }
`;

const basePanelThemeStyle: Record<Theme, string> = {
  [Theme.Light]: css`
    background-color: ${palette.white};
  `,
  [Theme.Dark]: css`
    background-color: ${palette.gray.dark2};
  `,
};

const sidePanelStyle = css`
  flex-direction: column;
  padding: 6px;
  border-left: solid 1px;
`;

const sidePanelThemeStyles: Record<Theme, string> = {
  [Theme.Light]: cx(
    sidePanelStyle,
    css`
      border-color: ${palette.gray.light2};
    `,
  ),
  [Theme.Dark]: cx(
    sidePanelStyle,
    css`
      border-color: ${palette.gray.dark2};
    `,
  ),
};

const languageSwitcherPanelStyle = css`
  flex-direction: row;
  border-bottom: 1px solid;
  justify-content: space-between;
  padding: 0;
  padding-right: 8px;
  height: 40px; // 28px (icon) + 2 x 6px (focus shadow). Can't use padding b/c switcher
`;

const languageSwitcherPanelThemeStyles: Record<Theme, string> = {
  [Theme.Light]: cx(
    languageSwitcherPanelStyle,
    css`
      border-color: ${palette.gray.light2};
    `,
  ),
  [Theme.Dark]: cx(
    languageSwitcherPanelStyle,
    css`
      border-color: ${palette.gray.dark1};
    `,
  ),
};

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
  const { theme } = useDarkMode();

  const popoverProps = {
    popoverZIndex,
    usePortal,
    portalClassName,
    portalContainer,
    scrollContainer,
  } as const;

  return (
    <div
      className={cx(
        basePanelStyle,
        basePanelThemeStyle[theme],
        {
          [sidePanelThemeStyles[theme]]: !language,
          [languageSwitcherPanelThemeStyles[theme]]: !!language,
        },
        className,
      )}
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
