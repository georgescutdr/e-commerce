import { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState(() => {
    const stored = localStorage.getItem('wishlistItems') || Cookies.get('wishlistItems');
    return stored ? JSON.parse(stored) : {};
  });

  // Sync to localStorage and cookies
  useEffect(() => {
    localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
    Cookies.set('wishlistItems', JSON.stringify(wishlistItems), { expires: 7 });
  }, [wishlistItems]);

  // Call this after login to load from backend if needed
  const loadWishlist = (itemsArray) => {
    const wishlistMap = {};
    itemsArray.forEach(item => {
      wishlistMap[item.id] = item;
    });
    setWishlistItems(wishlistMap);
  };

  const toggleWishlist = (product) => {
    setWishlistItems(prev => {
      const exists = !!prev[product.id];
      const updated = { ...prev };
      if (exists) {
        delete updated[product.id];
      } else {
        updated[product.id] = product;
      }
      return updated;
    });
  };

  const isInWishlist = (id) => !!wishlistItems[id];

  return (
    <WishlistContext.Provider value={{ wishlistItems, loadWishlist, toggleWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
