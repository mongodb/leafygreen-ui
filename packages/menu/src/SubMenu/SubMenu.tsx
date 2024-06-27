import React, {
  KeyboardEventHandler,
  MouseEventHandler,
  useEffect,
  useRef,
} from 'react';
import { Transition } from 'react-transition-group';
import { EnterHandler, ExitHandler } from 'react-transition-group/Transition';
import isUndefined from 'lodash/isUndefined';
import PropTypes from 'prop-types';

import { useDescendant } from '@leafygreen-ui/descendants';
import { css, cx } from '@leafygreen-ui/emotion';
import ChevronDownIcon from '@leafygreen-ui/icon/dist/ChevronDown';
import ChevronUpIcon from '@leafygreen-ui/icon/dist/ChevronUp';
import IconButton from '@leafygreen-ui/icon-button';
import { keyMap } from '@leafygreen-ui/lib';
import {
  InferredPolymorphic,
  useInferredPolymorphic,
} from '@leafygreen-ui/polymorphic';

import { LGIDs } from '../constants';
import {
  MenuDescendantsContext,
  SubMenuProvider,
  useMenuContext,
  useSubMenuContext,
} from '../MenuContext';
import { InternalMenuItemContent } from '../MenuItem/InternalMenuItemContent';

import {
  getSubmenuListStyles,
  getSubmenuToggleStyles,
  subMenuContainerClassName,
  subMenuContainerStyles,
  subMenuToggleClassName,
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
    const { active, disabled } = rest;

    const { highlight, setHighlight, theme } = useMenuContext();
    const {
      index: descendantIndex,
      ref: descendantRef,
      id: descendantId,
    } = useDescendant(MenuDescendantsContext, fwdRef, {
      active,
      disabled,
    });
    const { depth } = useSubMenuContext();

    const [open, setOpen] = useControlledState(
      initialOpen,
      openProp,
      setOpenProp,
    );

    const toggleMenu = (state?: boolean) => {
      if (disabled) return;

      if (!isUndefined(state)) {
        setOpen(state);
      } else {
        setOpen(x => !x);
      }
    };

    // Regardless of the `open` state,
    // if `active` has been toggled true,
    // we open the menu
    useEffect(() => {
      if (rest.active) {
        setOpen(true);
      }
    }, [rest.active, setOpen]);

    const submenuRef = useRef<HTMLUListElement>(null);
    const submenuTriggerRef = useRef<HTMLButtonElement>(null);
    const subMenuHeight = useChildrenHeight(submenuRef, [open]);

    const ChevronIcon = open ? ChevronDownIcon : ChevronUpIcon;

    const handleClick: MouseEventHandler = e => {
      if (onClick || rest.href) {
        if (!disabled) {
          onClick?.(e);
        }
      } else {
        toggleMenu();
      }
    };

    const handleKeydown: KeyboardEventHandler = e => {
      switch (e.key) {
        case keyMap.ArrowLeft: {
          toggleMenu(false);
          break;
        }

        case keyMap.ArrowRight: {
          toggleMenu(true);
          break;
        }
      }
    };

    const handleToggleMouseDown: MouseEventHandler<HTMLButtonElement> = e => {
      // Prevent focus from moving to the toggle button when clicked
      e.preventDefault();
    };

    const handleToggleClick: MouseEventHandler<HTMLButtonElement> = e => {
      // Prevent links from navigating
      e.preventDefault();
      // we stop the event from propagating and closing the entire menu
      e.nativeEvent.stopImmediatePropagation();
      e.stopPropagation();

      toggleMenu();
    };

    // When the submenu has opened
    const handleTransitionEntered: EnterHandler<HTMLUListElement> = () => {
      // if this element should be highlighted
      if (descendantId === highlight?.id) {
        // ensure this element is still focused after transitioning
        descendantRef.current?.focus();
      } else {
        // Otherwise ensure the focus is on the correct element
        highlight?.ref?.current?.focus();
      }

      onEntered?.();
    };

    // When the submenu starts to close
    const handleTransitionExiting: ExitHandler<HTMLUListElement> = () => {
      const currentHighlightElement = highlight?.ref?.current;

      if (currentHighlightElement) {
        // When we close the submenu,
        // if one of this submenu's children is highlighted
        // then focus the main submenu item
        const doesSubmenuContainCurrentHighlight =
          submenuRef?.current?.contains(currentHighlightElement);

        if (doesSubmenuContainCurrentHighlight) {
          setHighlight?.(descendantId);
          descendantRef?.current?.focus();
        }
      }
    };

    // When the submenu has closed
    const handleTransitionExited: ExitHandler<HTMLUListElement> = () => {
      // When the submenu closes,
      // ensure the focus is on the correct element
      highlight?.ref?.current?.focus();
      onExited?.();
    };

    return (
      <>
        <li
          role="none"
          className={cx(subMenuContainerClassName, subMenuContainerStyles)}
          data-testid={LGIDs.submenu}
          data-lgid={LGIDs.submenu}
        >
          <InternalMenuItemContent
            as={as}
            id={descendantId}
            ref={descendantRef}
            index={descendantIndex}
            active={active}
            disabled={disabled}
            onClick={handleClick}
            onKeyDown={handleKeydown}
            data-id={descendantId}
            {...rest}
          >
            {title}
          </InternalMenuItemContent>
          <IconButton
            data-testid={LGIDs.submenuToggle}
            data-lgid={LGIDs.submenuToggle}
            ref={submenuTriggerRef}
            aria-label={open ? 'Close Sub-menu' : 'Open Sub-menu'}
            onClick={handleToggleClick}
            onMouseDownCapture={handleToggleMouseDown}
            className={cx(
              subMenuToggleClassName,
              getSubmenuToggleStyles(theme),
            )}
          >
            <ChevronIcon role="presentation" />
          </IconButton>
        </li>
        <SubMenuProvider depth={depth + 1} hasIcon={!!rest.glyph}>
          <Transition
            in={open}
            timeout={{
              enter: 0,
              exit: 150,
            }}
            mountOnEnter
            unmountOnExit
            onEntered={handleTransitionEntered}
            onExiting={handleTransitionExiting}
            onExited={handleTransitionExited}
            nodeRef={submenuRef}
          >
            {(state: string) => (
              <ul
                ref={submenuRef}
                role="menu"
                aria-label={title}
                data-state={state}
                data-open={open}
                className={cx(getSubmenuListStyles(), {
                  [css`
                    max-height: ${subMenuHeight + 1}px;
                  `]: state === 'entered',
                })}
              >
                {children}
              </ul>
            )}
          </Transition>
        </SubMenuProvider>
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
