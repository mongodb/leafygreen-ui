import React, { useState, useRef } from 'react';
import { css, cx } from 'emotion';
import { Transition } from 'react-transition-group';
import ChevronRightIcon from '@leafygreen-ui/icon/dist/ChevronRight';
import { uiColors } from '@leafygreen-ui/palette';
import { borderColor, leftRightPadding, ulStyleOverrides } from './styles';

const buttonResetStyles = css`
  background-color: transparent;
  border: none;
  padding: 0;
  margin: 0;

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

const openIconStyle = css`
  transform: rotate(90deg);
  transition: 150ms all ease-in-out;
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

type States = 'entering' | 'entered' | 'exiting' | 'exited';

const transitionStyles: Partial<Record<States, string>> = {
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

const ulStyles = css`
  ${ulStyleOverrides}
  display: flex;
  flex-wrap: wrap;
  border-top: 1px solid ${borderColor};
`;

type MobileNavigationGroupProps = JSX.IntrinsicElements['li'] & {
  header: string;
  children: React.ReactNode;
  initialCollapsed?: boolean;
};

function MobileNavigationGroup({
  header,
  children,
  className,
  initialCollapsed = true,
  ...rest
}: MobileNavigationGroupProps) {
  const [open, setOpen] = useState(!initialCollapsed);
  const nodeRef = useRef(null);
  const ulRef = useRef<HTMLUListElement>(null);

  return (
    <li
      className={cx(
        css`
          list-style: none;
        `,
        className,
      )}
      {...rest}
    >
      <button
        className={cx(buttonResetStyles, groupButtonStyles)}
        onClick={() => {
          setOpen(curr => !curr);
        }}
      >
        <ChevronRightIcon
          size={20}
          className={cx(
            css`
              margin-right: 12px;
            `,
            { [openIconStyle]: open },
          )}
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
        {(state: States) => (
          <div
            ref={nodeRef}
            className={cx(defaultStyle, transitionStyles[state], {
              [css`
                opacity: 1;
                max-height: ${ulRef?.current?.getBoundingClientRect().height}px;
              `]: state === 'entered',
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

MobileNavigationGroup.displayName = 'MobileNavigationGroup';

export default MobileNavigationGroup;
