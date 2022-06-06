import { css, cx } from '@leafygreen-ui/emotion';
import { useIdAllocator } from '@leafygreen-ui/hooks';
import { uiColors } from '@leafygreen-ui/palette';
import { Mode } from '@leafygreen-ui/tokens';
import React, { useContext } from 'react';
import { ComboboxGroupProps } from './Combobox.types';
import { ComboboxContext } from './ComboboxContext';

const comboboxGroupStyle: Record<Mode, string> = {
  [Mode.Light]: css`
    padding-top: 8px;
    border-bottom: 1px solid ${uiColors.gray.light1};
  `,
  [Mode.Dark]: css`
    padding-top: 8px;
    border-bottom: 1px solid ${uiColors.gray.dark1};
  `,
};

const comboboxGroupLabel = css`
  cursor: default;
  width: 100%;
  padding: 0 12px 2px;
  outline: none;
  overflow-wrap: anywhere;
  font-size: 12px;
  line-height: 16px;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.4px;
`;

const comboboxGroupLabelModeStyle: Record<Mode, string> = {
  [Mode.Light]: css`
    color: ${uiColors.gray.dark1};
  `,
  [Mode.Dark]: css`
    color: ${uiColors.gray.light1};
  `,
};

export function InternalComboboxGroup({
  label,
  className,
  children,
}: ComboboxGroupProps): JSX.Element {
  const { darkMode } = useContext(ComboboxContext);
  const mode = darkMode ? Mode.Dark : Mode.Light;

  const groupId = useIdAllocator({ prefix: 'combobox-group' });
  const childCount = React.Children.count(children);

  return childCount > 0 ? (
    <div className={cx(comboboxGroupStyle[mode], className)}>
      <div
        className={cx(comboboxGroupLabel, comboboxGroupLabelModeStyle[mode])}
        id={groupId}
      >
        {label}
      </div>
      <div role="group" aria-labelledby={groupId}>
        {children}
      </div>
    </div>
  ) : (
    <></>
  );
}

ComboboxGroup.displayName = 'ComboboxGroup';

export default function ComboboxGroup(_: ComboboxGroupProps): JSX.Element {
  throw Error('`ComboboxGroup` must be a child of a `Combobox` instance');
}
