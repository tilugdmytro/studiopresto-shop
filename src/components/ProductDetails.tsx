/* eslint-disable no-console */
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
  IconButton,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Product } from '../types/Product';
import { getProductById } from '../api/getProducts';
import { GlobalContext } from '../utils/GlobalProvider';
import MyButton from '../molecules/MyButton';
import CustomLink from '../molecules/CustomLink';

let theme = createTheme({});

theme = responsiveFontSizes(theme);

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const { addCartItem } = useContext(GlobalContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (productId) {
          const data = await getProductById(+productId);

          setProduct(data);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchData();
  }, []);

  if (!product) {
    return <Typography>Loading...</Typography>;
  }

  const {
    title, price, category, image, description, rating,
  } = product;

  return (
    <Box>
      <CustomLink to="/">
        <IconButton color="primary">
          <ArrowBackIcon />
        </IconButton>
      </CustomLink>
      <Card
        sx={{
          padding: '20px',
        }}
      >
        <ThemeProvider theme={theme}>
          <CardMedia
            component="img"
            height="300px"
            image={image}
            alt={title}
            sx={{ objectFit: 'contain', marginBottom: '10px' }}
          />
          <CardContent>
            <Typography
              variant="h4"
              component="h2"
              gutterBottom
              sx={{ textAlign: 'center' }}
            >
              {title}
            </Typography>
            <Typography variant="h5" gutterBottom>
              Category:
              {' '}
              {category}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Rating:
              {' '}
              {rating.rate}
            </Typography>
            <Typography variant="h6" gutterBottom>
              Price: $
              {price}
            </Typography>
            <Typography variant="h5" color="text.secondary" gutterBottom>
              <strong>Description:</strong>
              {' '}
              {description}
            </Typography>
            <CardActions sx={{ justifyContent: 'center' }}>
              <MyButton
                label="Add to Cart"
                variant="contained"
                color="primary"
                onClick={() => addCartItem(product.id)}
              />
            </CardActions>
          </CardContent>
        </ThemeProvider>
      </Card>
    </Box>
  );
};

export default ProductDetails;
