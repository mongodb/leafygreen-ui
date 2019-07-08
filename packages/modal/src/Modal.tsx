import React, { useCallback, SetStateAction, useRef } from 'react';
import PropTypes from 'prop-types';
import Portal from '@leafygreen-ui/portal';
import { injectGlobal } from '@leafygreen-ui/emotion';
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

const mainContainer = css`
  animation: fade-in 250ms ease-in-out;
  -webkit-animation: fade-in 250ms ease-in-out;
  background-color: ${uiColors.black};
  opacity: 0.6;
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
  bottom: 0;
  left: 0;
  overflow-y: auto;
  display: flex;
  justify-content: center;
`;

const modalContentStyle = css`
  margin: ${defaultSpacing}px auto;
  padding: 30px;
  color: ${uiColors.gray.dark3};
  background-color: ${uiColors.white};
  border: 1px solid ${uiColors.gray.light3};
  border-radius: 3px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  pointer-events: all;
  height: 200vh;
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
  position: aboslute;
  float: right;
  cursor: pointer;
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
 * @param props.size String to determine size of Modal. ['xxsmall', 'xsmall', 'small', 'default', 'large', 'xlarge']
 * @param props.setActive Callback to change the active state of Modal.
 * @param props.children Content to appear inside of Modal container.
 * @param props.shouldClose Callback to determine whether or not Modal should close when user tries to close it.
 * @param props.className className applied to overlay div.
 *
 */
function Modal({
  active = false,
  size = ModalSize.Default,
  setActive,
  children,
  shouldClose,
  className,
  ...rest
}: ModalProps) {
  if (!active) {
    return null;
  }

  const contentRef = useRef<HTMLDivElement>(null);

  const handleClose = useCallback(() => {
    // Don't close modal if shouldClose returns false or no setActive callback is passed
    if (!setActive || (shouldClose && !shouldClose())) {
      return;
    }

    setActive(false);
  }, [setActive]);

  const handleDocumentClick = (e: React.SyntheticEvent) => {
    if (!contentRef.current) {
      return;
    }

    if (!contentRef.current.contains(e.target as Node)) {
      handleClose();
    }
  };

  const handleEscape = useCallback((e: KeyboardEvent) => {
    if (e.keyCode === escapeKey) {
      handleClose();
    }
  }, [handleClose]);

  useEventListener('keydown', handleEscape, {
    options: { once: true },
  });

  injectGlobal(`
    html, body {
      overflow: hidden;
    }

    body {
      position: relative;
    }
  `);

  return (
    <Portal>
      <div {...rest} onClick={handleDocumentClick} className={mainContainer}>
        <div className={scrollContainer}>
          <div
            className={cx(modalContentStyle, modalSizes[size], className)}
            tabIndex={-1}
            ref={contentRef}
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
};

export default Modal;
