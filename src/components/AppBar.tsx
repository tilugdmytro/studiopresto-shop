/* eslint-disable no-console */
import React, { useState, useContext } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { GlobalContext } from '../utils/GlobalProvider';
import SideBar from './SideBar';
import CustomLink from '../molecules/CustomLink';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function PrimarySearchAppBar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { cart } = useContext(GlobalContext);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const query = searchParams.get('query') || '';

  const location = useLocation();

  const isHomePage = location.pathname === '/';

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;

    const params = new URLSearchParams(searchParams);

    if (newQuery) {
      params.set('query', newQuery);
    } else {
      params.delete('query');
    }

    setSearchParams(params);
  };

  const getTotalQuantity = () => {
    return cart.reduce((total, item) => total + (item.quantity || 0), 0);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          {isHomePage && (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
              onClick={toggleDrawer}
            >
              <MenuIcon />
            </IconButton>
          )}
          <CustomLink to="/">
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: 'none', sm: 'block' } }}
            >
              BestBuy
            </Typography>
          </CustomLink>
          {isHomePage && (
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                value={query}
                onChange={handleSearchChange}
              />
            </Search>
          )}
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { md: 'flex' } }}>
            <CustomLink to="/cart">
              <IconButton size="large" aria-label="cart item" color="inherit">
                <Badge badgeContent={getTotalQuantity()} color="error">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </CustomLink>
          </Box>
        </Toolbar>
      </AppBar>
      <SideBar open={drawerOpen} onClose={toggleDrawer} />
    </Box>
  );
}
