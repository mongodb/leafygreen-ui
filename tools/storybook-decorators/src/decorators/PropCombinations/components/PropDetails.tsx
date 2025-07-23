import React from 'react';
import { PropsWithChildren } from 'react';

export function PropDetailsComponent({
  children,
  propName,
  val,
}: PropsWithChildren<{
  propName: string;
  val: any;
}>) {
  const isDarkModeProp = propName === 'darkMode';
  const Wrapper = isDarkModeProp ? 'div' : React.Fragment;
  const wrapperProps = isDarkModeProp && {
    id: `${propName}-${val}`,
  };

  return <Wrapper {...wrapperProps}>{children}</Wrapper>;
}
