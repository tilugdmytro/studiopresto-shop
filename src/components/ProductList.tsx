/* eslint-disable no-console */
import React, { useContext, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Grid } from '@mui/material';
import { ProductCard } from './ProductCard';
import { GlobalContext } from '../utils/GlobalProvider';
import PaginationComponent from '../molecules/Pagination';

const ProductList = () => {
  const {
    products, currentPage, setCurrentPage,
  } = useContext(GlobalContext);
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const category = searchParams.get('category') || '';
  const itemsPerPage = 6;

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category filter
    if (category) {
      result = result.filter((product) => product.category === category);
    }

    // Query filter
    if (query) {
      result = result.filter((product) => product.title
        .toLowerCase().includes(query.toLowerCase()));
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

  console.log(paginatedProducts);

  return (
    <div>
      <Grid container spacing={3}>
        {paginatedProducts.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
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
