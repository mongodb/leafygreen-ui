import React, { useCallback, useState } from 'react';
import { Transition, TransitionStatus } from 'react-transition-group';
import { Options } from 'focus-trap';
import FocusTrap from 'focus-trap-react';

import { cx } from '@leafygreen-ui/emotion';
import { useEscapeKey, useIdAllocator } from '@leafygreen-ui/hooks';
import XIcon from '@leafygreen-ui/icon/dist/X';
import IconButton from '@leafygreen-ui/icon-button';
import LeafyGreenProvider, {
  PortalContextProvider,
  useDarkMode,
  usePopoverContext,
} from '@leafygreen-ui/leafygreen-provider';
import Portal from '@leafygreen-ui/portal';

import { getLgIds } from '../utils';

import {
  backdropBaseStyle,
  backdropThemeStyles,
  baseCloseButtonStyles,
  closeButton,
  modalContentStyle,
  modalSizes,
  modalThemeStyles,
  scrollContainer,
  visibleBackdrop,
  visibleModalContentStyle,
} from './Modal.styles';
import {
  CloseIconColor,
  ForwardedRef,
  ModalProps,
  ModalSize,
} from './Modal.types';

/**
 * @internal
 * Internal Modal View component
 */
const ModalView = React.forwardRef(
  (
    {
      open = false,
      size: sizeProp = ModalSize.Default,
      setOpen = () => {},
      shouldClose = () => true,
      closeIconColor = CloseIconColor.Default,
      darkMode: darkModeProp,
      id: idProp,
      children,
      className,
      contentClassName,
      initialFocus,
      'data-lgid': dataLgId,
      ...rest
    }: ModalProps,
    forwardedRef: ForwardedRef,
  ) => {
    const { theme, darkMode } = useDarkMode(darkModeProp);

    const nodeRef = React.useRef<HTMLDivElement | null>(null);
    const ref = forwardedRef ?? nodeRef;

    const [scrollContainerRef, setScrollContainerRef] =
      useState<null | HTMLDivElement>(null);

    const { isPopoverOpen } = usePopoverContext();

    const handleClose = useCallback(() => {
      if (setOpen && shouldClose()) {
        setOpen(false);
      }
    }, [setOpen, shouldClose]);

    const id = useIdAllocator({ prefix: 'modal', id: idProp });
    const closeId = useIdAllocator({ prefix: 'modal' });
    const lgIds = getLgIds(dataLgId);

    useEscapeKey(handleClose, { enabled: open && !isPopoverOpen });

    const focusTrapOptions: Options = initialFocus
      ? {
          initialFocus: `#${id} ${initialFocus}`,
          fallbackFocus: `#${closeId}`,
          escapeDeactivates: false,
        }
      : {
          fallbackFocus: `#${closeId}`, // tests fail without a fallback. (https://github.com/focus-trap/focus-trap-react/issues/91)
          escapeDeactivates: false,
        };

    const allowedSize = Object.values(ModalSize).includes(sizeProp);
    const size = allowedSize ? sizeProp : ModalSize.Default;

    return (
      <Transition
        in={open}
        timeout={150}
        mountOnEnter
        unmountOnExit
        nodeRef={nodeRef}
      >
        {(state: TransitionStatus) => (
          <Portal>
            <div
              data-testid={lgIds.root}
              data-lgid={lgIds.root}
              {...rest}
              id={id}
              ref={ref}
              className={cx(
                className,
                backdropBaseStyle,
                backdropThemeStyles[theme],
                {
                  [visibleBackdrop]: state === 'entered',
                },
              )}
            >
              <LeafyGreenProvider darkMode={darkMode}>
                <FocusTrap
                  active={state === 'entered'}
                  focusTrapOptions={focusTrapOptions}
                >
                  <div
                    className={scrollContainer}
                    ref={el => setScrollContainerRef(el)}
                  >
                    <div
                      data-testid={lgIds.modal}
                      data-lgid={lgIds.modal}
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
                          id={closeId}
                          data-testid={lgIds.close}
                          data-lgid={lgIds.close}
                          onClick={handleClose}
                          aria-label="Close modal"
                          className={cx(
                            baseCloseButtonStyles,
                            closeButton[theme][closeIconColor],
                          )}
                        >
                          <XIcon />
                        </IconButton>
                      </PortalContextProvider>
                    </div>
                  </div>
                </FocusTrap>
              </LeafyGreenProvider>
            </div>
          </Portal>
        )}
      </Transition>
    );
  },
);

ModalView.displayName = 'ModalView';
export default ModalView;
