import React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { PaginationProps } from '@mui/material';

interface Props extends PaginationProps {
  onPageChange: (page: number) => void;
}

export const PaginationComponent: React.FC<Props> = ({ onPageChange, ...paginationProps }) => {
  const handleChange = (_: React.ChangeEvent<unknown>, page: number) => {
    onPageChange(page);
  };

  return (
    <Stack spacing={2} justifyContent="center" alignItems="center" mt={3}>
      <Pagination {...paginationProps} onChange={handleChange} />
    </Stack>
  );
};
