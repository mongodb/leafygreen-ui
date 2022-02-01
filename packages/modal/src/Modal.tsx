import React, { SetStateAction, useCallback } from 'react';
import PropTypes from 'prop-types';
import FocusTrap from 'focus-trap-react';
import { Transition } from 'react-transition-group';
import { transparentize } from 'polished';
import facepaint from 'facepaint';
import Portal from '@leafygreen-ui/portal';
import XIcon from '@leafygreen-ui/icon/dist/X';
import IconButton from '@leafygreen-ui/icon-button';
import { useEscapeKey, useIdAllocator } from '@leafygreen-ui/hooks';
import { palette, uiColors } from '@leafygreen-ui/palette';
import { css, cx } from '@leafygreen-ui/emotion';

const Mode = {
  Dark: 'dark',
  Light: 'light',
};

type Mode = typeof Mode[keyof typeof Mode];

export const ModalSize = {
  Small: 'small',
  Default: 'default',
  Large: 'large',
} as const;

export type ModalSize = typeof ModalSize[keyof typeof ModalSize];

// breakpoints for different screen sizes
const small = '767px'; // mobile screens, from 0px - 767px
const medium = '768px'; // tablet screens, from 768px - 1024px
const large = '1025px'; // laptops/desktop screens, from 1025px and above

export const mq = facepaint([
  `@media only screen and (max-width: ${small})`,
  `@media only screen and (min-width: ${medium})`,
  `@media only screen and (min-width: ${large})`,
]);

const defaultHorizontalSpacing = 18;
const defaultVerticalSpacing = 64;

const backdrop = css`
  background-color: ${transparentize(0.4, uiColors.black)};
  overflow-y: auto;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
  transition: opacity 150ms ease-in-out;
`;

const visibleBackdrop = css`
  opacity: 1;
`;

const scrollContainer = css`
  position: absolute;
  min-height: 100%;
  width: 100%;
  padding: ${defaultVerticalSpacing}px ${defaultHorizontalSpacing}px;
  overflow-y: auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const modalContentStyle = css`
  transition: all 150ms ease-in-out;
  margin: auto;
  max-height: calc(100% - ${defaultVerticalSpacing}px);
  position: relative;
  pointer-events: all;
  transform: translate3d(0, -16px, 0);
  opacity: 0;

  &:focus {
    outline: none;
  }
`;

const modeStyles: Record<Mode, string> = {
  [Mode.Light]: css`
    font-family: Euclid Circular A, ‘Helvetica Neue’, Helvetica, Arial,
      sans-serif; // TODO: Refresh – remove when fonts are updated
    color: ${uiColors.gray.dark3};
    background-color: ${uiColors.white};
    border-radius: 24px; // TODO: refresh - remove when dark mode is updated
    padding: 35px 40px; // TODO: refresh - remove when dark mode is updated
    box-shadow: 0px 8px 20px -8px ${transparentize(0.4, palette.black)};
  `,
  [Mode.Dark]: css`
    font-family: Akzidenz, ‘Helvetica Neue’, Helvetica, Arial, sans-serif;
    color: ${uiColors.white};
    background-color: ${uiColors.gray.dark3};
    border-radius: 7px; // TODO: refresh - remove when dark mode is updated
    padding: 32px; // TODO: refresh - remove when dark mode is updated
    box-shadow: 0 5px 15px ${transparentize(0.4, uiColors.black)};
  `,
};

const visibleModalContentStyle = css`
  transform: translate3d(0, 0, 0);
  opacity: 1;
