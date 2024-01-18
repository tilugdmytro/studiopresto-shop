/* eslint-disable no-console */
/* eslint-disable max-len */
import React, { useContext, useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Divider,
  // IconButton,
} from '@mui/material';
// import AddIcon from '@mui/icons-material/Add';
// import RemoveIcon from '@mui/icons-material/Remove';
// import DeleteIcon from '@mui/icons-material/Delete';
import { GlobalContext } from '../utils/GlobalProvider'; // Замените на ваш актуальный контекст
import { Product } from '../types/Product';
import { getProductById } from '../api/getProducts';
import MyButton from '../molecules/MyButton';

export const Cart = () => {
  const { cart } = useContext(GlobalContext);
  const [cartProducts, setCartProducts] = useState<Product[]>([]);

  console.log('cart', cart);
  console.log('cartProducts', cartProducts);

  const fetchCartProducts = async () => {
    try {
      const detailedProducts = await Promise.all(
        cart.map(async (item) => {
          const productDetails = await getProductById(item.id);

          return productDetails;
        }),
      );

      setCartProducts(detailedProducts);
    } catch {
      console.error(Error);
    }
  };

  useEffect(() => {
    fetchCartProducts();
  }, [cart]);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Shopping Cart
      </Typography>
      {cartProducts.length === 0 ? (
        <Typography>Your cart is empty.</Typography>
      ) : (
        <Grid container spacing={3}>
          {cartProducts.map((item) => (
            <Grid item key={item.id} xs={12}>
              <Card sx={{ display: 'flex', alignItems: 'center', padding: '20px' }}>
                <CardMedia
                  component="img"
                  height="100"
                  image={item.image}
                  alt={item.title}
                  sx={{ width: 'auto' }}
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {item.title}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="textSecondary"
                    gutterBottom
                  >
                    Price: $
                    {item.price}
                  </Typography>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    {/* <Box display="flex" alignItems="center">
                      <IconButton onClick={() => handleDecreaseQuantity(item.id)} disabled={item.quantity <= 1}>
                        <RemoveIcon />
                      </IconButton>
                      <Typography variant="body1" style={{ margin: '0 10px' }}>
                        {item.quantity}
                      </Typography>
                      <IconButton onClick={() => handleIncreaseQuantity(item.id)}>
                        <AddIcon />
                      </IconButton>
                    </Box>
                    <IconButton onClick={() => handleRemoveFromCart(item.id)}>
                      <DeleteIcon />
                    </IconButton> */}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      <Card sx={{ padding: '20px' }}>
        <Box
          sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              mt: 2,
            }}
          >
            <Typography variant="h5" sx={{ mb: 1 }}>
              totalprice
              {/* {`$${calculateTotalPrice()}`} */}
            </Typography>

            <Typography variant="subtitle1">
              totalitem
              {/* {`Total for ${calculateTotalItems()} items`} */}
            </Typography>
          </Box>

          <Divider sx={{ my: 2, width: '50%' }} />

          <MyButton
            label="Checkout"
            variant="contained"
            color="primary"
            // onClick={handleModalOpen}
          >
          </MyButton>
        </Box>
      </Card>
    </Box>
  );
};
