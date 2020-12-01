import React, { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { useViewportSize } from '@leafygreen-ui/hooks';
import { IdAllocator } from '@leafygreen-ui/lib';
import { breakpoints } from '@leafygreen-ui/tokens';
import { colorSets, mobileSizeSet, Mode, Size, sizeSets } from './styleSets';
import ListMenu from './ListMenu';
import MenuButton from './MenuButton';
import SelectContext from './SelectContext';
import { InternalOption, OptionElement } from './Option';
import {
  convertToInternalElements,
  getOptionValue,
  isOptionDisabled,
  isOptionSelectable,
  reconcileOption,
  traverseSelectChildren,
  useStateRef,
} from './utils';

const labelStyle = css`
  display: inline-block;
  margin-bottom: 2px;
  font-weight: bold;
`;

export type Props = {
  children: React.ReactNode;
  className?: string;
  id?: string;
  darkMode?: boolean;
  size?: Size;
  disabled?: boolean;
  label: string;
  description?: string;
  placeholder?: string;
  name?: string;
} & (
  | // Uncontrolled
  ({
      defaultValue?: string;
      value?: undefined;
    } & {
      onChange?: (value: string) => void;
      readOnly?: false;
    })
  // Controlled
  | ({ value: string; defaultValue?: undefined } & (
      | {
          onChange: (value: string) => void;
          readOnly?: false;
        }
      | { readOnly: true; onChange?: undefined }
    ))
);

const idAllocator = IdAllocator.create('select');

export default function Select({
  children,
  darkMode = false,
  size = Size.Default,
  disabled = false,
  className,
  id: idProp,
  label,
  description,
  placeholder = 'Select',
  name,
  defaultValue,
  value,
  onChange,
  readOnly,
}: Props) {
  const id = useMemo(() => idProp ?? idAllocator.generate(), [idProp]);
  const labelId = `${id}-label`;
  const descriptionId = `${id}-description`;
  const menuId = `${id}-menu`;

  const [open, setOpen] = useState(false);

  const menuButtonRef = useStateRef<HTMLDivElement | null>(null);
  const listMenuRef = useStateRef<HTMLUListElement | null>(null);

  const mode = darkMode ? Mode.Dark : Mode.Light;
  const colorSet = colorSets[mode];
  const sizeSet = sizeSets[size];

  const providerData = useMemo(() => {
    return { mode, size, open, disabled };
  }, [mode, size, open, disabled]);

  useEffect(() => {
    if (value !== undefined && onChange === undefined && readOnly !== true) {
      console.warn(
        'You provided a `value` prop to a form field without an `onChange` handler. ' +
          'This will render a read-only field. ' +
          'If the field should be mutable use `defaultValue`. ' +
          'Otherwise, set either `onChange` or `readOnly`.',
      );
    }
  }, [onChange, readOnly, value]);

  /**
   * Open / close state
   */

  const onOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const onClose = useCallback(() => {
    setOpen(false);
    menuButtonRef.current!.focus();
  }, [menuButtonRef]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const onClickOutside = (event: MouseEvent) => {
      const stillFocused =
        menuButtonRef.current!.contains(event.target as Node) ||
        listMenuRef.current!.contains(event.target as Node);
      setOpen(stillFocused);
    };

    document.addEventListener('mousedown', onClickOutside);
    return () => {
      document.removeEventListener('mousedown', onClickOutside);
    };
  }, [listMenuRef, menuButtonRef, open]);

  const initialUncontrolledSelectedOption = useMemo(() => {
    let initialUncontrolledSelectedOption: OptionElement | null = null;

    if (value === undefined && defaultValue !== undefined) {
      traverseSelectChildren(children, (option, group) => {
        if (isOptionSelectable(option, group, defaultValue)) {
          initialUncontrolledSelectedOption = option;
        }
      });
    }

    return initialUncontrolledSelectedOption;
  }, [children, defaultValue, value]);

  /**
   * Selection
   */

  // We store the option element instance rather than just the value in order
  // to differentiate between multiple options that have the same value.
  const [
    uncontrolledSelectedOption,
    setUncontrolledSelectedOption,
  ] = useState<OptionElement | null>(initialUncontrolledSelectedOption);

  // If the option instances have changed we'll do our best to preserve
  // the state by checking if any of the new option instances sufficiently
  // match the current state and use it instead.
  useEffect(() => {
    if (uncontrolledSelectedOption !== null) {
      setUncontrolledSelectedOption(
        reconcileOption(children, uncontrolledSelectedOption) ??
          initialUncontrolledSelectedOption,
      );
    }
  }, [children, initialUncontrolledSelectedOption, uncontrolledSelectedOption]);

  const selectedOption = useMemo(() => {
    if (value !== undefined) {
      let selectedOption: OptionElement | null = null;

      traverseSelectChildren(children, (option, group) => {
        if (isOptionSelectable(option, group, value)) {
          selectedOption = option;
        }
      });
      return selectedOption;
    } else {
      return uncontrolledSelectedOption;
    }
  }, [children, uncontrolledSelectedOption, value]);

  const onSelect = useCallback(
    (option: OptionElement | null) => {
      if (value === undefined) {
        setUncontrolledSelectedOption(option);
      }
      onChange?.(getOptionValue(option));
      setFocusedOption(undefined);
      onClose();
    },
    [onChange, onClose, value],
  );

  const getOptionClickHandler = useCallback(
    (option: OptionElement | null, optionDisabled: boolean) => {
      return (event: React.MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();

        if (!disabled && !optionDisabled) {
          onSelect(option);
          onClose();
        }
      };
    },
    [disabled, onClose, onSelect],
  );

  const onDeselect = useCallback(() => {
    onSelect(null);
  }, [onSelect]);

  /**
   * Focus
   */

  const [focusedOption, setFocusedOption] = useState<
    OptionElement | null | undefined
  >();

  const enabledOptions = useMemo(() => {
    const enabledOptions: Array<OptionElement | null> = [null];

    traverseSelectChildren(children, (option, group) => {
      if (!isOptionDisabled(option, group)) {
        enabledOptions.push(option);
      }
    });

    return enabledOptions;
  }, [children]);

  const onSelectFocusedOption = useCallback(() => {
    if (focusedOption !== undefined) {
      onSelect(focusedOption);
    }
  }, [focusedOption, onSelect]);

  const onFocusFirstOption = useCallback(() => {
    setFocusedOption(null);
  }, []);

  const onFocusLastOption = useCallback(() => {
    setFocusedOption(enabledOptions[enabledOptions.length - 1]);
  }, [enabledOptions]);

  const onFocusPreviousOption = useCallback(() => {
    if (focusedOption === undefined) {
      onFocusLastOption();
    } else {
      const index = Math.max(0, enabledOptions.indexOf(focusedOption) - 1);
      setFocusedOption(enabledOptions[index]);
    }
  }, [enabledOptions, focusedOption, onFocusLastOption]);

  const onFocusNextOption = useCallback(() => {
    if (focusedOption === undefined) {
      onFocusFirstOption();
    } else {
      const index = Math.min(
        enabledOptions.length - 1,
        enabledOptions.indexOf(focusedOption) + 1,
      );
      setFocusedOption(enabledOptions[index]);
    }
  }, [enabledOptions, focusedOption, onFocusFirstOption]);

  const getOptionFocusHandler = useCallback(
    (option: OptionElement | null, optionDisabled: boolean) => {
      return (event: React.FocusEvent) => {
        event.preventDefault();
        event.stopPropagation();

        if (!disabled && !optionDisabled) {
          setFocusedOption(option);
        }
      };
    },
    [disabled],
  );

  /**
   * Rendering
   */

  const viewportSize = useViewportSize();

  const hasGlyphs = useMemo(() => {
    let hasGlyphs = false;

    traverseSelectChildren(children, option => {
      hasGlyphs ||= option.props.glyph !== undefined;
    });

    return hasGlyphs;
  }, [children]);

  const canTriggerScrollIntoView = useMemo(
    () =>
      viewportSize !== null &&
      listMenuRef.current !== null &&
      focusedOption === undefined &&
      open,
    [focusedOption, listMenuRef, open, viewportSize],
  );

  const deselectionOption = useMemo(() => {
    const selected = selectedOption === null;
    return (
      <InternalOption
        className={undefined}
        glyph={undefined}
        selected={selected}
        focused={focusedOption === null}
        disabled={false}
        onClick={getOptionClickHandler(null, false)}
        onFocus={getOptionFocusHandler(null, false)}
        isDeselection
        hasGlyphs
        triggerScrollIntoView={selected && canTriggerScrollIntoView}
      >
        {placeholder}
      </InternalOption>
    );
  }, [
    canTriggerScrollIntoView,
    focusedOption,
    getOptionClickHandler,
    getOptionFocusHandler,
    placeholder,
    selectedOption,
  ]);

  const renderedChildren = useMemo(
    () =>
      convertToInternalElements(
        children,
        (option, group) => {
          const selected = option === selectedOption;
          const disabled = isOptionDisabled(option, group);
          return {
            className: option.props.className,
            glyph: option.props.glyph,
            selected,
            focused: option === focusedOption,
            disabled,
            children: option.props.children,
            isDeselection: false,
            hasGlyphs,
            onClick: getOptionClickHandler(option, disabled),
            onFocus: getOptionFocusHandler(option, disabled),
            triggerScrollIntoView: selected && canTriggerScrollIntoView,
          };
        },
        () => {
          console.error(
            '`Select` instance received child that is not `Option` or `OptionGroup`.',
          );
        },
      ),
    [
      canTriggerScrollIntoView,
      children,
      focusedOption,
      getOptionClickHandler,
      getOptionFocusHandler,
      hasGlyphs,
      selectedOption,
    ],
  );

  return (
    <div
      className={cx(
        {
          [css`
            cursor: not-allowed;
          `]: disabled,
        },
        className,
      )}
    >
      <label
        id={labelId}
        className={cx(
          labelStyle,
          css`
            color: ${disabled ? colorSet.label.disabled : colorSet.label.base};
            font-size: ${sizeSet.label.text}px;
            line-height: ${sizeSet.label.lineHeight}px;

            @media only screen and (max-width: ${breakpoints.Desktop}px) {
              font-size: ${mobileSizeSet.label.text}px;
              line-height: ${mobileSizeSet.label.lineHeight}px;
            }
          `,
          {
            [css`
              cursor: not-allowed;
            `]: disabled,
          },
        )}
      >
        {label}
      </label>

      {description && (
        <div
          id={descriptionId}
          className={css`
            color: ${colorSet.description};
            font-size: ${sizeSet.description.text}px;
            line-height: ${sizeSet.description.lineHeight}px;

            @media only screen and (max-width: ${breakpoints.Desktop}px) {
              font-size: ${mobileSizeSet.description.text}px;
              line-height: ${mobileSizeSet.description.lineHeight}px;
            }
          `}
        >
          {description}
        </div>
      )}
      <SelectContext.Provider value={providerData}>
        <MenuButton
          ref={menuButtonRef}
          name={name}
          readOnly={readOnly}
          value={getOptionValue(selectedOption)}
          text={
            selectedOption !== null
              ? selectedOption.props.children
              : placeholder
          }
          deselected={selectedOption === null}
          onDeselect={onDeselect}
          onOpen={onOpen}
          onClose={onClose}
          onFocusFirstOption={onFocusFirstOption}
          onFocusLastOption={onFocusLastOption}
          aria-labelledby={labelId}
          aria-controls={menuId}
          aria-expanded={open}
          aria-describedby={descriptionId}
        >
          <ListMenu
            id={menuId}
            referenceElement={menuButtonRef}
            ref={listMenuRef}
            onClose={onClose}
            onSelectFocusedOption={onSelectFocusedOption}
            onFocusPreviousOption={onFocusPreviousOption}
            onFocusNextOption={onFocusNextOption}
            className={css`
              width: ${menuButtonRef.current?.clientWidth}px;
            `}
          >
            {deselectionOption}
            {renderedChildren}
          </ListMenu>
        </MenuButton>
      </SelectContext.Provider>
    </div>
  );
}

Select.displayName = 'Select';

Select.propTypes = {
  label: PropTypes.string.isRequired,
  description: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  darkMode: PropTypes.bool,
  size: PropTypes.oneOf(Object.values(Size)),
  disabled: PropTypes.bool,
  id: PropTypes.string,
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  onChange: PropTypes.func,
  readOnly: PropTypes.bool,
};
