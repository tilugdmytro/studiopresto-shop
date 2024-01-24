import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Typography,
  Box,
} from '@mui/material';
import { Product } from '../../types/Product';
import Button from '../../molecules/PrimaryButton';
import CustomLink from '../../atoms/CustomLink';
import { useAppDispatch } from '../../app/hooks';
import { addCartItem } from '../../redux/cartSlice';
import { showSuccessNotification } from '../../utils/notificationService';
import { useLocation } from 'react-router-dom';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const { id, title, price, category, image } = product;
  const location = useLocation();

  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    dispatch(addCartItem(product));
    showSuccessNotification('Product added to cart');
  };

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'transform 0.25s',
        '&:hover': {
          transform: 'scale(1.04)',
          boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px;',
        },
      }}
    >
      <Box>
        <CustomLink to={`/product/${id}`} state={{from: location}}>
          <Box sx={{ padding: '10px' }}>
            <CardMedia
              component="img"
              height="200px"
              image={image}
              alt={title}
              sx={{ objectFit: 'contain' }}
            />
          </Box>
        </CustomLink>
        <CardContent>
          <CustomLink to={`/product/${id}`}>
            <Typography
              className="title"
              variant="h5"
              component="h2"
              sx={{
                mb: 2,
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
              }}
            >
              {title}
            </Typography>
          </CustomLink>
          <Typography
            variant="body2"
            sx={{
              mb: 1,
              opacity: 0.6,
            }}
          >
            <strong>Category: </strong> {category}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              mb: 1,
            }}
          >
            <strong>Price:</strong> ${price}
          </Typography>
        </CardContent>
      </Box>
      <CardActions sx={{ marginBottom: '10px', alignSelf: 'center' }}>
        <Button
          label="Add to Cart"
          variant="contained"
          color="primary"
          onClick={handleAddToCart}
        />
      </CardActions>
    </Card>
  );
};
