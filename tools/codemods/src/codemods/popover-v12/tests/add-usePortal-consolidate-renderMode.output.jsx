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
    return (
      /* Please manually update from prop: usePortal to prop: renderMode */
      <Popover usePortal={false} {...spreadProps} />
    );
  };

  const DefaultWrappedPopover = () => {
    return (
      /* Please manually add prop: renderMode */
      <Popover {...spreadProps} />
    );
  };

  return (
    <>
      <Combobox />
      <LGCombobox renderMode="portal" />
      <Menu renderMode="portal" />
      <Popover renderMode="inline" />
      <Select renderMode="portal" />
      <SplitButton renderMode="portal" />
      <LeafyGreenTooltip renderMode="inline" />
      <Popover renderMode="portal" />
      <Popover renderMode="inline" />
      <Popover renderMode="portal" />
      <Popover renderMode="portal">
        <Child usePortal={false} />
      </Popover>
      <Popover renderMode="inline" />
      {/* Please manually update from prop: usePortal to prop: renderMode */}
      <Popover usePortal={true} {...spreadProps} />
      {/* Please manually add prop: renderMode */}
      <Popover {...spreadProps} />
      <WrappedPopover />
      <DefaultWrappedPopover />
    </>
  );
};
