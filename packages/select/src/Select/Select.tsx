import React, {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { css, cx } from '@leafygreen-ui/emotion';
import { DEFAULT_MESSAGES, FormFieldFeedback } from '@leafygreen-ui/form-field';
import {
  useEventListener,
  useForwardedRef,
  useIdAllocator,
  useViewportSize,
} from '@leafygreen-ui/hooks';
import LeafyGreenProvider, {
  PopoverPropsProvider,
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';
import { keyMap } from '@leafygreen-ui/lib';
import { getPopoverRenderModeProps } from '@leafygreen-ui/popover';
import { BaseFontSize } from '@leafygreen-ui/tokens';
import { Description, Label } from '@leafygreen-ui/typography';

import { LGIDS_SELECT } from '../constants';
import ListMenu from '../ListMenu';
import MenuButton from '../MenuButton';
import { InternalOption, OptionElement } from '../Option';
import SelectContext from '../SelectContext';
import { mobileSizeSet } from '../styleSets';
import {
  convertToInternalElements,
  getOptionValue,
  isOptionDisabled,
  isOptionSelectable,
  MobileMediaQuery,
  reconcileOption,
  traverseSelectChildren,
  useStateRef,
} from '../utils/utils';

import {
  labelDescriptionContainerStyle,
  largeLabelStyles,
  wrapperStyle,
} from './Select.styles';
import {
  DismissMode,
  DropdownWidthBasis,
  RenderMode,
  SelectProps,
  Size,
  State,
} from './Select.types';

/**
 * Select inputs are typically used alongside other form elements like toggles, radio boxes, or text inputs when a user needs to make a selection from a list of items.
 *
 * In a select input where there are less than 3-4 items, consider using radio boxes, or radio inputs instead.
 */
export const Select = forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      children,
      darkMode: darkModeProp,
      size = Size.Default,
      disabled = false,
      allowDeselect = true,
      renderMode = RenderMode.TopLayer,
      placeholder = 'Select',
      errorMessage = DEFAULT_MESSAGES.error,
      successMessage = DEFAULT_MESSAGES.success,
      state = State.None,
      dropdownWidthBasis = DropdownWidthBasis.Trigger,
      baseFontSize = BaseFontSize.Body1,
      'data-lgid': dataLgId = LGIDS_SELECT.root,
      id: idProp,
      'aria-labelledby': ariaLabelledby,
      'aria-label': ariaLabel,
      className,
      label,
      description,
      name,
      defaultValue,
      value,
      onChange,
      readOnly,
      portalContainer,
      portalRef,
      scrollContainer,
      portalClassName,
      popoverZIndex,
      onEntering,
      onEnter,
      onEntered,
      onExiting,
      onExit,
      onExited,
      __INTERNAL__menuButtonSlot__,
      ...rest
    },
    fwdRef,
  ) => {
    const id = useIdAllocator({ prefix: 'select', id: idProp });
    const labelId = useMemo(
      () => (ariaLabel && !label ? undefined : ariaLabelledby ?? `${id}-label`),
      [ariaLabelledby, ariaLabel, label, id],
    );

    if (!label && !ariaLabelledby && !ariaLabel) {
      console.error(
        'For screen-reader accessibility, label, aria-label, or aria-labelledby must be provided to Select.',
      );
    }

    const { darkMode } = useDarkMode(darkModeProp);

    const descriptionId = `${id}-description`;
    const menuId = `${id}-menu`;

    const [open, setOpen] = useState(false);

    const containerRef = useForwardedRef(fwdRef, null);
    const menuButtonRef = useStateRef<HTMLButtonElement>(null);
    const menuButtonId = useIdAllocator({ prefix: 'select' });
    const listMenuRef = useStateRef<HTMLUListElement | null>(null);

    const providerData = useMemo(() => {
      return { size, open, disabled };
    }, [size, open, disabled]);

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
    }, [
      children,
      initialUncontrolledSelectedOption,
      uncontrolledSelectedOption,
    ]);

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
      (
        option: OptionElement | null,
        event: React.MouseEvent | KeyboardEvent,
      ) => {
        event.preventDefault();
        event.stopPropagation();
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
          switch (event.key) {
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
              ...option.props,
              className: option.props.className,
              glyph: option.props.glyph,
              selected,
              focused: option === focusedOption,
              disabled,
              children: option.props.children,
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
      onEntering,
      onEnter,
      onEntered,
      onExiting,
      onExit,
      onExited,
      ...getPopoverRenderModeProps({
        dismissMode: DismissMode.Manual,
        portalClassName,
        portalContainer,
        portalRef,
        renderMode,
        scrollContainer,
      }),
    } as const;

    return (
      <LeafyGreenProvider darkMode={darkMode}>
        <div
          ref={containerRef}
          className={cx(wrapperStyle, className)}
          data-lgid={dataLgId}
        >
          {(label || description) && (
            <div className={labelDescriptionContainerStyle}>
              {label && (
                <Label
                  htmlFor={menuButtonId}
                  id={labelId}
                  darkMode={darkMode}
                  disabled={disabled}
                  className={cx(
                    {
                      [largeLabelStyles]: size === Size.Large,
                      [css`
                        font-size: ${baseFontSize}px;
                        line-height: 20px;
                      `]: size === Size.Default,
                    },
                    css`
                      // Prevent hover state from showing when hovering label
                      pointer-events: none;
                    `,
                    css`
                      ${MobileMediaQuery} {
                        font-size: ${mobileSizeSet.label.text}px;
                        line-height: ${mobileSizeSet.label.lineHeight}px;
                      }
                    `,
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
                    {
                      [largeLabelStyles]: size === Size.Large,
                      [css`
                        font-size: ${baseFontSize}px;
                        line-height: 20px;
                      `]: size === Size.Default,
                    },
                    css`
                      ${MobileMediaQuery} {
                        font-size: ${mobileSizeSet.description.text}px;
                        line-height: ${mobileSizeSet.description.lineHeight}px;
                      }
                    `,
                  )}
                >
                  {description}
                </Description>
              )}
            </div>
          )}

          <SelectContext.Provider value={providerData}>
            <MenuButton
              {...rest}
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
              aria-label={!label && !ariaLabelledby ? ariaLabel : undefined}
              aria-controls={menuId}
              aria-expanded={open}
              aria-describedby={descriptionId}
              aria-invalid={state === State.Error}
              aria-disabled={disabled}
              state={state}
              baseFontSize={baseFontSize}
              __INTERNAL__menuButtonSlot__={__INTERNAL__menuButtonSlot__}
            />
            <PopoverPropsProvider {...popoverProps}>
              <ListMenu
                labelId={labelId}
                id={menuId}
                referenceElement={menuButtonRef}
                ref={listMenuRef}
                className={cx({
                  [css`
                    width: ${menuButtonRef.current?.clientWidth}px;
                  `]: dropdownWidthBasis === DropdownWidthBasis.Trigger,
                })}
                dropdownWidthBasis={dropdownWidthBasis}
                {...popoverProps}
              >
                {allowDeselect && deselectionOption}
                {renderedChildren}
              </ListMenu>
            </PopoverPropsProvider>
          </SelectContext.Provider>
          <FormFieldFeedback
            disabled={disabled}
            errorMessage={errorMessage}
            hideFeedback={open}
            size={size}
            state={state}
            successMessage={successMessage}
          />
        </div>
      </LeafyGreenProvider>
    );
  },
);

Select.displayName = 'Select';
