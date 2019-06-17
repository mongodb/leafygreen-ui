import React, { Fragment, useCallback, useState, useRef } from 'react';
import Portal from '@leafygreen-ui/portal';
import Icon, { Size } from '@leafygreen-ui/icon';
import { useEventListener } from '@leafygreen-ui/hooks';
import { css, cx } from '@leafygreen-ui/emotion';

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

const modalSize = {
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

export function Modal({
  active,
  usePortal,
  children,
  onRequestClose,
  size,
  title,
}) {
  const [isActive, setActiveState] = useState(active);
  const contentRef = useRef(null);

  const handleClose = e => {
    setActiveState(false);
    onRequestClose();
  };

  const handleEscape = useCallback((e: KeyboardEvent) => {
    if (e.keyCode === EscapeKey) {
      handleClose(e);
    }
  }, []);

  const handleDocumentClick = e => {
    if (!contentRef.current) {
      return;
    }

    if (!contentRef.current.contains(e.target)) {
      handleClose(e)
    }
  };

  useEventListener('keydown', handleEscape, {
    options: { once: true },
  });

  const Root = usePortal ? Portal : Fragment;

  return isActive ? (
    <Root>
      <div className={overlayStyle} onClick={handleDocumentClick}>
        <div
          className={cx(modalContentStyle, modalSize[size])}
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

