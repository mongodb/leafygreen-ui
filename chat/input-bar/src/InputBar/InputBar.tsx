// A lot of logic to handle the dropdown behavior is abstracted from the SearchInput component.
// This should be replaced in the future with more reusable logic.
// https://jira.mongodb.org/browse/LG-3554
import React, {
  ChangeEventHandler,
  FocusEventHandler,
  FormEventHandler,
  ForwardedRef,
  forwardRef,
  KeyboardEventHandler,
  MouseEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import flattenChildren from 'react-keyed-flatten-children';
import TextareaAutosize from 'react-textarea-autosize';
import { useLeafyGreenChatContext } from '@lg-chat/leafygreen-chat-provider';
import isUndefined from 'lodash/isUndefined';

import Badge from '@leafygreen-ui/badge';
import Button from '@leafygreen-ui/button';
import { cx } from '@leafygreen-ui/emotion';
import {
  useAutoScroll,
  useBackdropClick,
  useDynamicRefs,
  useForwardedRef,
} from '@leafygreen-ui/hooks';
import LeafyGreenProvider, {
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';
import { getNodeTextContent, isComponentType } from '@leafygreen-ui/lib';
import { SearchResultsMenu } from '@leafygreen-ui/search-input';
import { breakpoints } from '@leafygreen-ui/tokens';

import { setReactTextAreaValue } from '../utils/setReactTextAreaValue';

import {
  baseStyles,
  contentWrapperFocusStyles,
  contentWrapperStyles,
  contentWrapperThemeStyles,
  disabledThemeStyles,
  focusContainerStyles,
  focusStyles,
  getIconFill,
  gradientAnimationStyles,
  inputStyles,
  inputThemeStyles,
  leftContentStyles,
  rightContentStyles,
  sendButtonDisabledStyles,
} from './InputBar.styles';
import { ReturnIcon } from './ReturnIcon';
import { SparkleIcon } from './SparkleIcon';
import { InputBarProps } from '.';

export const InputBar = forwardRef<HTMLFormElement, InputBarProps>(
  (
    {
      className,
      textareaProps,
      onMessageSend,
      onSubmit,
      shouldRenderGradient: shouldRenderGradientProp = true,
      badgeText,
      darkMode: darkModeProp,
      disabled,
      disableSend,
      children,
      dropdownFooterSlot,
      dropdownProps,
      ...rest
    }: InputBarProps,
    forwardedRef: ForwardedRef<HTMLFormElement>,
  ) => {
    const formRef = useForwardedRef(forwardedRef, null);
    const focusContainerRef = useRef<HTMLDivElement>(null);
    const menuRef = useRef<HTMLUListElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const promptRefs = useDynamicRefs<HTMLElement>({
      prefix: 'suggested-prompt',
    });
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [messageBody, setMessageBody] = useState<string>(
      textareaProps?.value?.toString() ?? '',
    );
    const [isOpen, setOpen] = useState(false);

    // The index of the currently highlighted result option
    const [highlightIndex, setHighlightIndex] = useState<number | undefined>(
      undefined,
    );
    const highlightedElementRef = promptRefs(`${highlightIndex}`);
    const [shouldRenderButtonText, setShouldRenderButtonText] =
      useState<boolean>(false);

    const { darkMode, theme } = useDarkMode(darkModeProp);
    const { containerWidth } = useLeafyGreenChatContext();
    const shouldRenderGradient =
      shouldRenderGradientProp && isFocused && !disabled;
    const isSendButtonDisabled = () =>
      disableSend || disabled || messageBody === '';
    const withTypeAhead = !isUndefined(children);

    /**
     * Helper function that both counts the number of `SearchResult` descendants
     * and adds the appropriate props to said children
     */
    const processChildren = useCallback(() => {
      // Count results (not just children, since groups are still children)
      let resultsCount = 0;

      const processChild = (
        child: React.ReactNode,
      ): JSX.Element | undefined => {
        if (isComponentType(child, 'SuggestedPrompt')) {
          resultsCount += 1;
          const index = resultsCount - 1;

          const textValue = getNodeTextContent(child);

          const onElementClick: MouseEventHandler = e => {
            child.props.onClick?.(e); // call the child's onClick handler

            // Update the input value so the submit event has a target.value
            setMessageBody(textValue);
            // allow the state update to be consumed in submit
            const submitTimeout = setTimeout(() => {
              formRef?.current?.requestSubmit();
              clearTimeout(submitTimeout);
            });
            closeMenu();
          };

          return React.cloneElement(child, {
            ...child.props,
            id: `suggested-prompt-${index}`,
            key: `suggested-prompt-${index}`,
            ref: child.props.ref ?? promptRefs?.(`${index}`),
            highlighted: index === highlightIndex,
            onClick: onElementClick,
          });
        } else if (isComponentType(child, 'SuggestedPrompts')) {
          const nestedChildren = React.Children.map(
            child.props.children,
            processChild,
          );

          if (nestedChildren && nestedChildren.length > 0) {
            return React.cloneElement(child, {
              ...child.props,
              children: nestedChildren,
            });
          }
        }
      };

      const flattenedChildren = flattenChildren(children);
      const updatedChildren = flattenedChildren.map(processChild);

      return {
        resultsCount,
        updatedChildren,
      };
    }, [children, highlightIndex, textareaRef, promptRefs, setMessageBody]);

    const { updatedChildren, resultsCount } = useMemo(
      () => processChildren(),
      [processChildren],
    );

    useEffect(() => {
      const newState: boolean =
        containerWidth !== undefined && containerWidth >= breakpoints.Mobile;

      if (newState !== shouldRenderButtonText) {
        setShouldRenderButtonText(newState);
      }
    }, [containerWidth]);

    const handleChange: ChangeEventHandler<HTMLTextAreaElement> = e => {
      setMessageBody(e.target.value);
      textareaProps?.onChange && textareaProps?.onChange?.(e);
    };

    type Direction = 'next' | 'prev' | 'first' | 'last';
    const updateHighlight = (direction: Direction) => {
      switch (direction) {
        case 'first': {
          setHighlightIndex(0);
          break;
        }

        case 'last': {
          setHighlightIndex(resultsCount);
          break;
        }

        case 'next': {
          const nextIndex =
            !isUndefined(highlightIndex) && highlightIndex + 1 < resultsCount
              ? highlightIndex + 1
              : 0;
          setHighlightIndex(nextIndex);
          break;
        }

        case 'prev': {
          const nextIndex =
            !isUndefined(highlightIndex) && highlightIndex - 1 >= 0
              ? highlightIndex - 1
              : resultsCount - 1;
          setHighlightIndex(nextIndex);
        }
      }
    };

    const closeMenu = () => {
      setOpen(false);
      setHighlightIndex(undefined);
    };

    const openMenu = () => setOpen(true);

    const handleKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = e => {
      const isFocusInMenu = menuRef.current?.contains(document.activeElement);
      const isFocusOnTextarea = focusContainerRef.current?.contains(
        document.activeElement,
      );
      const isFocusInComponent = isFocusOnTextarea || isFocusInMenu;

      if (isFocusInComponent) {
        switch (e.key) {
          case 'Enter': {
            e.preventDefault();
            if (!isUndefined(highlightIndex)) {
              highlightedElementRef?.current?.click();
            } else {
              if (!e.ctrlKey && !e.shiftKey) {
                formRef.current?.requestSubmit();
              } else if (e.ctrlKey || e.shiftKey) {
                // ctrlKey + Enter doesn't enter a \n by default. Add character manually
                setReactTextAreaValue(
                  textareaRef?.current as HTMLTextAreaElement,
                  messageBody + '\n',
                );
                setMessageBody(messageBody + '\n');
                const changeEvent = new Event('change', { bubbles: true });
                textareaRef.current?.dispatchEvent(changeEvent);
              }
            }
            break;
          }

          case 'Escape': {
            closeMenu();
            textareaRef.current?.focus();
            break;
          }

          case 'ArrowDown': {
            if (withTypeAhead) {
              textareaRef.current?.focus();
              openMenu();
              e.preventDefault(); // Stop page scroll
              if (isUndefined(highlightIndex)) {
                setHighlightIndex(0);
              } else {
                updateHighlight('next');
              }
            }
            break;
          }

          case 'ArrowUp': {
            if (withTypeAhead) {
              textareaRef.current?.focus();
              openMenu();
              e.preventDefault(); // Stop page scroll
              if (isUndefined(highlightIndex)) {
                setHighlightIndex(resultsCount - 1);
              } else {
                updateHighlight('prev');
              }
            }
            break;
          }

          case 'Tab': {
            if (isOpen) {
              closeMenu();
            }
            break;
          }

          default: {
            textareaProps?.onKeyDown && textareaProps?.onKeyDown?.(e);
            closeMenu();
          }
        }
      }
    };

    const handleSubmit: FormEventHandler<HTMLFormElement> = e => {
      e.preventDefault();
      if (!isSendButtonDisabled()) {
        if (onMessageSend && messageBody) {
          onMessageSend(messageBody, e);
          setMessageBody('');
        }
        onSubmit?.(e);
      }
    };

    const handleFocus: FocusEventHandler<HTMLTextAreaElement> = _ => {
      setIsFocused(true);
      openMenu();
    };

    const handleBlur: FocusEventHandler<HTMLTextAreaElement> = _ => {
      setIsFocused(false);
    };

    const handleBackdropClick = () => {
      closeMenu();
    };

    useAutoScroll(highlightedElementRef, menuRef, 12);
    useBackdropClick(
      handleBackdropClick,
      [focusContainerRef, menuRef],
      isOpen && withTypeAhead,
    );

    return (
      <LeafyGreenProvider darkMode={darkMode}>
        <form
          className={cx(baseStyles, className)}
          onSubmit={handleSubmit}
          ref={formRef}
          {...rest}
        >
          <div
            className={cx(focusContainerStyles, {
              [gradientAnimationStyles]: shouldRenderGradient,
              [focusStyles]: !shouldRenderGradient && isFocused && !disabled,
            })}
            ref={focusContainerRef}
          >
            <div
              className={cx(
                contentWrapperStyles,
                contentWrapperThemeStyles[theme],
                {
                  [disabledThemeStyles[theme]]: disabled,
                  [contentWrapperFocusStyles]: isFocused,
                },
              )}
            >
              <div className={leftContentStyles}>
                <SparkleIcon fill={getIconFill(theme, disabled)} />
                {badgeText && <Badge variant="blue">{badgeText}</Badge>}
              </div>
              <TextareaAutosize
                placeholder={'Type your message here'}
                value={messageBody}
                disabled={disabled}
                {...(textareaProps ?? {})}
                className={cx(
                  inputStyles,
                  inputThemeStyles[theme],
                  textareaProps?.className,
                )}
                onKeyDown={handleKeyDown}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                ref={textareaRef}
              />
              <div className={rightContentStyles}>
                <Button
                  size="small"
                  rightGlyph={
                    <ReturnIcon fill={getIconFill(theme, disabled)} />
                  }
                  type="submit"
                  disabled={isSendButtonDisabled()}
                  className={cx({
                    [sendButtonDisabledStyles]: isSendButtonDisabled(),
                  })}
                >
                  {shouldRenderButtonText && 'Enter'}
                </Button>
              </div>
            </div>
          </div>
          {withTypeAhead && (
            <SearchResultsMenu
              open={isOpen}
              refEl={focusContainerRef}
              ref={menuRef}
              footerSlot={dropdownFooterSlot}
              {...dropdownProps}
            >
              {updatedChildren}
            </SearchResultsMenu>
          )}
        </form>
      </LeafyGreenProvider>
    );
  },
);

InputBar.displayName = 'InputBar';
