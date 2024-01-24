import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { useAppSelector } from '../app/hooks';
import { CartItem } from '../organisms/Cart/CartItem';
import { CartSummary } from '../organisms/Cart/CartSummary';
import { useNavigate } from 'react-router-dom';
import Button from '../molecules/PrimaryButton';

export const Cart: React.FC = () => {
  const { cartProducts } = useAppSelector((state) => state.cart);

  const navigate = useNavigate();

  const navigateToHome = () => {
    navigate('/');
  };

  return (
    <>
      {cartProducts.length === 0 ? (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '80vh',
          }}
        >
          <Typography variant="h2" sx={{ textAlign: 'center' }}>
            Your cart is empty...
          </Typography>
          <Button
            label="Go Shopping!"
            onClick={navigateToHome}
            variant="contained"
            color="primary"
            sx={{ marginTop: 6 }}
          />
        </Box>
      ) : (
        <>
          <Grid container spacing={4}>
            {cartProducts.map((item) => (
              <Grid item key={item.id} xs={12}>
                <CartItem item={item} />
              </Grid>
            ))}
          </Grid>
          <CartSummary cartProducts={cartProducts} />
        </>
      )}
    </>
  );
};
