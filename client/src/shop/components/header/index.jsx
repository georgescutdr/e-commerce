import React from 'react';
import { ShopNavbar } from '../navbar/shop-navbar';
import { BreadCrumb } from 'primereact/breadcrumb';
import { useLocation, Link } from 'react-router-dom';
import { useShop } from '../../context/shop-context';
import { AddToCartModal } from '../add-to-cart-modal'

export const Header = ({ categoryId = 0, searchWords = '' }) => {
    const location = useLocation();

    const { modalVisible, setModalVisible, addedProduct, setAddedProduct } = useShop();

    return (
    	<>
        <header className="mb-3">
            <ShopNavbar categoryId={categoryId} searchWords={searchWords} />
        </header>
        {modalVisible && addedProduct && (
          <AddToCartModal 
            visible={modalVisible} 
            setVisible={setModalVisible} 
            addedProduct={addedProduct} 
            setAddedProduct={setAddedProduct} 
          />
        )}

        </>
    );
};

export default Header;
