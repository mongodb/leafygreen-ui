import React, { MouseEventHandler, useContext, useEffect, useRef } from 'react';
import { Transition } from 'react-transition-group';
import PropTypes from 'prop-types';

import { css, cx } from '@leafygreen-ui/emotion';
import ChevronDownIcon from '@leafygreen-ui/icon/dist/ChevronDown';
import ChevronUpIcon from '@leafygreen-ui/icon/dist/ChevronUp';
import IconButton from '@leafygreen-ui/icon-button';
import {
  InferredPolymorphic,
  useInferredPolymorphicComponent,
} from '@leafygreen-ui/polymorphic';

import { MenuContext } from '../MenuContext';
import { MenuItem } from '../MenuItem';

import {
  getSubmenuListStyles,
  subMenuContainerClassName,
  subMenuTriggerClassName,
} from './SubMenu.styles';
import { SubMenuProps } from './SubMenu.types';
import { useChildrenHeight } from './useChildrenHeight';
import { useControlledState } from './useControlledState';

export const SubMenu = InferredPolymorphic<SubMenuProps, 'button'>(
  (
    {
      as: asProp,
      open: openProp,
      setOpen: setOpenProp,
      title,
      onClick,
      onEntered,
      onExited,
      className,
      children,
      ...rest
    },
    fwdRef,
  ): React.ReactElement => {
    const as = useInferredPolymorphicComponent(asProp, rest, 'button');

    // Note: descendants tracking is handled by the internal `MenuItem` component
    const { theme } = useContext(MenuContext);

    const [open, setOpen] = useControlledState(false, openProp, setOpenProp);
    useEffect(() => {
      setOpen(!!rest.active);
    }, [rest.active, setOpen]);

    const submenuRef = useRef<HTMLUListElement>(null);
    const submenuTriggerRef = useRef<HTMLButtonElement>(null);

    const ChevronIcon = open ? ChevronDownIcon : ChevronUpIcon;

    const handleClick: MouseEventHandler<HTMLElement> = e => {
      if (onClick || rest.href) {
        // @ts-expect-error
        onClick?.(e);
      } else {
        setOpen(x => !x);
      }
    };

    const handleChevronClick: MouseEventHandler<HTMLButtonElement> = e => {
      // Prevent links from navigating
      e.preventDefault();
      // we stop the event from propagating and closing the entire menu
      e.nativeEvent.stopImmediatePropagation();
      e.stopPropagation();

      setOpen(x => !x);
    };

    const subMenuHeight = useChildrenHeight(submenuRef, [open]);

    return (
      <>
        {/* @ts-expect-error */}
        <MenuItem
          as={as}
          ref={fwdRef}
          onClick={handleClick}
          {...rest}
          className={cx(subMenuContainerClassName, className)}
          // data-height={calcSubmenuHeight()}
          rightGlyph={
            <IconButton
              data-testid="lg-sub-menu-icon-button"
              ref={submenuTriggerRef}
              aria-label={open ? 'Close Sub-menu' : 'Open Sub-menu'}
              onClick={handleChevronClick}
              className={cx(subMenuTriggerClassName)}
            >
              <ChevronIcon
                role="presentation"
                // className={cx( chevronIconStyles)}
                size={14}
              />
            </IconButton>
          }
        >
          {title}
        </MenuItem>

        <Transition
          in={open}
          timeout={{
            enter: 0,
            exit: 150,
          }}
          mountOnEnter
          unmountOnExit
          onEntered={onEntered}
          onExited={onExited}
          nodeRef={submenuRef}
        >
          {(state: string) => (
            <ul
              ref={submenuRef}
              role="menu"
              aria-label={title}
              data-state={state}
              data-open={open}
              className={cx(
                getSubmenuListStyles({ theme, hasGlyph: !!rest.glyph }),
                {
                  [css`
                    max-height: ${subMenuHeight + 1}px;
                  `]: state === 'entered',
                },
              )}
            >
              {children}
            </ul>
          )}
        </Transition>
      </>
    );
  },
);

SubMenu.displayName = 'SubMenu';

SubMenu.propTypes = {
  title: PropTypes.string,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  children: PropTypes.node,
  setOpen: PropTypes.func,
  onKeyDown: PropTypes.func,
  className: PropTypes.string,
  onClick: PropTypes.func,
  glyph: PropTypes.element,
  onExited: PropTypes.func,
  open: PropTypes.bool,
  active: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default SubMenu;
