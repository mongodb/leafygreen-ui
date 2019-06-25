import React, { useCallback, SetStateAction } from 'react';
import PropTypes from 'prop-types';
import Portal from '@leafygreen-ui/portal';
import Icon, { Size } from '@leafygreen-ui/icon';
import { useEventListener } from '@leafygreen-ui/hooks';
import { uiColors } from '@leafygreen-ui/palette';
import { css, cx } from '@leafygreen-ui/emotion';

export const ModalSize = {
  XXSmall: 'xxsmall',
  XSmall: 'xsmall',
  Small: 'small',
  Default: 'default',
  Large: 'large',
  XLarge: 'xlarge',
} as const;

export type ModalSize = typeof ModalSize[keyof typeof ModalSize];

const defaultSpacing = 18;

const overlayStyle = css`
  animation: fade-in 500ms cubic-bezier(0.165, 0.84, 0.44, 1);
  -webkit-animation: fade-in 500ms cubic-bezier(0.165, 0.84, 0.44, 1);
  background-color: ${uiColors.black};
  opacity: 0.6;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

const modalContentStyle = css`
  margin: ${defaultSpacing}px auto;
  max-width: 1270px;
  min-width: 944px;
  padding: 30px;
  color: ${uiColors.gray.dark3};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: ${uiColors.white};
  border: 1px solid ${uiColors.gray.light3};
  border-radius: 3px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  overflow: scroll;
`;

const modalBodyStyle = css`
  padding: ${defaultSpacing}px 0;
`;

const modalSizes: { readonly [K in ModalSize]: string } = {
  xxsmall: css`
    min-width: inherit;
    max-width: inherit;
    width: 366px;
  `,

  xsmall: css`
    min-width: inherit;
    max-width: inherit;
    width: 418px;
  `,

  small: css`
    min-width: inherit;
    max-width: inherit;
    width: 562px;
  `,

  default: css`
    min-width: inherit;
    max-width: inherit;
    width: 700px;
  `,

  large: css`
    min-width: inherit;
    max-width: inherit;
    width: 800px;
  `,

  xlarge: css`
    min-width: inherit;
    max-width: inherit;
    width: 1270px;
  `,
};

const closeButton = css`
  color: ${uiColors.gray.dark1};
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;
`;

const titleStyle = css`
  margin: 0;
`;

const EscapeKey = 27;

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
   * Specifies the title of the Modal.
   *
   */
  title?: string;

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
  modalShouldClose?: () => boolean;

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
  title="My Modal"
  modalShouldClose={() => console.log('Modal is closing now!')}
  >  
  Modal content!
</Modal>
```
 * @param props.active Boolean to describe whether or not Modal is active.
 * @param props.size String to determine size of Modal. ['xxsmall', 'xsmall', 'small', 'default', 'large', 'xlarge']
 * @param props.setActive Callback to change the active state of Modal.
 * @param props.children Content to appear inside of Modal container.
 * @param props.title Title for the Modal, will appear inside header tags.
 * @param props.modalShouldClose Callback to determine whether or not Modal should close when user tries to close it.
 * @param props.className className applied to overlay div.
 *
 */
function Modal({
  active = false,
  size = ModalSize.Default,
  setActive,
  children,
  title,
  modalShouldClose,
  className,
  ...rest
}: ModalProps) {
  if (!active) {
    return null;
  }

  const handleClose = () => {
    // Don't close modal if modalShouldClose returns false or no setActive callback is passed
    if (!setActive || (modalShouldClose && !modalShouldClose())) {
      return;
    }

    setActive(false);
  };

  const handleEscape = useCallback((e: KeyboardEvent) => {
    if (e.keyCode === EscapeKey) {
      handleClose();
    }
  }, []);

  useEventListener('keydown', handleEscape, {
    options: { once: true },
  });

  return (
    <Portal>
      <div {...rest} className={overlayStyle} onClick={handleClose}></div>
      <div
        className={cx(modalContentStyle, modalSizes[size], className)}
        tabIndex={-1}
      >
        <Icon
          glyph="X"
          fill={'#5D6C74'}
          size={Size.Large}
          onClick={handleClose}
          className={closeButton}
          data-dismiss="modal"
          aria-hidden="true"
        />

        {title && (
          <header>
            <h3 className={titleStyle}>{title}</h3>
            <hr />
          </header>
        )}

        <div className={modalBodyStyle}>{children}</div>
      </div>
    </Portal>
  );
}

Modal.displayName = 'Modal';

Modal.propTypes = {
  active: PropTypes.bool,
  size: PropTypes.string,
  children: PropTypes.node,
  modalShouldClose: PropTypes.func,
  title: PropTypes.string,
  className: PropTypes.string,
};

export default Modal;
