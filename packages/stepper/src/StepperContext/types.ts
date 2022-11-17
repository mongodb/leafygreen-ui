import React, { Dispatch } from 'react';

export interface StepperContextValues {
  darkMode: boolean;
  setDarkMode: Dispatch<React.SetStateAction<boolean>>;
  stepIconClassName: string;
  stepLabelClassName: string;
}
