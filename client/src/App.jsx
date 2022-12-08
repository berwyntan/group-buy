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
import AdminUpdate from './pages/AdminUpdate'
import AdminNewListing from './pages/AdminNewListing'
import AdminProduct from './pages/AdminProduct'
import Confirmation from './pages/Confirmation'
import ErrorPage from './pages/ErrorPage'
import NotFound from './pages/NotFound'
import Orders from './pages/Orders'
import Order from './pages/Order'
import Layout from './pages/Layout'

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
          <Route path='/order/:id' element={<Order />}/>
        </Route>
        <Route element={<RequireAdmin />}> 
          <Route path='/adminhome' element={<AdminHome />}/>
          <Route path='/adminupdate' element={<AdminUpdate />}/>
          <Route path='/adminnewlisting' element={<AdminNewListing />}/>
          <Route path='/admin/:id' element={<AdminProduct />}/>
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
