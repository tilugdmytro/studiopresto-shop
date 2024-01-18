/* eslint-disable no-console */
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
import MyButton from '../molecules/MyButton';

type Props = {
  open: boolean;
  onClose: () => void;
};

const SideBar: React.FC<Props> = ({ open, onClose }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  useEffect(() => {
    fetch('https://fakestoreapi.com/products/categories')
      .then((res) => res.json())
      .then((json) => setCategories(json));
  }, []);

  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedCategory(event.target.value);
    const params = new URLSearchParams(searchParams);

    params.set('category', event.target.value);
    setSearchParams(params);
  };

  const handleClearCategory = () => {
    setSelectedCategory('');
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
          value={selectedCategory || ''}
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
        <MyButton
          label="Clear Filter"
          variant="outlined"
          onClick={handleClearCategory}
        />
      </Box>
    </Drawer>
  );
};

export default SideBar;
