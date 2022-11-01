import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import FocusTrap from 'focus-trap-react';
import { Transition } from 'react-transition-group';
import { transparentize } from 'polished';
import Portal from '@leafygreen-ui/portal';
import XIcon from '@leafygreen-ui/icon/dist/X';
import IconButton from '@leafygreen-ui/icon-button';
import { useEscapeKey, useIdAllocator } from '@leafygreen-ui/hooks';
import { palette, uiColors } from '@leafygreen-ui/palette';
import { css, cx } from '@leafygreen-ui/emotion';
import {
  PortalContextProvider,
  useDarkMode,
  usePopoverContext,
} from '@leafygreen-ui/leafygreen-provider';
import { CloseIconColor, ModalProps, ModalSize } from '././types';
import { createUniqueClassName } from '@leafygreen-ui/lib';
import { backdrop, visibleBackdrop, scrollContainer, modalContentStyle, modeStyles, modalSizes, visibleModalContentStyle, baseCloseButtonStyles, closeButton, modalThemeStyles } from './Modal.styles';

const closeClassName = createUniqueClassName(); // TODO: use IdAllocator

/**
 * @internal
 * Internal Modal View component
 */
function ModalView({
  open = false,
  size = ModalSize.Default,
  setOpen = () => {},
  shouldClose = () => true,
  darkMode: darkModeProp,
  children,
  className,
  contentClassName,
  initialFocus,
  closeIconColor = CloseIconColor.Default,
  ...rest
}: ModalProps) {
  const { theme, darkMode } = useDarkMode(darkModeProp);

  const nodeRef = React.useRef(null);

  const [scrollContainerRef, setScrollContainerRef] =
    useState<null | HTMLDivElement>(null);

  const { isPopoverOpen } = usePopoverContext();

  const handleClose = useCallback(() => {
    if (setOpen && shouldClose()) {
      setOpen(false);
    }
  }, [setOpen, shouldClose]);

  const id = useIdAllocator({ prefix: 'modal' });

  useEscapeKey(handleClose, { enabled: open && !isPopoverOpen });

  const focusTrapOptions = initialFocus
    ? {
        initialFocus: `#${id} ${initialFocus}`,
        fallbackFocus: `#${id} .${closeClassName}`,
      }
    : {
        fallbackFocus: `#${id} .${closeClassName}`, // tests fail without a fallback. (https://github.com/focus-trap/focus-trap-react/issues/91)
      };

  return (
    <Transition
      in={open}
      timeout={150}
      mountOnEnter
      unmountOnExit
      nodeRef={nodeRef}
    >
      {(state: string) => (
        <Portal>
          <div
            {...rest}
            id={id}
            ref={nodeRef}
            className={cx(className, backdrop, {
              [visibleBackdrop]: state === 'entered',
              // TODO: Refresh – remove darkmode logic for background color
              [css`
                background-color: ${transparentize(0.4, palette.black)};
              `]: !darkMode,
              [css`
                background-color: ${transparentize(0.4, uiColors.black)};
              `]: darkMode,
            })}
          >
            <FocusTrap focusTrapOptions={focusTrapOptions}>
              <div
                className={scrollContainer}
                ref={el => setScrollContainerRef(el)}
              >
                <div
                  aria-modal="true"
                  role="dialog"
                  tabIndex={-1}
                  className={cx(
                    modalContentStyle,
                    modalThemeStyles[theme],
                    modalSizes[size],
                    {
                      [visibleModalContentStyle]: state === 'entered',
                    },
                    contentClassName,
                  )}
                >
                  <PortalContextProvider
                    popover={{
                      portalContainer: scrollContainerRef,
                      scrollContainer: scrollContainerRef,
                    }}
                  >
                    {children}
                    <IconButton
                      onClick={handleClose}
                      aria-label="Close modal"
                      className={cx(
                        baseCloseButtonStyles,
                        closeButton[theme][closeIconColor],
                        closeButton[theme].position,
                        closeClassName,
                      )}
                      darkMode={darkMode}
                    >
                      <XIcon />
                    </IconButton>
                  </PortalContextProvider>
                </div>
              </div>
            </FocusTrap>
          </div>
        </Portal>
      )}
    </Transition>
  );
}

ModalView.displayName = 'ModalView';

ModalView.propTypes = {
  open: PropTypes.bool,
  size: PropTypes.string,
  children: PropTypes.node,
  shouldClose: PropTypes.func,
  className: PropTypes.string,
  setOpen: PropTypes.func,
};

export default ModalView;
