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
    return <Popover usePortal={false} {...spreadProps} />;
  };

  const DefaultWrappedPopover = () => {
    return <Popover {...spreadProps} />;
  };

  return (
    <>
      <Combobox />
      <Menu usePortal />
      <Popover usePortal={false} />
      <Select usePortal={true} />
      <SplitButton />
      <Tooltip usePortal={false} />
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
