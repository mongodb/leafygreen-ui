import React, { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import {
  useViewportSize,
  useIdAllocator,
  useEventListener,
} from '@leafygreen-ui/hooks';
import { uiColors } from '@leafygreen-ui/palette';
import { OneOf, keyMap } from '@leafygreen-ui/lib';
import { PopoverProps } from '@leafygreen-ui/popover';
import { fontFamilies, breakpoints, spacing } from '@leafygreen-ui/tokens';
import {
  colorSets,
  mobileSizeSet,
  Mode,
  Size,
  sizeSets,
  State,
} from './styleSets';
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

const sharedTextStyles = css`
  font-family: ${fontFamilies.default};
  display: block;
`;

const labelStyle = css`
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
  description?: string;
  placeholder?: string;
  name?: string;
  allowDeselect?: boolean;
  errorMessage?: string;
  state?: State;
  __INTERNAL__menuButtonSlot__?: React.ForwardRefExoticComponent<
    React.RefAttributes<unknown>
  >;
} & Omit<PopoverProps, 'active' | 'spacing'> &
  (
    | // Uncontrolled
    ({
        defaultValue?: string;
        value?: undefined;
      } & {
        onChange?: (
          value: string,
          event: React.MouseEvent | KeyboardEvent | React.KeyboardEvent,
        ) => void;
        readOnly?: false;
      })
    // Controlled
    | ({ value: string; defaultValue?: undefined } & (
        | {
            onChange: (
              value: string,
              event: React.MouseEvent | KeyboardEvent | React.KeyboardEvent,
            ) => void;
            readOnly?: false;
          }
        | { readOnly: true; onChange?: undefined }
      ))
  ) &
  OneOf<{ label: string }, { 'aria-labelledby': string }>;

export default function Select({
  children,
  darkMode = false,
  size = Size.Default,
  disabled = false,
  allowDeselect = true,
  placeholder = 'Select',
  className,
  id: idProp,
  label,
  'aria-labelledby': ariaLabelledby,
  description,
  name,
  defaultValue,
  value,
  onChange,
  readOnly,
  usePortal = true,
  portalContainer,
  scrollContainer,
  portalClassName,
  popoverZIndex,
  errorMessage = 'error message right here',
  state = State.None,
  __INTERNAL__menuButtonSlot__,
}: Props) {
  const id = useIdAllocator({ prefix: 'select', id: idProp });
  const labelId = useMemo(() => ariaLabelledby ?? `${id}-label`, [
    ariaLabelledby,
    id,
  ]);

  if (!label && !ariaLabelledby) {
    console.error(
      'For screen-reader accessibility, label or aria-labelledby must be provided to Select.',
    );
  }

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
    (option: OptionElement | null, event: React.MouseEvent | KeyboardEvent) => {
      if (value === undefined) {
        setUncontrolledSelectedOption(option);
      }
      onChange?.(getOptionValue(option), event);
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
          onSelect(option, event);
          onClose();
        }
      };
    },
    [disabled, onClose, onSelect],
  );

  /**
   * Focus
   */

  const [focusedOption, setFocusedOption] = useState<
    OptionElement | null | undefined
  >();

  const enabledOptions = useMemo(() => {
    const enabledOptions: Array<OptionElement | null> = [];

    if (allowDeselect) {
      enabledOptions.push(null);
    }

    traverseSelectChildren(children, (option, group) => {
      if (!isOptionDisabled(option, group)) {
        enabledOptions.push(option);
      }
    });

    return enabledOptions;
  }, [children, allowDeselect]);

  const onSelectFocusedOption = useCallback(
    (event: KeyboardEvent) => {
      if (focusedOption !== undefined) {
        onSelect(focusedOption, event);
      }
    },
    [focusedOption, onSelect],
  );

  const onFocusFirstOption = useCallback(() => {
    setFocusedOption(enabledOptions[0]);
  }, [enabledOptions]);

  const onFocusLastOption = useCallback(() => {
    setFocusedOption(enabledOptions[enabledOptions.length - 1]);
  }, [enabledOptions]);

  const onFocusPreviousOption = useCallback(() => {
    if (
      focusedOption === undefined ||
      enabledOptions.indexOf(focusedOption) === 0
    ) {
      onFocusLastOption();
    } else {
      const index = enabledOptions.indexOf(focusedOption) - 1;
      setFocusedOption(enabledOptions[index]);
    }
  }, [enabledOptions, focusedOption, onFocusLastOption]);

  const onFocusNextOption = useCallback(() => {
    if (
      focusedOption === undefined ||
      enabledOptions.indexOf(focusedOption) === enabledOptions.length - 1
    ) {
      onFocusFirstOption();
    } else {
      const index = enabledOptions.indexOf(focusedOption) + 1;

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

  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      // No support for modifiers yet
      if (event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }

      const isFocusInMenu = listMenuRef.current?.contains(
        document.activeElement,
      );
      const isFocusOnButton = menuButtonRef.current?.contains(
        document.activeElement,
      );
      const isFocusInComponent = isFocusOnButton || isFocusInMenu;

      // We only respond to keypresses if the focus is in the component
      if (isFocusInComponent) {
        switch (event.keyCode) {
          case keyMap.Tab:
          case keyMap.Escape:
            onClose();
            setFocusedOption(undefined);
            break;
          case keyMap.Enter:
          case keyMap.Space:
            if (open && !isFocusOnButton) {
              // Default behavior is to use these keys to open the dropdown but we handle that manually
              event.preventDefault();
            }

            onSelectFocusedOption(event);
            break;
          case keyMap.ArrowUp:
            if (!open && isFocusOnButton) {
              onOpen();
            }
            event.preventDefault(); // Prevents page scrolling
            onFocusPreviousOption();
            break;
          case keyMap.ArrowDown:
            if (!open && isFocusOnButton) {
              onOpen();
            }
            event.preventDefault(); // Prevents page scrolling
            onFocusNextOption();
            break;
        }
      }
    },
    [
      listMenuRef,
      menuButtonRef,
      onClose,
      open,
      onSelectFocusedOption,
      onFocusPreviousOption,
      onFocusNextOption,
      onOpen,
    ],
  );

  useEventListener('keydown', onKeyDown);

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

  const popoverProps = {
    popoverZIndex,
    ...(usePortal
      ? {
          usePortal,
          portalClassName,
          portalContainer,
          scrollContainer,
        }
      : { usePortal }),
  };

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
      {label && (
        <label
          id={labelId}
          className={cx(
            sharedTextStyles,
            labelStyle,
            css`
              color: ${disabled
                ? colorSet.label.disabled
                : colorSet.label.base};
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
      )}

      {description && (
        <div
          id={descriptionId}
          className={cx(
            sharedTextStyles,
            css`
              color: ${colorSet.description};
              font-size: ${sizeSet.description.text}px;
              line-height: ${sizeSet.description.lineHeight}px;

              @media only screen and (max-width: ${breakpoints.Desktop}px) {
                font-size: ${mobileSizeSet.description.text}px;
                line-height: ${mobileSizeSet.description.lineHeight}px;
              }
            `,
          )}
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
          onOpen={onOpen}
          onClose={onClose}
          aria-labelledby={labelId}
          aria-controls={menuId}
          aria-expanded={open}
          aria-describedby={descriptionId}
          aria-invalid={state === State.Error}
          errorMessage={errorMessage}
          state={state}
          __INTERNAL__menuButtonSlot__={__INTERNAL__menuButtonSlot__}
        >
          <ListMenu
            labelId={labelId}
            id={menuId}
            referenceElement={menuButtonRef}
            ref={listMenuRef}
            className={css`
              width: ${menuButtonRef.current?.clientWidth}px;
            `}
            {...popoverProps}
          >
            {allowDeselect && deselectionOption}
            {renderedChildren}
          </ListMenu>
        </MenuButton>
      </SelectContext.Provider>
      {state === State.Error && errorMessage && (
        <span
          className={cx(
            sharedTextStyles,
            css`
              color: ${darkMode ? '#F97216' : uiColors.red.base};
              font-size: ${sizeSet.description.text}px;
              line-height: ${sizeSet.description.lineHeight}px;
              margin-top: ${spacing[1]}px;
              padding-left: 2px;

              @media only screen and (max-width: ${breakpoints.Desktop}px) {
                font-size: ${mobileSizeSet.description.text}px;
                line-height: ${mobileSizeSet.description.lineHeight}px;
              }
            `,
          )}
        >
          {errorMessage}
        </span>
      )}
    </div>
  );
}

Select.displayName = 'Select';

Select.propTypes = {
  label: PropTypes.string,
  'aria-labelledby': PropTypes.string,
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
  errorMessage: PropTypes.string,
  state: PropTypes.oneOf(Object.values(State)),
};
