import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from "react-query"
import { ReactQueryDevtools } from 'react-query/devtools'

import './App.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

import PersistLogin from './components/PersistLogin'
import Categories from './pages/Categories'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Category from './pages/Category'
import Product from './pages/Product'
import RequireAuth from './components/RequireAuth'
import Account from './pages/Account'
import UpdateDetails from './pages/UpdateDetails'
import UpdatePassword from './pages/UpdatePassword'
import RequireAdmin from './components/RequireAdmin'
import AdminHome from './pages/AdminHome'
import AdminListings from './pages/AdminListings'
import AdminNewListing from './pages/AdminNewListing'
import AdminProduct from './pages/AdminProduct'
import Confirmation from './pages/Confirmation'
import ErrorPage from './pages/ErrorPage'
import NotFound from './pages/NotFound'
import Orders from './pages/Orders'
import Order from './pages/Order'
import Layout from './pages/Layout'
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import UpdateCart from './pages/UpdateCart';
import UpdateOrder from './pages/UpdateOrder';
import AdminCategory from './pages/AdminCategory';
import UpdateProduct from './pages/UpdateProduct';

const queryClient = new QueryClient();

function App() {  

  return (
    <div className="bg-slate-100">
    <ToastContainer />
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
        <Route element={<PersistLogin />}> 
          <Route path='/' element={<Categories />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/signup' element={<Signup />}/>
          <Route path='/cat/:id' element={<Category />}/>
          <Route path='/prod/:id' element={<Product />}/>
          <Route path='/error' element={<ErrorPage />}/>
          <Route path='/*' element={<NotFound />}/>
        </Route>
        <Route element={<RequireAuth />}> 
          <Route path='/account' element={<Account />}/>
          <Route path='/updatedetails' element={<UpdateDetails />}/>
          <Route path='/updatepassword' element={<UpdatePassword />}/>
          <Route path='/confirmation' element={<Confirmation />}/>
          <Route path='/orders' element={<Orders />}/>
          <Route path='/cart' element={<Cart />}/>
          <Route path='/order/:id' element={<Order />}/>
          <Route path='/checkout' element={<Checkout />}/>
          <Route path='/updatecart' element={<UpdateCart />}/>
          <Route path='/updateorder' element={<UpdateOrder />}/>
        </Route>
        <Route element={<RequireAdmin />}> 
          <Route path='/adminhome' element={<AdminHome />}/>
          <Route path='/adminlistings' element={<AdminListings />}/>
          <Route path='/adminnewlisting' element={<AdminNewListing />}/>
          <Route path='/admin/product/:id' element={<AdminProduct />}/>
          <Route path='/admin/cat/:id' element={<AdminCategory />}/>
          <Route path='/admin/updateproduct' element={<UpdateProduct />}/>
        </Route>
        </Route>
      </Routes>
    </BrowserRouter>
    <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
    </div>
  )
}

export default App
