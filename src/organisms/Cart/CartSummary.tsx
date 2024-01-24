import React, { useState } from 'react';
import { Card, Box, Typography, Divider } from '@mui/material';
import Button from '../../molecules/PrimaryButton';
import { ProductWithQuantity } from '../../types/Product';
import { ModalWindow } from '../../molecules/ModalWindow';
import { SubmitHandler } from 'react-hook-form';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { CartForm } from './CartForm';
import { FormData } from '../../types/FormData';
import { useAppDispatch } from '../../app/hooks';
import { clearCart } from '../../redux/cartSlice';
import { showSuccessNotification } from '../../utils/notificationService';

interface CartSummaryProps {
  cartProducts: ProductWithQuantity[];
}

export const CartSummary: React.FC<CartSummaryProps> = ({ cartProducts }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useAppDispatch();

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

  const toggleModal = () => {
    setIsModalOpen((prevIsModalOpen) => !prevIsModalOpen);
  };

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data, cartProducts);
    dispatch(clearCart());
    toggleModal();

    showSuccessNotification('Purchase successful!');
  };

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      <Card sx={{ padding: '20px', mt: 6, boxShadow: '#2196f3 0px 5px 15px;' }}>
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

          <Button
            label="Checkout"
            variant="contained"
            color="primary"
            onClick={toggleModal}
          />
        </Box>
      </Card>
      {isModalOpen && (
        <ModalWindow onClose={toggleModal} isModalOpen={isModalOpen}>
          <Box
            sx={{
              width: isSmallScreen ? '100%' : '500px',
            }}
          >
            <Typography sx={{ textAlign: 'center' }} variant="h5">
              Please enter your data
            </Typography>
            <CartForm onSubmit={onSubmit} />
          </Box>
        </ModalWindow>
      )}
    </>
  );
};
