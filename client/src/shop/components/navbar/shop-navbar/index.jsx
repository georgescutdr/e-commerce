import React, { useState, useEffect, useRef } from 'react';
import './shop-navbar.css';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Avatar } from 'primereact/avatar';
import { Menu } from 'primereact/menu';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/auth-context';
import { useShop } from '../../../context/shop-context'; // Import ShopContext
import { ProgressSpinner } from 'primereact/progressspinner';
import { WishlistButton } from '../../wishlist-button';
import { CartButton } from '../../cart-button';
import { CategoryMenu } from '../category-menu';
import { SearchBar } from '../../../pages/search-bar'

export const ShopNavbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const menuRef = useRef(null);
  const wishlistMenuRef = useRef(null);
  const cartMenuRef = useRef(null);

  const { cartItems } = useShop();
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loadingWishlist, setLoadingWishlist] = useState(false);
  const [loadingCart, setLoadingCart] = useState(false);

  // Loading state is handled as data comes from context now, so no need to fetch
  useEffect(() => {
    setLoadingWishlist(false); // If using context, no need to fetch wishlist explicitly
    setLoadingCart(false);     // Same for cart items
  }, [cartItems, wishlistItems]);

  // Menu items for user profile, orders, and logout
  const menuItems = [
    {
      label: 'My Profile',
      icon: 'pi pi-user',
      command: () => navigate('/account'),
    },
    {
      label: 'Orders',
      icon: 'pi pi-list',
      command: () => navigate('/orders'),
    },
    {
      label: 'Logout',
      icon: 'pi pi-sign-out',
      command: () => logout(),
    },
  ];

  // Wishlist and Cart Dropdown Menu Items
  const wishlistMenuItems = Object.values(wishlistItems).slice(0, 5).map((item) => ({
    label: item.name, // Assuming `item.name` exists
    icon: 'pi pi-heart',
    command: () => navigate(`/wishlist/${item.id}`),
  }));

  const cartMenuItems = Object.values(cartItems).slice(0, 5).map((item) => ({
    label: item.name, // Assuming `item.name` exists
    icon: 'pi pi-shopping-cart',
    command: () => navigate(`/cart/${item.id}`),
  }));

  // Dropdown arrow icon
  const dropdownIcon = 'pi pi-chevron-down';

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
		  <WishlistButton wishlistItems={wishlistItems} loading={loadingWishlist} />
		  <CartButton cartItems={cartItems} loading={loadingCart} />
		  
		  {/* User Menu */}
		  <Menu model={menuItems} popup ref={menuRef} />
		  <Avatar
		    className="cursor-pointer"
		    shape="circle"
		    icon="pi pi-user" 
		    size="large"
		    style={{ backgroundColor: '#007bff', color: '#ffffff' }}
		    onClick={(e) => menuRef.current.toggle(e)}
		  />
		</div>
    </nav>
    <CategoryMenu />
    </>
  );
};
