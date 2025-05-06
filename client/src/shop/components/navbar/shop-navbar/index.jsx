// ShopNavbar.jsx
import React, { useState, useEffect } from 'react';
import './shop-navbar.css';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/auth-context';
import { useShop } from '../../../context/shop-context';
import { WishlistButton } from '../../wishlist-button';
import { CartButton } from '../../cart-button';
import { CategoryMenu } from '../category-menu';
import { SearchBar } from '../../../pages/search-bar';
import { AuthButtons } from '../../auth-buttons';
import { UserMenu } from '../user-menu'; 
import { isLoggedIn } from '../../../../utils/auth-helpers';

export const ShopNavbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [wishlistItems, setWishlistItems] = useState([]);
  const { cartItems } = useShop();
  const [loadingWishlist, setLoadingWishlist] = useState(false);
  const [loadingCart, setLoadingCart] = useState(false);

  useEffect(() => {
    setLoadingWishlist(false); // If using context, no need to fetch wishlist explicitly
    setLoadingCart(false);     // Same for cart items
  }, [cartItems, wishlistItems]);

  // Wishlist and Cart Dropdown Menu Items
  const wishlistMenuItems = isLoggedIn()
    ? Object.values(wishlistItems).slice(0, 5).map((item) => ({
        label: item.name, // Assuming `item.name` exists
        icon: 'pi pi-heart',
        command: () => navigate(`/wishlist/${item.id}`),
      }))
    : [];

  const cartMenuItems = Object.values(cartItems).slice(0, 5).map((item) => ({
    label: item.name, // Assuming `item.name` exists
    icon: 'pi pi-shopping-cart',
    command: () => navigate(`/cart/${item.id}`),
  }));

  return (
    <>
      <nav className="shop-navbar">
        {/* Left: Logo */}
        <div className="shop-navbar-logo" onClick={() => navigate('/')}>
          <img src="/images/logo.jpg" alt="Shop Logo" />
        </div>

        {/* Middle: Search Bar */}
        <div className="shop-navbar-searchbar p-input-icon-left">
          <SearchBar />
        </div>

        {/* Right: Buttons */}
        <div className="shop-navbar-actions">
          {isLoggedIn() && ( <WishlistButton wishlistItems={wishlistItems} loading={loadingWishlist} /> )}
          <CartButton cartItems={cartItems} loading={loadingCart} />

          {/* User Menu */}
          {isLoggedIn() && <UserMenu />}
          <AuthButtons />
        </div>
      </nav>
      <CategoryMenu />
    </>
  );
};

export default ShopNavbar;
