// src/components/Header.jsx
import React from 'react';
import { ShopNavbar } from '../navbar/shop-navbar';
import { BreadCrumb } from 'primereact/breadcrumb';
import { useLocation, Link } from 'react-router-dom';

export const Header = ({ categoryId = 0, searchWords = '' }) => {
    const location = useLocation();

   /*
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const items = pathSegments.map((segment, index) => {
        const url = '/' + pathSegments.slice(0, index + 1).join('/');
        return {
            label: decodeURIComponent(segment.replace(/-/g, ' ')),
            url: url,
            template: (item, options) => (
                <Link to={item.url} className="p-menuitem-link">
                    {item.label}
                </Link>
            )
        };
    });

    const home = {
        icon: 'pi pi-home',
        url: '/'
    };

    const breadcrumb = <BreadCrumb model={items} home={home} />;
*/
    return (
    	<>
        <header className="mb-3">
            <ShopNavbar categoryId={categoryId} searchWords={searchWords} />
        </header>
        </>
    );
};

export default Header;
