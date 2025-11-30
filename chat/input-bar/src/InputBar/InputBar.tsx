// A lot of logic to handle the dropdown behavior is abstracted from the SearchInput component.
// This should be replaced in the future with more reusable logic.
// https://jira.mongodb.org/browse/LG-3554
import React, {
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
import isUndefined from 'lodash/isUndefined';

import {
  useAutoScroll,
  useBackdropClick,
  useControlledValue,
  useDynamicRefs,
  useForwardedRef,
  useMergeRefs,
  usePrevious,
} from '@leafygreen-ui/hooks';
import LeafyGreenProvider, {
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';
import { getNodeTextContent, isComponentType } from '@leafygreen-ui/lib';
import { SearchResultsMenu } from '@leafygreen-ui/search-input';

import { DisclaimerText } from '../DisclaimerText';
import { InputBarFeedback } from '../InputBarFeedback';
import { InputBarSendButton } from '../InputBarSendButton';
import { InputBarStopButton } from '../InputBarStopButton';
import { State } from '../shared.types';
import { setReactTextAreaValue } from '../utils/setReactTextAreaValue';

import {
  actionContainerStyles,
  disclaimerTextStyles,
  getContentWrapperStyles,
  getFormStyles,
  getInnerFocusContainerStyles,
  getTextAreaStyles,
  outerFocusContainerStyles,
} from './InputBar.styles';
import { type InputBarProps } from './InputBar.types';

export const InputBar = forwardRef<HTMLFormElement, InputBarProps>(
  (
    {
      children,
      className,
      darkMode: darkModeProp,
      disabled = false,
      disableSend,
      dropdownFooterSlot,
      dropdownProps,
      errorMessage,
      onClickStopButton,
      onMessageSend,
      onSubmit,
      state,
      textareaProps,
      textareaRef: externalTextareaRef,
      ...rest
    }: InputBarProps,
    forwardedRef: ForwardedRef<HTMLFormElement>,
  ) => {
    const { darkMode, theme } = useDarkMode(darkModeProp);

    const formRef = useForwardedRef(forwardedRef, null);
    const focusContainerRef = useRef<HTMLDivElement | null>(null);
    const menuRef = useRef<HTMLUListElement | null>(null);
    const internalTextareaRef = useRef<HTMLTextAreaElement | null>(null);
    const textareaRef = useMergeRefs([
      internalTextareaRef,
      externalTextareaRef,
    ]);
    const promptRefs = useDynamicRefs<HTMLElement>({
      prefix: 'suggested-prompt',
    });
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [isOpen, setOpen] = useState(false);
    const [prevMessageBody, setPrevMessageBody] = useState<string>('');

    // Use controlled value hook to handle both controlled and uncontrolled modes
    const {
      value: messageBody,
      handleChange,
      updateValue,
      isControlled,
    } = useControlledValue<string>(
      textareaProps?.value?.toString(),
      textareaProps?.onChange,
      '',
    );
    const prevState = usePrevious(state);

    // The index of the currently highlighted result option
    const [highlightIndex, setHighlightIndex] = useState<number | undefined>(
      undefined,
    );
    const highlightedElementRef = promptRefs(`${highlightIndex}`);

    const isLoading = state === State.Loading;
    const isSendButtonDisabled =
      disabled || disableSend || messageBody?.trim() === '';
    const isStopButtonDisabled = disabled || !!disableSend;
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
            updateValue(textValue, internalTextareaRef);
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
    }, [children, promptRefs, highlightIndex, updateValue, formRef]);

    const { updatedChildren, resultsCount } = useMemo(
      () => processChildren(),
      [processChildren],
    );

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
                const textArea =
                  internalTextareaRef?.current as HTMLTextAreaElement;

                if (textArea) {
                  // Insert a new line at the cursor position
                  const { selectionStart, selectionEnd } = textArea;
                  const newValue =
                    messageBody?.substring(0, selectionStart) +
                    '\n' +
                    messageBody?.substring(selectionEnd);

                  // Update the textarea value
                  setReactTextAreaValue(textArea, newValue);
                  updateValue(newValue, internalTextareaRef);
                  const changeEvent = new Event('change', { bubbles: true });
                  internalTextareaRef.current?.dispatchEvent(changeEvent);

                  // Position cursor after the inserted newline
                  setTimeout(() => {
                    textArea.selectionStart = selectionStart + 1;
                    textArea.selectionEnd = selectionStart + 1;
                  });
                }
              }
            }
            break;
          }

          case 'Escape': {
            closeMenu();
            internalTextareaRef.current?.focus();
            break;
          }

          case 'ArrowDown': {
            if (withTypeAhead) {
              internalTextareaRef.current?.focus();
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
              internalTextareaRef.current?.focus();
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

      if (isSendButtonDisabled) {
        return;
      }

      if (onMessageSend && messageBody) {
        onMessageSend(messageBody, e);
        if (!isControlled) {
          setPrevMessageBody(messageBody);
          updateValue('', internalTextareaRef);
        }
      }

      onSubmit?.(e);
    };

    const handleStop = () => {
      if (onClickStopButton) {
        onClickStopButton();
      }
      restorePreviousMessage();
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

    /**
     * Helper function to restore the previous message body.
     * Used when stopping during loading or when an error occurs.
     */
    const restorePreviousMessage = useCallback(() => {
      if (!isControlled) {
        updateValue(prevMessageBody, internalTextareaRef);
        setPrevMessageBody('');
      }
      internalTextareaRef.current?.focus();
    }, [isControlled, prevMessageBody, updateValue]);

    useAutoScroll(highlightedElementRef, menuRef, 12);
    useBackdropClick(handleBackdropClick, [focusContainerRef, menuRef], {
      enabled: isOpen && withTypeAhead,
    });

    /**
     * When the state has changed to an 'error', we reset the cleared message to
     * the previous message and focus the textarea so the user can retry sending.
     */
    useEffect(() => {
      if (state === prevState || state !== State.Error) {
        return;
      }

      restorePreviousMessage();
    }, [state, prevState, restorePreviousMessage]);

    return (
      <LeafyGreenProvider darkMode={darkMode}>
        <form
          className={getFormStyles(className)}
          onSubmit={handleSubmit}
          ref={formRef}
          {...rest}
        >
          <InputBarFeedback errorMessage={errorMessage} state={state} />
          <div className={outerFocusContainerStyles}>
            <div
              className={getInnerFocusContainerStyles({
                disabled,
                isFocused,
              })}
              ref={focusContainerRef}
            >
              <div
                className={getContentWrapperStyles({
                  disabled,
                  isFocused,
                  theme,
                })}
              >
                <TextareaAutosize
                  disabled={disabled}
                  maxRows={14}
                  minRows={1}
                  placeholder={'Type your message here'}
                  value={messageBody}
                  {...(textareaProps ?? {})}
                  className={getTextAreaStyles({
                    className: textareaProps?.className,
                    theme,
                  })}
                  onKeyDown={handleKeyDown}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  ref={textareaRef}
                />
                <div className={actionContainerStyles}>
                  {isLoading ? (
                    <InputBarStopButton
                      disabled={isStopButtonDisabled}
                      onClick={handleStop}
                    />
                  ) : (
                    <InputBarSendButton disabled={isSendButtonDisabled} />
                  )}
                </div>
              </div>
            </div>
          </div>
          <DisclaimerText className={disclaimerTextStyles} />
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
