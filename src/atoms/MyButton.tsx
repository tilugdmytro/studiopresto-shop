import React from 'react';
import Button, { ButtonProps } from '@mui/material/Button';

interface MyButtonProps extends ButtonProps {
  label: string;
  onClick?: () => void;
}

const MyButton: React.FC<MyButtonProps> = ({ label, onClick, ...buttonProps }) => {
  return (
    <Button onClick={onClick} {...buttonProps}>
      {label}
    </Button>
  );
};

export default MyButton;
