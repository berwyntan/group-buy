import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from "react-query"
import { ReactQueryDevtools } from 'react-query/devtools'
import { lazy } from 'react'

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
import RequireAdmin from './components/RequireAdmin'
import ErrorPage from './pages/ErrorPage'
import NotFound from './pages/NotFound'
import Layout from './pages/Layout'

const queryClient = new QueryClient();

const Account = lazy(() => import('./pages/Account'))
const UpdateDetails = lazy(() => import('./pages/UpdateDetails'))
const UpdatePassword = lazy(() => import('./pages/UpdatePassword'))
const Confirmation = lazy(() => import('./pages/Confirmation'))
const Orders = lazy(() => import('./pages/Orders'))
const Cart = lazy(() => import('./pages/Cart'))
const Order = lazy(() => import('./pages/Order'))
const Checkout = lazy(() => import('./pages/Checkout'))
const UpdateOrder = lazy(() => import('./pages/UpdateOrder'))

const AdminHome = lazy(() => import('./pages/AdminHome'))
const AdminListings = lazy(() => import('./pages/AdminListings'))
const AdminNewListing = lazy(() => import('./pages/AdminNewListing'))
const AdminProduct = lazy(() => import('./pages/AdminProduct'))
const AdminCategory = lazy(() => import('./pages/AdminCategory'))
const AdminOrders = lazy(() => import('./pages/AdminOrders'))
const AdminUpdateOrder = lazy(() => import('./pages/AdminUpdateOrder'))

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
          <Route path='/updateorder' element={<UpdateOrder />}/>
        </Route>
        <Route element={<RequireAdmin />}> 
          <Route path='/adminhome' element={<AdminHome />}/>
          <Route path='/adminlistings' element={<AdminListings />}/>
          <Route path='/adminnewlisting/:id' element={<AdminNewListing />}/>
          <Route path='/admin/product/:id' element={<AdminProduct />}/>
          <Route path='/admin/cat/:id' element={<AdminCategory />}/>          
          <Route path='/admin/orders/:id' element={<AdminOrders />}/>
          <Route path='/admin/updateorder/:id' element={<AdminUpdateOrder />}/>          
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
