import { createContext, useState, useEffect, useContext, useRef } from "react";
import Cookies from "js-cookie";

export const ShopContext = createContext();

export const ShopContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const stored = Cookies.get('cartItems');
    return stored ? JSON.parse(stored) : {};
  });

  const [total, setTotal] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [addedProduct, setAddedProduct] = useState(null);

  useEffect(() => {
      try {
        const stored = Cookies.get('cartItems');
        if (stored) {
          setCartItems(JSON.parse(stored));
        }
      } catch (err) {
        console.warn("Failed to load cart from cookies", err);
        Cookies.remove('cartItems'); // Optional: clear corrupt cookie
      }
      setIsInitialized(true);
    }, []);

  const parsePromotions = (promoArray) => {
      if (!Array.isArray(promoArray) || promoArray[0] === null) return [];

      const uniquePromos = new Map();

      promoArray.forEach(promo => {
        if (promo?.id && !uniquePromos.has(promo.id)) {
          uniquePromos.set(promo.id, {
            id: promo.id,
            type: promo.type === 'percent' ? 'percentage' : 'value',
            name: promo.name,
            value: promo.value
          });
        }
      });

      return Array.from(uniquePromos.values());
    };


  const addToCart = (product) => {
    setCartItems(prev => {
      const prevQuantity = prev[product.id]?.quantity || 0;

      const existing = prev[product.id] || {};
      const newItem = {
        ...product,
        product_id: product.id,
        category_id: product.category_id,
        brand_name: product.brand_name,
        quantity: prevQuantity + 1,
        vouchers: existing.vouchers || [],
        promotions: parsePromotions(product.promotion_array),
      };

      return {
        ...prev,
        [product.id]: newItem,
      };
    });

    // Delay modal appearance by 2 seconds (2000 ms)
    setTimeout(() => {
      setAddedProduct(prev => {
        if (prev?.id !== product.id) {
          setModalVisible(true);  // Open modal only if it's a different product
          return product;
        }
        return prev;
      });
    }, 1000);
    
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => {
      const updated = { ...prev };
      delete updated[productId];
      return updated;
    });
  };

  const updateQuantity = (productId, quantity) => {
    setCartItems(prev => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        quantity: quantity < 1 ? 1 : quantity,
      },
    }));
  };

  // Apply voucher globally across multiple products
  const applyVoucherGlobally = (voucher, productIds = []) => {
    setCartItems(prev => {
      const updatedCart = { ...prev };

      productIds.forEach(pid => {
        const product = updatedCart[pid];
        if (!product) return;

        const existingVouchers = product.vouchers || [];
        const alreadyApplied = existingVouchers.some(v => v.code === voucher.code);
        if (alreadyApplied) return;

        updatedCart[pid] = {
          ...product,
          vouchers: [...existingVouchers, voucher],
        };
      });

      computeTotal(updatedCart);
      return updatedCart;
    });
  };

  // Apply voucher to a specific product
  const applyVoucherToProduct = (voucher, productId) => {
    applyVoucherGlobally(voucher, [productId]);
  };

  const computeTotal = (cart) => {
      let newTotal = 0;

      Object.values(cart).forEach((item) => {
        let basePrice = item.price * item.quantity;
        let totalDiscount = 0;

        // Apply promotions first
        if (item.promotions) {
          item.promotions.forEach(promo => {
            const discount = promo.type === 'percentage'
              ? (item.price * promo.value) / 100
              : promo.value;
            totalDiscount += discount;
          });
        }

        // Apply vouchers on top
        if (item.vouchers) {
          item.vouchers.forEach(voucher => {
            const discount = voucher.type === 'percentage'
              ? (item.price * voucher.value) / 100
              : voucher.value;
            totalDiscount += discount;
          });
        }

        newTotal += (basePrice - totalDiscount);
      });

      setTotal(newTotal);
    };

    useEffect(() => {
      if (isInitialized) {
        Cookies.set('cartItems', JSON.stringify(cartItems), { expires: 7 }); // 7-day expiry
      }
    }, [cartItems, isInitialized]);

  return (
    <ShopContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      applyVoucherToProduct,
      applyVoucherGlobally,
      total,
      modalVisible,
      setModalVisible,
      addedProduct,
      setAddedProduct,
    }}>
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => useContext(ShopContext);
