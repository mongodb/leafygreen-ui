import React, { ReactElement } from 'react';

import { isComponentType } from '@leafygreen-ui/lib';

const deepSelectComponent: (
  componentName: string,
  childrenArray: Array<
    React.ReactChild | React.ReactFragment | React.ReactPortal
  >,
) => ReactElement | undefined = (componentName, childrenArray = []) => {
  const firstChild = childrenArray[0];

  if (firstChild) {
    if (isComponentType(firstChild, componentName)) {
      return firstChild;
    } else {
      return deepSelectComponent(
        componentName,
        React.Children.toArray((firstChild as ReactElement).props.children),
      );
    }
  } else {
    return undefined;
  }
};

export default deepSelectComponent;
