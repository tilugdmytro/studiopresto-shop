import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
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
  LinearProgress,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Product } from '../../types/Product';
import { getProductById } from '../../api/getProducts';
import Button from '../../molecules/PrimaryButton';
import CustomLink from '../../atoms/CustomLink';
import { useAppDispatch } from '../../app/hooks';
import { addCartItem } from '../../redux/cartSlice';
import {
  showErrorNotification,
  showSuccessNotification,
} from '../../utils/notificationService';

let theme = createTheme({});

theme = responsiveFontSizes(theme);

export const ProductDetails: React.FC = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const location = useLocation();

  const backLinkHref = location.state?.from ?? "/";

  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    if (product !== null) {
      dispatch(addCartItem(product));
      showSuccessNotification('Product added to cart!');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (productId) {
          const data = await getProductById(+productId);

          setProduct(data);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        showErrorNotification('Something went wrong');
      }
    };

    fetchData();
  }, [productId]);

  if (!product) {
    return (
      <Box sx={{ width: '100%' }}>
        <LinearProgress />
      </Box>
    );
  }

  const { title, price, category, image, description, rating } = product;

  return (
    <Box>
      <CustomLink to={backLinkHref}>
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
            <Typography variant="h5" color="text.secondary" gutterBottom>
              Category: {category}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Rating: {rating.rate}
            </Typography>
            <Typography variant="h6" gutterBottom>
              Price: ${price}
            </Typography>
            <Typography variant="h5" gutterBottom>
              <strong>Description:</strong> {description}
            </Typography>
            <CardActions sx={{ justifyContent: 'center' }}>
              <Button
                label="Add to Cart"
                variant="contained"
                color="primary"
                onClick={handleAddToCart}
              />
            </CardActions>
          </CardContent>
        </ThemeProvider>
      </Card>
    </Box>
  );
};
