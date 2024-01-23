import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import emailjs from 'emailjs-com';
import { Box, TextField } from '@mui/material';
import { FormData } from '../../types/FormData';
import MyButton from '../../atoms/MyButton';

interface CartFormProps {
  onSubmit: SubmitHandler<FormData>;
}

export const CartForm: React.FC<CartFormProps> = ({ onSubmit }) => {
  const { handleSubmit, register, formState } = useForm<FormData>();

  const handleFormSubmit = async (data: FormData) => {
    try {
      const { name, email, phone } = data;

      await emailjs.send(
        'service_1pv4xzh',
        'template_91a6g3l',
        {
          name,
          email,
          phone,
        },
        'XwoW3udp06IBExn0M'
      );

      onSubmit(data);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          margin="normal"
          {...register('name', { required: 'Name is required' })}
          error={Boolean(formState.errors.name)}
          helperText={
            formState.errors.name ? String(formState.errors.name.message) : ''
          }
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Invalid email format',
            },
          })}
          error={Boolean(formState.errors.email)}
          helperText={
            formState.errors.email ? String(formState.errors.email.message) : ''
          }
        />
        <TextField
          label="Phone"
          variant="outlined"
          fullWidth
          margin="normal"
          placeholder="Enter a 10-digit phone number"
          {...register('phone', {
            required: 'Phone number is required',
            pattern: {
              value: /^\d{10}$/,
              message: 'Invalid phone number format',
            },
          })}
          error={Boolean(formState.errors.phone)}
          helperText={
            formState.errors.phone ? String(formState.errors.phone.message) : ''
          }
        />
        <MyButton
          label="Buy"
          type="submit"
          variant="contained"
          color="primary"
          sx={{ marginTop: 3 }}
        />
      </Box>
    </form>
  );
};
