import React, { useEffect, useState } from 'react';
import { Menu } from 'primereact/menu';
import { Button } from 'primereact/button';
import { TieredMenu } from 'primereact/tieredmenu';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { shopConfig } from '../../../../config.js';
import './category-menu.css';
 
export const CategoryMenu = () => {
    const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
    const [categories, setCategories] = useState([]);
    const [pages, setPages] = useState([]);
    const [menuItems, setMenuItems] = useState([]);
    const [productsMenuVisible, setProductsMenuVisible] = useState(false);
    const menuRef = React.useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [categoryRes, pageRes] = await Promise.all([
                  Axios.post(shopConfig.getItemsUrl, { table: 'category' }),
                  Axios.post(shopConfig.getItemsUrl, { table: 'page' }),
                ]);

                setCategories(categoryRes.data);
                setPages(pageRes.data);
            } catch (error) {
                console.error('Error fetching categories or pages:', error);
            }
    };

    fetchData();
  }, []);

    useEffect(() => {
        const topCategories = categories.filter(cat => cat.parent_id === 0);
        const subCategories = categories.filter(cat => cat.parent_id > 0);

        const constructedMenu = topCategories.map(cat => ({
            label: cat.name,
            items: subCategories
            .filter(sub => sub.parent_id === cat.id)
            .map(sub => ({
                label: sub.name,
                command: () => navigate(`/s/${encodeURIComponent(sub.name)}/pd/${sub.id}`, { replace: true }),
            })),
        }));

        setMenuItems(constructedMenu);
    }, [categories, navigate]);

    return (
        <div className="category-menu-wrapper">
            <div className="menu-bar">
            {/* Products Dropdown */}
                <div className="products-wrapper">
                    <Button
                        label="Products"
                        icon="pi pi-chevron-down"
                        className="p-button-text"
                    />
                    <TieredMenu
                        model={menuItems}
                        className="products-tiered-menu"
                    />
                </div>

                {/* Dynamic Page Buttons */}
                {pages.map(page => (
                    <Button
                        key={page.id}
                        label={page.name}
                        className="p-button-text"
                        onClick={() => navigate(`/${page.slug || page.id}`, { replace: true })}
                    />
                ))}

                {/* Contact Button */}
                <Button
                    label="Contact"
                    className="p-button-text"
                    onClick={() => navigate('/contact', { replace: true })}
                />
            </div>
        </div>
  );
};
