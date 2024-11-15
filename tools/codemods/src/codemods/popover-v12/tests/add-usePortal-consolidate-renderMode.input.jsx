import React from 'react';

import { Combobox as LGCombobox } from '@leafygreen-ui/combobox';
import { Menu } from '@leafygreen-ui/menu';
import Popover from '@leafygreen-ui/popover';
import { Select } from '@leafygreen-ui/select';
import { SplitButton } from '@leafygreen-ui/split-button';
import LeafyGreenTooltip from '@leafygreen-ui/tooltip';

const Combobox = ({ children, ...props }) => {
  return <div {...props}>{children}</div>;
};

const Child = (props) => {
  return <div>{props.children}</div>;
};

export const App = () => {
  const spreadProps = {
    prop: true,
  };

  const WrappedPopover = () => {
    return <Popover usePortal={false} {...spreadProps} />;
  };

  const DefaultWrappedPopover = () => {
    return <Popover {...spreadProps} />;
  };

  return (
    <>
      <Combobox />
      <LGCombobox />
      <Menu usePortal />
      <Popover usePortal={false} />
      <Select usePortal={true} />
      <SplitButton />
      <LeafyGreenTooltip usePortal={false} />
      <Popover />
      <Popover renderMode="inline" usePortal={false} />
      <Popover renderMode="portal" usePortal={true} />
      <Popover usePortal>
        <Child usePortal={false} />
      </Popover>
      <Popover usePortal={false} />
      <Popover usePortal={true} {...spreadProps} />
      <Popover {...spreadProps} />
      <WrappedPopover />
      <DefaultWrappedPopover />
    </>
  );
};
