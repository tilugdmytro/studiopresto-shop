import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Typography,
  Box,
} from '@mui/material';
import { Product } from '../types/Product';
import MyButton from '../molecules/MyButton';
import CustomLink from '../molecules/CustomLink';
import { useAppDispatch } from '../app/hooks';
import { addCartItem } from '../redux/cartSlice';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const {
    id, title, price, category, image,
  } = product;

  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    dispatch(addCartItem(product));
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
          '& .title': {
            whiteSpace: 'normal',
            overflow: 'visible',
            textOverflow: 'clip',
          },
        },
      }}
    >
      <Box>
        <CustomLink to={`/product/${id}`}>
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
                '&:hover': {
                  whiteSpace: 'normal',
                  overflow: 'visible',
                  textOverflow: 'clip',
                },
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
            <strong>Category: </strong>
            {' '}
            {category}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              mb: 1,
            }}
          >
            <strong>Price:</strong>
            {' '}
            $
            {price}
          </Typography>
        </CardContent>
      </Box>
      <CardActions sx={{ marginBottom: '10px', alignSelf: 'center' }}>
        <MyButton
          label="Add to Cart"
          variant="contained"
          color="primary"
          onClick={handleAddToCart}
        />
      </CardActions>
    </Card>
  );
};
