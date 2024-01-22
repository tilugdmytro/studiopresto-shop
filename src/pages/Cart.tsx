/* eslint-disable no-console */
/* eslint-disable max-len */
import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  Divider,
  IconButton,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import MyButton from '../molecules/MyButton';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  decreaseQuantity,
  increaseQuantity,
  removeCartItem,
} from '../redux/cartSlice';
import { ProductWithQuantity } from '../types/Product';

export const Cart = () => {
  const { cartProducts } = useAppSelector((state) => state.cart);
  console.log(cartProducts);

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

  const calculateTotalPrice = (items: ProductWithQuantity[]) => {
    const totalPrice = items.reduce((accumulator, item) => {
      return accumulator + item.price * item.quantity;
    }, 0);
  
    return totalPrice.toFixed(2);
  };
  
  const calculateTotalItems = (items: ProductWithQuantity[]) => {
    const totalItems = items.reduce((accumulator, item) => {
      return accumulator + item.quantity;
    }, 0);
  
    return totalItems;
  };

  return (
    <Box>
      {cartProducts.length === 0 ? (
        <Typography variant="h4">Your cart is empty.</Typography>
      ) : (
        <Grid container spacing={4}>
          {cartProducts.map((item) => (
            <Grid item key={item.id} xs={12}>
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
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-around"
                >
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
                    <Typography
                      variant="h6"
                      sx={{ width: '50px', textAlign: 'center' }}
                    >
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
                    }}
                  >
                    ${calculatePriceForOne(item.price, item.quantity)}
                  </Typography>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      <Card sx={{ padding: '20px' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              mt: 2,
            }}
          >
            <Typography variant="h3" sx={{ mb: 1, fontWeight: 'bold' }}>
              {`$${calculateTotalPrice(cartProducts)}`}
            </Typography>

            <Typography variant="h5">
              {`Total for ${calculateTotalItems(cartProducts)} items`}
            </Typography>
          </Box>

          <Divider sx={{ my: 2, width: '50%' }} />

          <MyButton
            label="Checkout"
            variant="contained"
            color="primary"
            // onClick={handleModalOpen}
          ></MyButton>
        </Box>
      </Card>
    </Box>
  );
};
