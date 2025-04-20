import { createContext, useState, useEffect, useContext } from "react";
import Cookies from "js-cookie";

export const ShopContext = createContext();

export const ShopContextProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        const stored = Cookies.get('cartItems');
        return stored ? JSON.parse(stored) : {};
    });

    useEffect(() => {
        Cookies.set('cartItems', JSON.stringify(cartItems), { expires: 7 });
    }, [cartItems]);

    const addToCart = (product) => {
        setCartItems(prev => {
            const prevQuantity = prev[product.id]?.quantity || 0;
            return {
                ...prev,
                [product.id]: {
                    ...product,
                    quantity: prevQuantity + 1,
                },
            };
        });
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

    return (
        <ShopContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity }}>
            {children}
        </ShopContext.Provider>
    );
};

export const useShop = () => useContext(ShopContext);
