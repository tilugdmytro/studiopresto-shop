import React, { ReactNode } from 'react';
import { Link as RouterLink } from 'react-router-dom';

interface CustomLinkProps {
  to: string;
  children: ReactNode;
  state?: any;
}

const CustomLink: React.FC<CustomLinkProps> = ({ to, children, state }) => {
  return (
    <RouterLink to={to} state={state} style={{ textDecoration: 'none', color: 'inherit' }}>
      {children}
    </RouterLink>
  );
};

export default CustomLink;
