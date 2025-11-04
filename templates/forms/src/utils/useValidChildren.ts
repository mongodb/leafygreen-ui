import React, { useMemo } from 'react';

const validDisplayNamesList = [
  'Field.String',
  'Field.SingleSelect',
  'Field.MultiSelect',
];

function extractType(
  node: React.ReactNode,
): Function | React.ForwardRefExoticComponent<any> | string {
  return (node as unknown as React.ReactElement).type;
}

function extractDisplayName(type: React.FunctionComponent): string {
  return type.displayName || type.name || 'Unknown';
}

// Checks that the type is a function component or a forward ref component
function isReactFunctionComponent(
  type: any,
): type is Function | React.ForwardRefExoticComponent<any> {
  return typeof type === 'function' || typeof type.render === 'function';
}

// Filter out invalid children, log a console error, and memoize children based on valid display names.
export default function useValidChildren(
  children: React.ReactNode,
  validDisplayNames = validDisplayNamesList,
): React.ReactNode {
  return useMemo(() => {
    const childrenArray = React.Children.toArray(children);

    return childrenArray.filter(child => {
      const type = extractType(child);

      // Forward ref components are objects
      if (isReactFunctionComponent(type)) {
        const displayName = extractDisplayName(
          type as unknown as React.FunctionComponent,
        );

        if (!validDisplayNames.includes(displayName)) {
          console.error(
            `Invalid child component provided and ignored${
              displayName ? `: ${displayName}` : ''
            }. Valid children are: ${validDisplayNames.join(', ')}.`,
          );

          return false;
        }

        return true;
      } else {
        console.error(
          `Invalid child provided and ignored of type: ${type}. Valid children are: ${validDisplayNames.join(
            ', ',
          )}.`,
        );

        return false;
      }
    });
  }, [children, validDisplayNames]);
}
