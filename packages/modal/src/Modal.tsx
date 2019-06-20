import React, { Fragment, useCallback, useRef, SetStateAction } from 'react';
import PropTypes from 'prop-types';
import Portal from '@leafygreen-ui/portal';
import Icon, { Size } from '@leafygreen-ui/icon';
import { useEventListener } from '@leafygreen-ui/hooks';
import { css, cx } from '@leafygreen-ui/emotion';

export const ModalSize = {
  XXSmall: 'xxsmall',
  XSmall: 'xsmall',
  Small: 'small',
  Normal: 'normal',
  Large: 'large',
  XLarge: 'xlarge',
} as const;

export type ModalSize = typeof ModalSize[keyof typeof ModalSize];

const overlayStyle = css`
  animation: fade-in 500ms cubic-bezier(0.165, 0.84, 0.44, 1);
  -webkit-animation: fade-in 500ms cubic-bezier(0.165, 0.84, 0.44, 1);
  background-color: #000;
  opacity: 0.5;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const modalContentStyle = css`
  margin: 18px 40px;
  max-width: 1270px;
  min-width: 944px;
  padding: 30px;
  align-self: flex-start;
  text-align: left;
  color: black;
  position: relative;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 3px;
  outline: 0;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
`;

const modalBodyStyle = css`
  padding: 18px 0;
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

  normal: css`
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
  font-weight: 200;
  color: #464c4f;
  position: relative;
  float: right;
  top: -18px;
  right: -10px;
  margin-top: -2px;
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
   * Specifies that the Modal content will appear portaled to the end of the DOM,
   * rather than in the React DOM tree.
   *
   * default: `true`
   */
  usePortal?: boolean;

  /**
   * Specifies the size of the Modal.
   *
   * default: `normal`
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
   * Callback invoked when Modal closes.
   *
   */
  onRequestClose?: () => void;

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
  usePortal
  size="large"
  setActive={setActive}
  title="My Modal"
  onRequestClose={() => console.log('Modal is closing now!')}
  >  
  Modal content!
</Modal>
```
 * @param props.active Boolean to describe whether or not Modal is active.
 * @param props.usePortal Boolean to describe if content should be portaled to end of DOM, or appear in React DOM tree.
 * @param props.size String to determine size of Modal. ['xxsmall', 'xsmall', 'small', 'normal', 'large', 'xlarge']
 * @param props.setActive Callback to change the active state of Modal.
 * @param props.children Content to appear inside of Modal container.
 * @param props.title Title for the Modal, will appear inside header tags.
 * @param props.onRequestClose Callback invoked when Modal is closed.
 * @param props.className className applied to overlay div.
 *
 */
function Modal({
  active = false,
  usePortal = true,
  size = ModalSize.Normal,
  setActive,
  children,
  title,
  onRequestClose,
  className,
  ...rest
}: ModalProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  const handleClose = () => {
    if (onRequestClose) {
      onRequestClose();
    }

    if (setActive) {
      setActive(false);
    }
  };

  const handleEscape = useCallback((e: KeyboardEvent) => {
    if (e.keyCode === EscapeKey) {
      handleClose();
    }
  }, []);

  const handleDocumentClick = (e: React.SyntheticEvent) => {
    if (!contentRef.current) {
      return;
    }

    if (!contentRef.current.contains(e.target as Node)) {
      handleClose();
    }
  };

  useEventListener('keydown', handleEscape, {
    options: { once: true },
  });

  const Root = usePortal ? Portal : Fragment;

  return active ? (
    <Root>
      <div {...rest} className={overlayStyle} onClick={handleDocumentClick}>
        <div
          className={cx(modalContentStyle, modalSizes[size], className)}
          tabIndex={-1}
          ref={contentRef}
        >
          <Icon
            glyph="X"
            fill={'#000'}
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
      </div>
    </Root>
  ) : null;
}

Modal.displayName = 'Modal';

Modal.propTypes = {
  active: PropTypes.bool,
  usePortal: PropTypes.bool,
  size: PropTypes.string,
  children: PropTypes.node,
  onRequestClose: PropTypes.func,
  title: PropTypes.string,
  className: PropTypes.string,
};

export default Modal;
