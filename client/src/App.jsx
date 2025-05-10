import React, { useState, Suspense, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom'
import Axios from 'axios'

import { Dashboard } from './admin/pages/dashboard'

import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import './admin/admin.css'
import './shop/shop.css'

import { PrimeReactProvider, PrimeReactContext } from 'primereact/api'

import { ShopContextProvider } from './shop/context/shop-context'
import { AuthProvider } from './shop/context/auth-context';
import { WishlistProvider } from './shop/context/wishlist-context';
import { ProtectedRoute } from './components/protected-route';

import { randomKey } from './utils'

import { shopConfig, config } from './config'

import { Item } from './admin/pages/item'
import { Items } from './admin/pages/items'
import { Footer } from './components/footer'

import { ProgressSpinner } from 'primereact/progressspinner';

import 'primereact/resources/themes/lara-light-blue/theme.css'; // or any other theme
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

/*
For admin dashboard
Sales Overview: A visual summary of total sales, revenue, and number of orders.
Orders Summary: A quick view of the number of pending, processed, and completed orders.
Product Analytics: Information on best-selling products and top categories.
Customer Insights: A summary of new, returning, and active customers.
Inventory Status: A quick glance at low stock products, out-of-stock products, and the most popular products.
Promotions & Vouchers: Quick stats on active promotions and voucher usage.

Sales Reports: View detailed reports on sales performance, revenue, and trends over different periods (daily, weekly, monthly).
Order Reports: Detailed insights into order fulfillment, including processing times, shipping statuses, and refunds.
Customer Reports: Insights into customer demographics, behavior, and activity.
Product Performance: Track how products are performing (sales volume, inventory levels, etc.).

Shipping Methods: Configure and manage shipping methods and pricing.
Manage Shipping Addresses: Admins can edit customer shipping addresses or change shipping statuses.
Track Shipments: Option to input or track the status of shipments in real-time.

Manage Product Variants: If applicable, admins should be able to manage variants like size, color, and material.
Stock Management: Set stock levels and track product availability.

Order History: A log of all order activities, such as status changes, refunds, or cancellations.
*/

function App() {
    const [componentMap, setComponentMap] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);

    const loadComponentMap = async () => {
        const map = {};
        for (const item of shopConfig.items) {
            if (!map[item.component]) {
              const module = await import(`./shop/pages/${item.component}/index.jsx`);
              map[item.component] = module.default;
            }
        }
        return map;
    };

    const fetchDbPages = async () => {
        try {
            const pageRes = await Axios.get(shopConfig.getItemsUrl, { params: { table: 'page' } });

            // Loop through pageRes and add the slug with 'view-item' component
            const updatedMap = { ...componentMap }; // Clone the current component map
            pageRes.data.forEach(page => {
                updatedMap['view-item'] = `./shop/pages/view-item/index.jsx`;
            });

            // Update the state with the new map
            setComponentMap(updatedMap);
        } catch (error) {
            console.error('Error fetching pages:', error);
        }
    };

    useEffect(() => {
        loadComponentMap().then(setComponentMap);
    //    fetchDbPages();
    }, []);

    if (!componentMap) {
        return (
            <div className="spinner-container">
                <ProgressSpinner />
            </div>
        );
    }


  //const { user } = useAuth();
  //{user?.isAdmin ? <AdminNavbar /> : <ShopNavbar />}

    return (
        <>
        <Router>
        <AuthProvider>
        <WishlistProvider>
        <ShopContextProvider>
        <PrimeReactProvider>
            <Routes>
            <>
            {shopConfig.items.map((item, index) => {
                const Component = componentMap[item.component];

                if (!Component) {
                    console.warn(`❌ Component not found for: ${item.component}`);
                    return null;
                }

                const element = item.protectedRoute
                    ? <ProtectedRoute><Component props={item} /></ProtectedRoute>
                    : <Component props={item} />;

                return (
                    <Route
                        key={`shop-${index}`}
                        path={item.path}
                        element={element}
                    />
                );
            })}
            </>
 
            {config.dashboard.active && (
                <Route key='7' path={'/admin/dashboard'} element={ <Dashboard /> } /> 
            )}

            {config.items?.map((item) => {
                return (
                    <>
                    <Route key={ item.type + '1' } path={'/admin/insert-' + item.type} element={ <Item props={ item } /> } />
                    <Route key={ item.type  + '2' } path={'/admin/edit-' + item.type + '/:itemId'} element={ <Item props={ item } /> } />
                    <Route key={ item.type + '3' } path={'/admin/' + item.type} element={ <Items props={ item } /> } /> 
                    {item.import && (
                        <Route key={ item.type + '4' } path={ item.import.route } element={ <Item props={ item } /> } /> 
                    )}
                    </>   
                )
            })}
            </Routes>
        
        </PrimeReactProvider>
        <Footer />
        </ShopContextProvider>
        </WishlistProvider>
        </AuthProvider>
        </Router>
        </>
    )
}

export default App
