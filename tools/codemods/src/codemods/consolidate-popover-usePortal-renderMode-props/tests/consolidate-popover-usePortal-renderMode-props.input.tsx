import React from 'react';

const Popover = (props: any) => {
  const { usePortal = true } = props;

  if (usePortal) {
    return <p>Portaling children: {props.children}</p>;
  }

  return <p>Normally rendering children: {props.children}</p>;
};

const Child = (props: any) => {
  return <p>Testing {props.children}</p>;
};

export const App = () => {
  const spreadProps = {
    adjustOnMutation: false,
    align: 'bottom',
    justify: 'start',
    spacing: 4,
  } as const;

  const WrappedPopover = () => {
    return <Popover usePortal={false} {...spreadProps} />;
  };

  const DefaultWrappedPopover = () => {
    return <Popover {...spreadProps} />;
  };

  return (
    <>
      <Popover />
      <Popover renderMode="inline" usePortal={false} />
      <Popover renderMode="portal" usePortal={true} />
      <Popover usePortal={true}>
        <Child usePortal={false} />
      </Popover>
      <Popover usePortal={false} />
      <Popover usePortal={true} {...spreadProps} />
      <WrappedPopover />
      <DefaultWrappedPopover />
    </>
  );
};
