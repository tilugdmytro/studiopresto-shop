/* eslint-disable no-console */
import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Grid, Typography, Box, LinearProgress } from '@mui/material';
import { ProductCard } from './ProductCard';
import PaginationComponent from '../molecules/Pagination';
import { useAppSelector } from '../app/hooks';

const ProductList = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { products, error, isLoading } = useAppSelector(
    (state) => state.products
  );
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const category = searchParams.get('category') || '';
  const itemsPerPage = 6;

  useEffect(() => {
    setCurrentPage(1);
  }, [category, query]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category filter
    if (category) {
      result = result.filter((product) => product.category === category);
    }

    // Query filter
    if (query) {
      result = result.filter((product) =>
        product.title.toLowerCase().includes(query.toLowerCase())
      );
    }

    return result;
  }, [query, category, products]);

  const totalItems = filteredProducts.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  return (
    <div>
      {error && (
        <Typography variant="h6" gutterBottom color="error">
          Error: {error}
        </Typography>
      )}
      {isLoading && paginatedProducts.length === 0 && (
        <Box sx={{ width: '100%' }}>
          <LinearProgress />
        </Box>
      )}
      {!isLoading && !error && paginatedProducts.length === 0 ? (
        <Typography variant="h6" gutterBottom>
          No matching results found...
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {paginatedProducts.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      )}
      {totalItems > itemsPerPage && (
        <PaginationComponent
          count={totalPages}
          page={currentPage}
          color="primary"
          variant="outlined"
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default ProductList;
