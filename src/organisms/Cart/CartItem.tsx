import React from 'react';
import { Card, Box, IconButton, CardMedia, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import {
  decreaseQuantity,
  increaseQuantity,
  removeCartItem,
} from '../../redux/cartSlice';
import { useAppDispatch } from '../../app/hooks';
import { ProductWithQuantity } from '../../types/Product';

interface CartItemProps {
  item: ProductWithQuantity;
}

export const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const dispatch = useAppDispatch();

  const handleIncreaseQuantity = (id: number) => {
    dispatch(increaseQuantity(id));
  };

  const handleDecreaseQuantity = (id: number) => {
    dispatch(decreaseQuantity(id));
  };

  const handleRemoveFromCart = (id: number) => {
    dispatch(removeCartItem(id));
  };

  const calculatePriceForOne = (price: number, quantity: number) => {
    const total = price * quantity;

    return total.toFixed(2);
  };

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        justifyContent: { md: 'space-between' },
        padding: '10px',
        gap: 3,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <IconButton onClick={() => handleRemoveFromCart(item.id)}>
          <DeleteIcon fontSize="large" />
        </IconButton>
        <CardMedia
          component="img"
          image={item.image}
          alt={item.title}
          sx={{
            width: '100px',
            height: '200px',
            objectFit: 'contain',
          }}
        />
        <Typography variant="h6" gutterBottom>
          {item.title}
        </Typography>
      </Box>
      <Box display="flex" alignItems="center" justifyContent="space-around">
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton
            sx={{
              borderRadius: '50%',
              border: '1px solid black',
            }}
            onClick={() => handleDecreaseQuantity(item.id)}
            disabled={item.quantity <= 1}
          >
            <RemoveIcon />
          </IconButton>
          <Typography variant="h6" sx={{ width: '50px', textAlign: 'center' }}>
            {item.quantity}
          </Typography>
          <IconButton
            sx={{
              borderRadius: '50%',
              border: '1px solid black',
            }}
            onClick={() => handleIncreaseQuantity(item.id)}
          >
            <AddIcon />
          </IconButton>
        </Box>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 'bold',
            width: '100px',
            textAlign: 'center',
            marginLeft: '10px',
          }}
        >
          ${calculatePriceForOne(item.price, item.quantity)}
        </Typography>
      </Box>
    </Card>
  );
};
