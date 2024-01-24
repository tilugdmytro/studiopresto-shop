import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Drawer,
  Box,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
} from '@mui/material';
import Button from './PrimaryButton';
import { getAllCategories } from '../api/getProducts';

type Props = {
  open: boolean;
  onClose: () => void;
};

export const SideBar: React.FC<Props> = ({ open, onClose }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [categories, setCategories] = useState<string[]>([]);
  const category = searchParams.get('category') || '';

  useEffect(() => {
    getAllCategories().then((json) => setCategories(json));
  }, []);

  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);
    params.set('category', event.target.value);
    setSearchParams(params);
  };

  const handleClearCategory = () => {
    const params = new URLSearchParams(searchParams);
    params.delete('category');
    setSearchParams(params);
  };

  return (
    <Drawer anchor="left" open={open} onClose={onClose} sx={{ width: '250px' }}>
      <Box p={2} sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <Typography variant="h6" component="div">
          Categories
        </Typography>
        <RadioGroup
          value={category || ''}
          onChange={handleCategoryChange}
        >
          {categories.map((category) => (
            <FormControlLabel
              key={category}
              value={category}
              control={<Radio />}
              label={category}
            />
          ))}
        </RadioGroup>
        <Button
          label="Clear Filter"
          variant="outlined"
          onClick={handleClearCategory}
        />
      </Box>
    </Drawer>
  );
};
