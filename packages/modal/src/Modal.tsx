import React, { useCallback, SetStateAction, useRef } from 'react';
import PropTypes from 'prop-types';
import { transparentize } from 'polished';
import facepaint from 'facepaint';
import Portal from '@leafygreen-ui/portal';
import Icon, { Size } from '@leafygreen-ui/icon';
import { useEventListener } from '@leafygreen-ui/hooks';
import { uiColors } from '@leafygreen-ui/palette';
import { css, cx, keyframes } from '@leafygreen-ui/emotion';

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

const fadein = keyframes`
  from {
    opacity: 0;
    transform: translate3d(0, 50px, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0px, 0);
  }
`;

const backdrop = css`
  background-color: ${transparentize(0.4, uiColors.black)};
  overflow-y: auto;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const scrollContainer = css`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  overflow-y: auto;
  animation: ${fadein} 150ms ease-in-out;
`;

const modalContentStyle = css`
  transition: all 200ms ease-in-out;
  margin: ${defaultSpacing}px auto;
  padding: 36px;
  color: ${uiColors.gray.dark3};
  background-color: ${uiColors.white};
  border-radius: 3px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  position: relative;
  pointer-events: all;
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

  &:hover {
    transition: color 100ms ${uiColors.gray.dark2};
  }
`;

const escapeKey = 27;

interface ModalProps {
  /**
   * Content that will appear inside of the Modal component.
   */
  children: React.ReactNode;

  /**
   * Determines the active state of the modal
   *
   * default: `false`
   */
  active: boolean;

  /**
   * Specifies the size of the Modal.
   *
   * default: `default`
   */
  size?: ModalSize;

  /**
   * Callback to change the active state of the Modal.
   *
   */
  setActive?: (
    active: boolean,
  ) => void | React.Dispatch<SetStateAction<boolean>>;

  /**
   * Callback to determine whether or not Modal should close when user tries to close it.
   *
   */
  shouldClose?: () => boolean;

  /**
   * className applied to root overlay div.
   *
   */
  className?: string;
}

/**
 * # Modal
 *
 *  Modals place content on top of main window.
 *
```
<Modal
  active
  size="large"
  setActive={setActive}
  shouldClose={() => console.log('Modal is closing now!')}
  >
  Modal content!
</Modal>
```
 * @param props.active Boolean to describe whether or not Modal is active.
 * @param props.size String to determine size of Modal. ['small', 'default', 'large']
 * @param props.setActive Callback to change the active state of Modal.
 * @param props.children Content to appear inside of Modal container.
 * @param props.shouldClose Callback to determine whether or not Modal should close when user tries to close it.
 * @param props.className className applied to overlay div.
 *
 */
function Modal({
  active = false,
  size = ModalSize.Default,
  setActive = () => {},
  shouldClose = () => true,
  children,
  className,
  ...rest
}: ModalProps) {
  if (!active) {
    return null;
  }

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleClose = useCallback(() => {
    // Don't close modal if shouldClose returns false or no setActive callback is passed
    if (!setActive || !shouldClose()) {
      return;
    }

    setActive(false);
  }, [setActive, shouldClose]);

  const handleBackdropClick = (e: React.SyntheticEvent) => {
    if (!scrollContainerRef.current) {
      return;
    }

    if (e.target === scrollContainerRef.current) {
      handleClose();
    }
  };

  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.keyCode === escapeKey) {
        handleClose();
      }
    },
    [handleClose],
  );

  useEventListener('keydown', handleEscape);

  return (
    <Portal>
      <div {...rest} onClick={handleBackdropClick} className={backdrop}>
        <div className={scrollContainer} ref={scrollContainerRef}>
          <div
            className={cx(modalContentStyle, modalSizes[size], className)}
            tabIndex={-1}
          >
            <Icon
              glyph="X"
              fill={uiColors.gray.dark1}
              size={Size.Large}
              onClick={handleClose}
              className={closeButton}
              data-dismiss="modal"
              aria-hidden="true"
            />

            {children}
          </div>
        </div>
      </div>
    </Portal>
  );
}

Modal.displayName = 'Modal';

Modal.propTypes = {
  active: PropTypes.bool,
  size: PropTypes.string,
  children: PropTypes.node,
  shouldClose: PropTypes.func,
  className: PropTypes.string,
  setActive: PropTypes.func,
};

export default Modal;
