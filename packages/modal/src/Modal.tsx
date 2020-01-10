import React, { useCallback, SetStateAction, useRef } from 'react';
import PropTypes from 'prop-types';
import { Transition } from 'react-transition-group';
import { transparentize } from 'polished';
import facepaint from 'facepaint';
import Portal from '@leafygreen-ui/portal';
import Icon, { Size } from '@leafygreen-ui/icon';
import { useEscapeKey } from '@leafygreen-ui/hooks';
import { uiColors } from '@leafygreen-ui/palette';
import { css, cx } from '@leafygreen-ui/emotion';

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

const defaultSpacing = 18;

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
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  overflow-y: auto;
`;

const modalContentStyle = css`
  transition: all 150ms ease-in-out;
  margin: ${defaultSpacing}px auto;
  padding: 36px;
  color: ${uiColors.gray.dark3};
  background-color: ${uiColors.white};
  border-radius: 3px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  position: relative;
  pointer-events: all;
  transform: translate3d(0, -16px, 0);
  opacity: 0;
`;

const visibleModalContentStyle = css`
  transform: translate3d(0, 0, 0);
  opacity: 1;
`;

const modalSizes: { readonly [K in ModalSize]: string } = {
  small: css`
    width: 400px;
  `,

  default: css`
    width: 720px;
  `,

  large: css`
    ${mq({
      width: ['720px', '720px', '960px'],
    })}
  `,
};

const closeButton = css`
  color: ${uiColors.gray.dark1};
  position: absolute;
  cursor: pointer;
  right: 12px;
  top: 12px;
`;

interface ModalProps {
  /**
   * Content that will appear inside of the Modal component.
   */
  children: React.ReactNode;

  /**
   * Determines the open state of the modal
   *
   * default: `false`
   */
  open: boolean;

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
 *
 *
 */
function Modal({
  open = false,
  size = ModalSize.Default,
  setOpen = () => {},
  shouldClose = () => true,
  children,
  className,
  contentClassName,
  ...rest
}: ModalProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleClose = useCallback(() => {
    if (setOpen && shouldClose()) {
      setOpen(false);
    }
  }, [setOpen, shouldClose]);

  const handleBackdropClick = (e: React.SyntheticEvent) => {
    if (scrollContainerRef.current && e.target === scrollContainerRef.current) {
      handleClose();
    }
  };

  useEscapeKey(handleClose);

  return (
    <Transition in={open} timeout={500} mountOnEnter unmountOnExit>
      {(state: string) => (
        <Portal>
          <div
            {...rest}
            // Setting role to 'none', because elements with a click event should have a specific role
            // Here we are just using a div to handle backdrop clicks, so this is the most appropriate value
            role="none"
            onClick={handleBackdropClick}
            className={cx(className, backdrop, {
              [visibleBackdrop]: state === 'entered',
            })}
          >
            <div className={scrollContainer} ref={scrollContainerRef}>
              <div
                aria-modal="true"
                role="dialog"
                tabIndex={-1}
                className={cx(
                  modalContentStyle,
                  modalSizes[size],
                  {
                    [visibleModalContentStyle]: state === 'entered',
                  },
                  contentClassName,
                )}
              >
                <Icon
                  glyph="X"
                  fill={uiColors.gray.dark1}
                  size={Size.Large}
                  onClick={handleClose}
                  className={closeButton}
                  data-dismiss="modal"
                  tabIndex={0}
                  title="close modal"
                />

                {children}
              </div>
            </div>
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
