import React, { useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import { css, cx } from '@emotion/css';
import { Transition } from 'react-transition-group';
import { uiColors } from '@leafygreen-ui/palette';
import { spacing } from '@leafygreen-ui/tokens';
import IconButton from '@leafygreen-ui/icon-button';
import MenuIcon from '@leafygreen-ui/icon/dist/Menu';
import { MongoDBLogo } from '@leafygreen-ui/logo';
import { borderColor, leftRightPadding, ulStyleOverrides } from './styles';
import MobileNavigationProvider from './NavigationContext';
import { HOME_PAGE } from 'utils/routes';

const resetButtonStyle = css`
  background-color: white;
  width: 100%;
  border: unset;
`;

const closedContainer = css`
  display: flex;
  align-items: center;
`;

const iconMargin = css`
  margin-left: -${spacing[2]}px;
  margin-right: ${spacing[3]}px;
`;

const navStyle = css`
  border-right: 1px solid ${borderColor};
  background-color: white;
  cursor: pointer;
  z-index: 10;
  width: 80%;
  position: absolute;
  min-height: 100%;
  opacity: 0;
  transform: translate3d(-320px, 0, 0);
  transition: all 300ms ease-in-out;
`;

const backdrop = css`
  background-color: rgba(33, 49, 60, 0.95);
  overflow-y: auto;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
  z-index: 3;
  transition: opacity 300ms ease-in-out;
`;

const logoContainer = css`
  ${leftRightPadding}
  height: 124px;
  display: flex;
  align-items: center;
  flex-grow: 1;
`;

const navItemStyle = css`
  font-size: 20px;
  line-height: 24px;
  color: ${uiColors.gray.dark3};
  margin: 0;
`;

const h4Style = css`
  ${navItemStyle}
  ${leftRightPadding}
  display: flex;
  align-items: center;
  height: 68px;
  border-top: 1px solid ${borderColor};
  margin: 0;
`;

function MobileNavigation({ children }: { children: React.ReactNode }) {
  const [scrollContainerNode, setScrollContainerNode] =
    useState<HTMLElement | null>(null);
  const [open, setOpen] = useState(false);
  const { push } = useRouter();

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (!scrollContainerNode?.contains(e.target as Node)) {
        setOpen(false);
      }
    },
    [scrollContainerNode],
  );

  return (
    <MobileNavigationProvider open={open} setOpen={setOpen}>
      <div
        className={css`
          padding-top: ${spacing[5]}px;
        `}
      >
        <div className={closedContainer}>
          <IconButton
            aria-label="menu"
            onClick={() => setOpen(true)}
            className={iconMargin}
            size="large"
          >
            <MenuIcon size={20} />
          </IconButton>
          <a
            href="/"
            onClick={e => {
              e.preventDefault();
              push(HOME_PAGE);
            }}
          >
            <MongoDBLogo />
          </a>
        </div>

        <Transition in={open} timeout={300} mountOnEnter unmountOnExit>
          {(state: string) => (
            <div
              // Setting role to 'none', because elements with a click event should have a specific role
              // Here we are just using a div to handle backdrop clicks, so this is the most appropriate value
              role="none"
              onClick={handleBackdropClick}
              className={cx(backdrop, {
                [css`
                  opacity: 1;
                `]: state === 'entered',
              })}
            >
              <nav
                className={cx(navStyle, {
                  [css`
                    transform: translate3d(0, 0, 0);
                    opacity: 1;
                  `]: state === 'entered',
                })}
                ref={setScrollContainerNode}
              >
                <div className={logoContainer}>
                  <a
                    href="/"
                    onClick={e => {
                      e.preventDefault();
                      push(HOME_PAGE);
                      setOpen(false);
                    }}
                  >
                    <MongoDBLogo />
                  </a>
                </div>

                <ol className={ulStyleOverrides}>
                  <li>
                    <button
                      onClick={() => {
                        push(HOME_PAGE);
                        setOpen(false);
                      }}
                      className={resetButtonStyle}
                    >
                      <h4 className={h4Style}>Home</h4>
                    </button>
                  </li>
                  {children}
                </ol>
              </nav>
            </div>
          )}
        </Transition>
      </div>
    </MobileNavigationProvider>
  );
}

MobileNavigation.displayName = 'MobileNavigation';

export default MobileNavigation;
