import React, {
  KeyboardEventHandler,
  MouseEventHandler,
  useContext,
  useEffect,
  useRef,
} from 'react';
import { Transition } from 'react-transition-group';
import PropTypes from 'prop-types';

import { css, cx } from '@leafygreen-ui/emotion';
import ChevronDownIcon from '@leafygreen-ui/icon/dist/ChevronDown';
import ChevronUpIcon from '@leafygreen-ui/icon/dist/ChevronUp';
import IconButton from '@leafygreen-ui/icon-button';
import { keyMap } from '@leafygreen-ui/lib';
import {
  InferredPolymorphic,
  useInferredPolymorphic,
} from '@leafygreen-ui/polymorphic';

import { MenuContext } from '../MenuContext';
import { MenuItem } from '../MenuItem';

import {
  getSubmenuListStyles,
  subMenuContainerClassName,
  subMenuTriggerClassName,
} from './SubMenu.styles';
import { InternalSubMenuProps } from './SubMenu.types';
import { useChildrenHeight } from './useChildrenHeight';
import { useControlledState } from './useControlledState';

export const SubMenu = InferredPolymorphic<InternalSubMenuProps, 'button'>(
  (
    {
      as: asProp,
      open: openProp,
      setOpen: setOpenProp,
      initialOpen = false,
      title,
      onClick,
      onEntered,
      onExited,
      className,
      children,
      ...restProps
    },
    fwdRef,
  ): React.ReactElement => {
    const { as, rest } = useInferredPolymorphic(asProp, restProps, 'button');

    // Note: descendants tracking is handled by the internal `MenuItem` component
    const { theme } = useContext(MenuContext);

    const [open, setOpen] = useControlledState(
      initialOpen,
      openProp,
      setOpenProp,
    );
    useEffect(() => {
      setOpen(!!rest.active);
    }, [rest.active, setOpen]);

    const submenuRef = useRef<HTMLUListElement>(null);
    const submenuTriggerRef = useRef<HTMLButtonElement>(null);
    const subMenuHeight = useChildrenHeight(submenuRef, [open]);

    const ChevronIcon = open ? ChevronDownIcon : ChevronUpIcon;

    const handleClick: MouseEventHandler = e => {
      if (onClick || rest.href) {
        onClick?.(e);
      } else {
        setOpen(x => !x);
      }
    };

    const handleKeydown: KeyboardEventHandler = e => {
      switch (e.key) {
        case keyMap.ArrowLeft: {
          setOpen(false);
          break;
        }

        case keyMap.ArrowRight: {
          setOpen(true);
          break;
        }
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

    return (
      <>
        <MenuItem
          as={as}
          ref={fwdRef}
          onClick={handleClick}
          onKeyDown={handleKeydown}
          {...rest}
          className={cx(subMenuContainerClassName, className)}
          rightGlyph={
            <IconButton
              data-testid="lg-sub-menu-icon-button"
              ref={submenuTriggerRef}
              aria-label={open ? 'Close Sub-menu' : 'Open Sub-menu'}
              onClick={handleChevronClick}
              className={cx(subMenuTriggerClassName)}
            >
              <ChevronIcon role="presentation" size={14} />
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
