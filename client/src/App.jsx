import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { useParams } from "react-router"
import { AdminNavbar, ShopNavbar } from './components/navbar/navbar'

import { CreateReview } from './shop/create-review'
import { Dashboard } from './admin/dashboard'
import { ViewItems } from './shop/view-items'
import { ViewItem } from './shop/view-item'
import { ShoppingCart } from './shop/shopping-cart'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import { LoginForm } from './shop/login-form'
import { RegisterForm } from './shop/register-form'

import './admin/admin.css'
import './shop/shop.css'

import { PrimeReactProvider, PrimeReactContext } from 'primereact/api'
import "primereact/resources/themes/lara-light-cyan/theme.css"
import { ShopContextProvider } from "./shop/context/shop-context"

import { randomKey } from './utils'

import { shopConfig, config } from './admin/config.js'
import config2 from './shop/config.json' 

import { Item } from './admin/item'
import { Items } from './admin/items'
import { Footer } from './components/footer'

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
  const [isAdmin, setIsAdmin] = useState(false)

  let params = useParams()

  return (
      <>
      <ShopContextProvider>
      <PrimeReactProvider>
      
        <Router>
            {isAdmin && <AdminNavbar />}
              {!isAdmin && <ShopNavbar />}
              <Routes>
                <Route key="1" path="/" element={ <ViewItems /> } />

                <Route key="2" path="/product-reviews/:productId" element={ <ViewItems /> } />
                <Route key="3" path="/review/create-review/:productId" element={ <CreateReview /> } />

                <Route key="login" path="/login" element={ <LoginForm /> } />
                <Route key="register" path="/register" element={ <RegisterForm /> } />

                {shopConfig.items?.map((item) => {
                    return (
                        <>
                            <Route 
                                key={ item.path } 
                                path={ item.path } 
                                element={ item.listType == 'single' ? <ViewItem props={ item } /> : <ViewItems props={ item } />}
                            />
                        </>   
                    )
                })}

                <Route key="6" path="/shopping-cart" element={ <ShoppingCart /> } />
                {config.dashboard.active && (
                    <Route key='7' path={'/admin/dashboard'} element={ <Dashboard /> } /> 
                )}
                {config.items?.map((item) => {
                    // console.log('/admin/' + item.type)
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
         </Router>
       </PrimeReactProvider>
       <Footer />
       </ShopContextProvider>
    </>
  )
}

export default App
