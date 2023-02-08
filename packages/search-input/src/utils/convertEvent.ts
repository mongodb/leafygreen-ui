import React from 'react';

/** Returns a new event of a given type with updated event options */
export const convertEvent = <
  T extends React.SyntheticEvent = React.SyntheticEvent,
>(
  event: React.SyntheticEvent,
  newEventOptions: Partial<React.SyntheticEvent>,
): T => {
  return {
    ...event,
    ...newEventOptions,
  } as T;
};
