import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import Cookies from 'js-cookie';

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState(() => {
    const stored = localStorage.getItem('wishlistItems') || Cookies.get('wishlistItems');
    const parsed = stored ? JSON.parse(stored) : {};
    const normalized = {};
    for (const key in parsed) {
      normalized[String(key)] = parsed[key]; // Normalize keys as strings
    }
    return normalized;
  });

  const wishlistArray = Object.values(wishlistItems);

  useEffect(() => {
    localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
    Cookies.set('wishlistItems', JSON.stringify(wishlistItems), { expires: 7 });
  }, [wishlistItems]);

  const loadWishlist = useCallback((itemsArray) => {
    const newMap = {};
    itemsArray.forEach(item => {
      newMap[String(item.id)] = item;
    });

    const newStr = JSON.stringify(newMap);
    const currentStr = JSON.stringify(wishlistItems);

    if (newStr !== currentStr) {
      setWishlistItems(newMap);
    }
  }, [wishlistItems]);


  const toggleWishlist = useCallback((product) => {
    const id = String(product.id);
    setWishlistItems(prev => {
      const updated = { ...prev };
      if (updated[id]) {
        delete updated[id];
      } else {
        updated[id] = product;
      }
      return updated;
    });
  }, []);

  const isInWishlist = useCallback((id) => {
    return Boolean(wishlistItems[String(id)]);
  }, [wishlistItems]);

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
