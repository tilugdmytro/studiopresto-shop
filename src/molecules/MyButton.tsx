import React from 'react';
import Button, { ButtonProps } from '@mui/material/Button';

interface MyButtonProps extends ButtonProps {
  label: string;
}

const MyButton: React.FC<MyButtonProps> = ({ label, ...buttonProps }) => {
  return (
    <Button {...buttonProps}>
      {label}
    </Button>
  );
};

export default MyButton;
