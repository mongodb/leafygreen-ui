import React from 'react';
import { FieldDetails } from '../../../formStore';

export default function renderFieldDescription(details: FieldDetails) {
  if (!details) {
    return;
  }

  if (typeof details === 'string') {
    return details;
  }

  // TODO: Handle learn more/info sprinkle cases

  return details.displayText;
}
