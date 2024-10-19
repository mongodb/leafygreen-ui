import React from 'react';

const Combobox = ({ children, ...props }: any) => {
  return <div {...props}>{children}</div>;
};

const Menu = ({ children, ...props }: any) => {
  return <div {...props}>{children}</div>;
};

const Popover = ({ children, ...props }: any) => {
  return <div {...props}>{children}</div>;
};

const Select = ({ children, ...props }: any) => {
  return <div {...props}>{children}</div>;
};

const SplitButton = ({ children, ...props }: any) => {
  return <div {...props}>{children}</div>;
};

const Tooltip = ({ children, ...props }: any) => {
  return <div {...props}>{children}</div>;
};

const Child = (props: any) => {
  return <div>{props.children}</div>;
};

export const App = () => {
  const spreadProps = {
    prop: true,
  } as const;

  const WrappedPopover = () => {
    return (
      /* Please update manually */
      <Popover usePortal={false} {...spreadProps} />
    );
  };

  const DefaultWrappedPopover = () => {
    return (
      /* Please add manually */
      <Popover {...spreadProps} />
    );
  };

  return (
    <>
      <Combobox renderMode="portal" />
      <Menu renderMode="portal" />
      <Popover renderMode="inline" />
      <Select renderMode="portal" />
      <SplitButton renderMode="portal" />
      <Tooltip renderMode="inline" />
      <Popover renderMode="portal" />
      <Popover renderMode="inline" />
      <Popover renderMode="portal" />
      <Popover renderMode="portal">
        <Child usePortal={false} />
      </Popover>
      <Popover renderMode="inline" />
      {/* Please update manually */}
      <Popover usePortal={true} {...spreadProps} />
      <WrappedPopover />
      <DefaultWrappedPopover />
    </>
  );
};
