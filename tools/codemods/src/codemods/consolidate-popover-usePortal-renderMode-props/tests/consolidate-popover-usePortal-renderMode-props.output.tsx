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
    return (
      /* Please update manually */
      <Popover usePortal={false} {...spreadProps} />
    );
  };

  const DefaultWrappedPopover = () => {
    return (
      /* Please update manually */
      <Popover {...spreadProps} />
    );
  };

  return (
    <>
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
