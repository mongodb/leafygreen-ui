import React from 'react';
import Button from '@leafygreen-ui/button';

interface PrimaryButtonProps {
  darkMode: boolean;
  handleButtonClick: () => void;
  focusClassName: string;
  buttonText: string;
}

function PrimaryButton({
  darkMode,
  handleButtonClick,
  focusClassName,
  buttonText,
}: PrimaryButtonProps) {
  return (
    <Button
      variant="primary"
      onClick={() => handleButtonClick()}
      darkMode={!darkMode}
      className={focusClassName}
    >
      {buttonText}
    </Button>
  );
}

PrimaryButton.displayName = 'PrimaryButton';
export default PrimaryButton;