`;

const modalSizes: { readonly [K in ModalSize]: string } = {
  small: css`
    width: 400px;
  `,

  default: css`
    width: 600px;
  `,

  large: css`
    ${mq({
      width: ['720px', '720px', '960px'],
    })}
  `,
};

const closeButton = {
  [Mode.Light]: css`
    position: absolute;
    cursor: pointer;
    // x-icon should be 24px from edge. IconButton is 28x28 and Icon is 16x16
    // so there's already (28 - 16) / 2 = 6px of spacing. 24 - 6 = 18.
    right: 18px;
    top: 18px;

    &:focus {
      color: ${palette.gray.dark3};
      outline: 2px solid ${palette.blue.light1};
      border: 2px solid ${palette.white};
    }
  `,
  [Mode.Dark]: css`
    position: absolute;
    cursor: pointer;
    // x-icon should be 16px from edge. IconButton is 28x28 and Icon is 16x16
    // so there's already (28 - 16) / 2 = 6px of spacing. 16 - 6 = 10.
    right: 10px;
    top: 10px;
  `,
};

const buttonColors = {
  [Mode.Light]: css`
    color: ${uiColors.gray.dark1};

    &:hover {
      color: ${uiColors.gray.dark3};
    }
  `,
  [Mode.Dark]: css`
    color: ${uiColors.gray.base};

    &:hover {
      color: ${uiColors.gray.base};
    }
  `,
};

interface ModalProps {
  /**
   * Content that will appear inside of the Modal component.
   */
  children: React.ReactNode;

  /**
   * Determines the open state of the modal
   * @default: `false`
   */
  open?: boolean;

  /**
   * Specifies the size of the Modal.
   *
   * default: `default`
   */
  size?: ModalSize;

  /**
   * Callback to change the open state of the Modal.
   *
   */
  setOpen?: (open: boolean) => void | React.Dispatch<SetStateAction<boolean>>;

  /**
   * Callback to determine whether or not Modal should close when user tries to close it.
   *
   */
  shouldClose?: () => boolean;

  /**
   * className applied to root div.
   */
  className?: string;

  /**
   * className applied to overlay div.
   * Disclaimer: This prop may be deprecated in future versions of Modal
   */
  contentClassName?: string;

  /**
   * By default, when a focus trap is activated the first element in the focus trap's tab order will receive focus.
   * With this option you can specify a different element to receive that initial focus.
   * Selector string (which will be passed to document.querySelector() to find the DOM node)
   */
  initialFocus?: string;

  darkMode?: boolean;
}

/**
 * # Modal
 *
 *  Modals place content on top of main window.
 *
```
<Modal
  open
  size="large"
  setOpen={setOpen}
  shouldClose={() => console.log('Modal is closing now!')}
  >
  Modal content!
</Modal>
```
 * @param props.open Boolean to describe whether or not Modal is open.
 * @param props.size String to determine size of Modal. ['small', 'default', 'large']
 * @param props.setOpen Callback to change the open state of Modal.
 * @param props.children Content to appear inside of Modal container.
 * @param props.shouldClose Callback to determine whether or not Modal should close when user tries to close it.
 * @param props.className className applied to container div.
 * @param props.contentClassName className applied to overlay div.
 * @param props.closeOnBackdropClick Determines whether or not a Modal should close when a user clicks outside the modal.
 * @param props.initialFocus By default, when a focus trap is activated the first element in the focus trap's tab order will receive focus. With this option you can specify a different element to receive that initial focus. Selector string (which will be passed to document.querySelector() to find the DOM node).
 */
function Modal({
  open = false,
  size = ModalSize.Default,
  setOpen = () => {},
  shouldClose = () => true,
  darkMode = false,
  children,
  className,
  contentClassName,
  initialFocus,
  ...rest
}: ModalProps) {
  const mode = darkMode ? Mode.Dark : Mode.Light;

  const nodeRef = React.useRef(null);

  const handleClose = useCallback(() => {
    if (setOpen && shouldClose()) {
      setOpen(false);
    }
  }, [setOpen, shouldClose]);

  const id = useIdAllocator({ prefix: 'modal' });

  useEscapeKey(handleClose, { enabled: open });

  const focusTrapOptions = initialFocus
    ? {
        initialFocus: `#${id} ${initialFocus}`,
      }
    : {};

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
            })}
          >
            <FocusTrap focusTrapOptions={focusTrapOptions}>
              <div className={scrollContainer}>
                <div
                  aria-modal="true"
                  role="dialog"
                  tabIndex={-1}
                  className={cx(
                    modalContentStyle,
                    modeStyles[mode],
                    modalSizes[size],
                    {
                      [visibleModalContentStyle]: state === 'entered',
                    },
                    contentClassName,
                  )}
                >
                  {children}
                  <IconButton
                    onClick={handleClose}
                    aria-label="Close modal"
                    className={cx(closeButton[mode], buttonColors[mode])}
                    darkMode={darkMode}
                  >
                    <XIcon />
                  </IconButton>
                </div>
              </div>
            </FocusTrap>
          </div>
        </Portal>
      )}
    </Transition>
  );
}

Modal.displayName = 'Modal';

Modal.propTypes = {
  open: PropTypes.bool,
  size: PropTypes.string,
  children: PropTypes.node,
  shouldClose: PropTypes.func,
  className: PropTypes.string,
  setOpen: PropTypes.func,
};

export default Modal;
