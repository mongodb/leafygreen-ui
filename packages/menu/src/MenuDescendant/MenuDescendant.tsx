import React, { PropsWithChildren, ReactElement } from 'react';
import PropTypes from 'prop-types';

import { useDescendant } from '@leafygreen-ui/descendants';
import { css } from '@leafygreen-ui/emotion';
import { InputOption } from '@leafygreen-ui/input-option';

import { MenuDescendantsContext, useMenuContext } from '../MenuContext';
import { menuColor } from '../styles';

export const MenuDescendant = React.forwardRef<
  HTMLElement,
  PropsWithChildren<{}>
>(({ children }, fwdRef) => {
  const { theme } = useMenuContext();
  const { ref, id } = useDescendant(MenuDescendantsContext, fwdRef, {});
  const child = React.Children.only(children) as ReactElement;

  return child ? (
    <InputOption
      id={id}
      as="div"
      isInteractive={false}
      className={css`
        cursor: unset;
        background-color: ${menuColor[theme].background.default};
      `}
    >
      {React.cloneElement(child, {
        ref,
      })}
    </InputOption>
  ) : null;
});

MenuDescendant.displayName = 'MenuDescendant';
MenuDescendant.propTypes = {
  children: PropTypes.node,
};
