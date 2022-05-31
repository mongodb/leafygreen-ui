import React, { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import {
  useViewportSize,
  useIdAllocator,
  useEventListener,
} from '@leafygreen-ui/hooks';
import { palette } from '@leafygreen-ui/palette';
import { OneOf, keyMap } from '@leafygreen-ui/lib';
import { PopoverProps } from '@leafygreen-ui/popover';
import { fontFamilies, breakpoints, spacing } from '@leafygreen-ui/tokens';
import { Label, Description } from '@leafygreen-ui/typography';
import {
  legacySizeSets,
  mobileSizeSet,
  sizeSets,
  Mode,
  Size,
  State,
  SizeSet,
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

const wrapperStyle = css`
  display: flex;
  flex-direction: column;
`;

const errorTextStyle = ({
  darkMode,
  sizeSet,
}: {
  darkMode: boolean;
  sizeSet: SizeSet;
}) => css`
  font-family: ${darkMode ? fontFamilies.legacy : fontFamilies.default};
  color: ${darkMode ? '#F97216' : palette.red.base};
  font-size: ${sizeSet.text}px;
  margin-top: ${spacing[1]}px;
  padding-left: 2px;
  transition: color 100ms ease-in-out;
  transition-delay: 100ms;
`;

export type SelectProps = {
  /**
   * Children rendered inside the component. Expected to be either `<Option>` or `<OptionGroup>`.
   */
  children: React.ReactNode;
  className?: string;
  /**
   * HTML `id` property used to allow Javascript, form, or label to reference the input.
   */
  id?: string;
  darkMode?: boolean;
  /**
   * Determines the size in which the component will be rendered.
   */
  size?: Size;
  /**
   * When present, it specifies that the drop-down list should be disabled.
   *
   * A `disabled` drop-down list is unusable and un-clickable.
   */
  disabled?: boolean;
  /**
   * Secondary text rendered under the label to provide additional details about the select and its options.
   */
  description?: string;
  /**
   * Text rendered in the Select component before a value is set.
   */
  placeholder?: string;
  /**
   * The `name` attribute specifies the name for a drop-down list.
   *
   * The `name` attribute is used to reference elements in a JavaScript, or to reference form data after a form is submitted.
   */
  name?: string;
  /**
   * Allows the user to unselect an option.
   */
  allowDeselect?: boolean;
  /**
   * Error message rendered when the `state` prop is set to `error`.
   */
  errorMessage?: string;
  /**
   * Determines whether the component should be rendered in an error state.
   */
  state?: State;
  __INTERNAL__menuButtonSlot__?: React.ForwardRefExoticComponent<
    React.RefAttributes<unknown>
  >;
} & Omit<PopoverProps, 'active' | 'spacing'> &
  (
    | // Uncontrolled
    ({
        /**
         * `value` makes the component a controlled component and using `defaultValue` makes it uncontrolled.
         */
        defaultValue?: string;
        /**
         * `value` makes the component a controlled component and using `defaultValue` makes it uncontrolled.
         */
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

/**
 * Select inputs are typically used alongside other form elements like toggles, radio boxes, or text inputs when a user needs to make a selection from a list of items.
 *
 * In a select input where there are less than 3-4 items, consider using radio boxes, or radio inputs instead.
 */
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
}: SelectProps) {
  const id = useIdAllocator({ prefix: 'select', id: idProp });
  const labelId = useMemo(
    () => ariaLabelledby ?? `${id}-label`,
    [ariaLabelledby, id],
  );

  if (!label && !ariaLabelledby) {
    console.error(
      'For screen-reader accessibility, label or aria-labelledby must be provided to Select.',
    );
  }

  const descriptionId = `${id}-description`;
  const menuId = `${id}-menu`;

  const [open, setOpen] = useState(false);

  const menuButtonRef = useStateRef<HTMLDivElement | null>(null);
  const menuButtonId = useIdAllocator({ prefix: 'select' });
  const listMenuRef = useStateRef<HTMLUListElement | null>(null);

  const mode = darkMode ? Mode.Dark : Mode.Light;
  const sizeSet = darkMode ? legacySizeSets[size] : sizeSets[size];

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
  const [uncontrolledSelectedOption, setUncontrolledSelectedOption] =
    useState<OptionElement | null>(initialUncontrolledSelectedOption);

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
        hasGlyphs={false}
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
    <div className={cx(wrapperStyle, className)}>
      {label && (
        <Label
          htmlFor={menuButtonId}
          id={labelId}
          darkMode={darkMode}
          disabled={disabled}
          className={cx(
            css`
              // Prevent hover state from showing when hovering label
              pointer-events: none;
            `,
            css`
              @media only screen and (max-width: ${breakpoints.Desktop}px) {
                font-size: ${mobileSizeSet.label.text}px;
                line-height: ${mobileSizeSet.label.lineHeight}px;
              }
            `,
            {
              [css`
                font-size: ${legacySizeSets[size].label!.text}px;
                line-height: ${legacySizeSets[size].label!.lineHeight}px;
                padding-bottom: 0;
                margin-bottom: 2px;
              `]: mode === Mode.Dark, // TODO: Refresh - remove conditional logic
            },
          )}
        >
          {label}
        </Label>
      )}

      {description && (
        <Description
          id={descriptionId}
          darkMode={darkMode}
          disabled={disabled}
          className={cx(
            css`
              @media only screen and (max-width: ${breakpoints.Desktop}px) {
                font-size: ${mobileSizeSet.description.text}px;
                line-height: ${mobileSizeSet.description.lineHeight}px;
              }
            `,
            {
              [css`
                font-size: ${legacySizeSets[size].description!.text}px;
                line-height: ${legacySizeSets[size].description!.lineHeight}px;
                padding-bottom: 0;
                margin-bottom: 2px;
              `]: mode === Mode.Dark, // TODO: Refresh - remove conditional logic
            },
          )}
        >
          {description}
        </Description>
      )}

      <SelectContext.Provider value={providerData}>
        <MenuButton
          id={menuButtonId}
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
            errorTextStyle({ darkMode, sizeSet }),
            css`
              @media only screen and (max-width: ${breakpoints.Desktop}px) {
                font-size: ${mobileSizeSet.description.text}px;
                line-height: ${mobileSizeSet.description.lineHeight}px;
              }
            `,
            {
              [css`
                // Hide error text when menu is open,
                // so it doesn't peek around the menu corner
                color: transparent;
              `]: open,
            },
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
  allowDeselect: PropTypes.bool,
};
