import React from 'react';
import Button, { ButtonProps } from '@mui/material/Button';

interface PrimaryButtonProps extends ButtonProps {
  label: string;
  onClick?: () => void;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  label,
  onClick,
  ...buttonProps
}) => {
  return (
    <Button onClick={onClick} {...buttonProps}>
      {label}
    </Button>
  );
};

export default PrimaryButton;
