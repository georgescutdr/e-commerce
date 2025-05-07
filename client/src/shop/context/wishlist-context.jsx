import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import Cookies from 'js-cookie';

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState(() => {
    const stored = localStorage.getItem('wishlistItems') || Cookies.get('wishlistItems');
    return stored ? JSON.parse(stored) : {};
  });
  const wishlistArray = Object.values(wishlistItems);

  // Sync to localStorage and cookies
  useEffect(() => {
    localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
    Cookies.set('wishlistItems', JSON.stringify(wishlistItems), { expires: 7 });
  }, [wishlistItems]);

  const loadWishlist = useCallback((itemsArray) => {
    const wishlistMap = {};
    itemsArray.forEach(item => {
      wishlistMap[item.id] = item;
    });
    setWishlistItems(wishlistMap);
  }, []);

  const toggleWishlist = useCallback((product) => {
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
  }, []);

  const isInWishlist = (id) => Boolean(wishlistItems[id]);

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        wishlistArray, 
        loadWishlist,
        toggleWishlist,
        isInWishlist
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
