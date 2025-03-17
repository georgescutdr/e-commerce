import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { useParams } from "react-router"
import { AdminNavbar, ShopNavbar } from './components/navbar/navbar'
import { InsertCategory } from './admin/pages/insert-category'
import { ProductsPage } from './admin/pages/products'
import { InsertProduct } from './admin/pages/insert-product'
import { ProductOptions } from './admin/pages/product-options'
import { InsertProductOption } from './admin/pages/insert-product-option'
import { Categories } from './admin/pages/categories'
import { Brands } from './admin/pages/brands'
import { InsertBrand } from './admin/pages/insert-brand'
import { InsertVoucher } from './admin/pages/insert-voucher'
import { Vouchers } from './admin/pages/vouchers'
import { Promotions } from './admin/pages/promotions'
import { InsertPromotion } from './admin/pages/insert-promotion'
import { AdminHome } from './admin/pages/admin-home'
import { Orders } from './admin/pages/orders'
import { ViewOrder } from './admin/pages/view-order'
import { Home } from './shop/pages/home'
import { Category } from './shop/pages/category'
import { Products } from './shop/pages/products'
import { Product } from './shop/pages/product'
import { CreateReview } from './shop/pages/create-review'
import { ProductReviews } from './shop/pages/product-reviews'
import { ShoppingCart } from './shop/pages/shopping-cart'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import './admin/admin.css'
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api'
import "primereact/resources/themes/lara-light-cyan/theme.css"
import { ShopContextProvider } from "./context/shop-context"

function App() {
  const [isAdmin, setIsAdmin] = useState(true)

  let params = useParams()

  return (
      <>
      <PrimeReactProvider>
        <ShopContextProvider>
        <Router>
          {isAdmin && <AdminNavbar />}
          {!isAdmin && <ShopNavbar />}
             <Routes>
               <Route path="/" element={ <Home /> } />
               <Route path="/admin" element={ <AdminHome /> } />

               <Route path="/shopping-cart" element={ <ShoppingCart /> } />

               <Route path="/admin/product-options/" element={ <ProductOptions /> } />
               <Route path="/admin/insert-product-option" element={ <InsertProductOption /> } />
               <Route path="/admin/edit-option/:optionId" element={ <InsertProductOption /> } />

               <Route path="/product-reviews/:productId" element={ <ProductReviews /> } />
               <Route path="/review/create-review/:productId" element={ <CreateReview /> } />

               <Route path="/admin/insert-category" element={ <InsertCategory /> } />
               <Route path="/admin/edit-category/:categoryId" element={ <InsertCategory /> } />
               <Route path="/admin/categories" element={ <Categories /> } />
               <Route path="/browse/:category" element={ <Category /> } />

               <Route path="/admin/products" element={ <ProductsPage /> } />
               <Route path="/admin/insert-product" element={ <InsertProduct /> } />
               <Route path="/admin/edit-product/:productId" element={ <InsertProduct /> } />

               <Route path="/browse/:category/:subcategory/" element={ <Products /> } />
               <Route path="/browse/:category/:subcategory/:product" element={ <Product /> } />

               <Route path="/admin/brands" element={ <Brands /> } />
               <Route path="/admin/insert-brand" element={ <InsertBrand /> } />
               <Route path="/admin/edit-brand/:brandId" element={ <InsertBrand /> } />

               <Route path="/admin/insert-promotion/" element={ <InsertPromotion /> } />
               <Route path="/admin/edit-promotion/:promotionId" element={ <InsertPromotion /> } />
               <Route path="/admin/promotions" element={ <Promotions /> } />

               <Route path="/admin/insert-voucher/" element={ <InsertVoucher /> } />
               <Route path="/admin/edit-voucher/:voucherId" element={ <InsertVoucher /> } />
               <Route path="/admin/vouchers" element={ <Vouchers /> } />

               <Route path="/admin/orders" element={ <Orders /> } />
               <Route path="/admin/view-order/:orderId" element={ <ViewOrder /> } />
             </Routes>
         </Router>
         </ShopContextProvider>
       </PrimeReactProvider>
    </>
  )
}

export default App
