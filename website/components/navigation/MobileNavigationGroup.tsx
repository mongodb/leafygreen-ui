import React, { useState, useRef } from 'react';
import { css, cx } from 'emotion';
import { Transition } from 'react-transition-group';
import ChevronRightIcon from '@leafygreen-ui/icon/dist/ChevronRight';
import { uiColors } from '@leafygreen-ui/palette';
import { spacing } from '@leafygreen-ui/tokens';
import { borderColor, leftRightPadding } from './styles';

const buttonResetStyles = css`
  background-color: transparent;
  border: none;
  padding: 0px;
  margin: 0px;

  &:focus {
    outline: none;
  }
`;

const groupButtonStyles = css`
  ${leftRightPadding}
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 68px;
  border-top: 1px solid ${borderColor}};
`;

const navItemStyle = css`
  font-size: 20px;
  line-height: 24px;
  color: ${uiColors.gray.dark3};
  margin: 0;
`;

const defaultStyle = css`
  transition: all 150ms ease-in-out;
  max-height: 0;
  overflow: hidden;
  opacity: 1;
`;

const transitionStyles = {
  entering: css`
    opacity: 0;
  `,
  exiting: css`
    opacity: 0;
  `,
  exited: css`
    opacity: 0;
  `,
};

const ulStyleOverrides = css`
  margin-block-start: 0px;
  margin-block-end: 0px;
  padding-inline-start: 0px;
  padding: 0;
  list-style-type: none;
`;

const ulStyles = css`
  ${ulStyleOverrides}
  display: flex;
  flex-wrap: wrap;
  border-top: 1px solid ${borderColor};
`;

function MobileNavigationGroup({ header, children, ...rest }) {
  const [open, setOpen] = useState(false);
  const nodeRef = useRef();
  const ulRef = useRef();

  return (
    <li
      className={css`
        list-style: none;
      `}
      {...rest}
    >
      <button
        className={cx(buttonResetStyles, groupButtonStyles)}
        onClick={() => setOpen(curr => !curr)}
      >
        <ChevronRightIcon
          size={20}
          className={css`
            margin-right: 12px;
          `}
        />
        <h4 className={navItemStyle}>{header}</h4>
      </button>
      <Transition
        in={open}
        appear
        timeout={150}
        nodeRef={nodeRef}
        mountOnEnter
        unmountOnExit
      >
        {(state: string) => (
          <div
            ref={nodeRef}
            className={cx(defaultStyle, {
              [transitionStyles.entering]: state === 'entering',
              [css`
                opacity: 1;
                max-height: ${ulRef?.current?.getBoundingClientRect().height}px;
              `]: state === 'entered',
              [transitionStyles.exiting]: state === 'exiting',
              [transitionStyles.exited]: state === 'exited',
            })}
          >
            <ul ref={ulRef} role="menu" className={ulStyles}>
              {children}
            </ul>
          </div>
        )}
      </Transition>
    </li>
  );
}

export default MobileNavigationGroup;
