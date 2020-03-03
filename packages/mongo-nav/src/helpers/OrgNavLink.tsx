import React from 'react';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import { useUsingKeyboardContext } from '@leafygreen-ui/leafygreen-provider';
import { textLoadingStyle } from '../styles';

const linkText = css`
  text-decoration: none;
  color: ${uiColors.gray.dark3};
  padding: 4px;

  span {
    position: relative;

    &:after {
      content: '';
      position: absolute;
      top: calc(100% + 4px);
      left: 0;
      right: 0;
      opacity: 0;
      transform: scale(0.8, 1);
      transition: 150ms ease-in-out;
      height: 3px;
      border-radius: 50px;
    }
  }

  &:hover {
    span:after {
      opacity: 1;
      transform: scale(1);
      background-color: ${uiColors.gray.light2};
    }
  }
`;

const activeLink = css`
  font-weight: bold;
  color: ${uiColors.green.base};

  &:hover {
    span:after {
      background-color: ${uiColors.green.light2};
    }
  }
`;

const navItemFocusStyle = css`
  &:focus {
    outline: none;
    color: ${uiColors.blue.base};

    span:after {
      background-color: #9dd0e7;
      opacity: 1;
      transform: scale(1);
    }
  }
`;

interface OrgNavLinkProps {
  isActive?: boolean;
  href?: string;
  children?: React.ReactNode;
  className?: string;
  loading?: boolean;
}

function OrgNavLink({
  isActive = false,
  loading = false,
  href,
  children,
  className,
  ...rest
}: OrgNavLinkProps) {
  const { usingKeyboard: showFocus } = useUsingKeyboardContext();

  return (
    <a
      href={href}
      aria-disabled={loading}
      className={cx(
        linkText,
        {
          [activeLink]: isActive,
          [navItemFocusStyle]: showFocus,
          [textLoadingStyle]: loading,
        },
        className,
      )}
      {...rest}
    >
      <span
        className={cx(
          css`
            position: relative;
          `,
        )}
      >
        {children}
      </span>
    </a>
  );
}

export default OrgNavLink;
