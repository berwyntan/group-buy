import { BrowserRouter, Routes, Route } from 'react-router-dom'

import PersistLogin from './components/PersistLogin'
import Categories from './pages/Categories'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Category from './pages/Category'
import Product from './pages/Product'
import RequireAuth from './components/RequireAuth'
import Account from './pages/Account'
import Update from './pages/Update'
import RequireAdmin from './components/RequireAdmin'
import AdminHome from './pages/AdminHome'
import AdminUpdate from './pages/AdminUpdate'
import AdminNewListing from './pages/AdminNewListing'
import AdminProduct from './pages/AdminProduct'

import './App.css'

function App() {
  

  return (
    <div className="bg-slate-100">
    <BrowserRouter>
      <Routes>
        <Route element={<PersistLogin />}> 
          <Route path='/' element={<Categories />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/signup' element={<Signup />}/>
          <Route path='/cat/:id' element={<Category />}/>
          <Route path='/prod/:id' element={<Product />}/>
        </Route>
        <Route element={<RequireAuth />}> 
          <Route path='/account' element={<Account />}/>
          <Route path='/update' element={<Update />}/>
        </Route>
        <Route element={<RequireAdmin />}> 
          <Route path='/adminhome' element={<AdminHome />}/>
          <Route path='/adminupdate' element={<AdminUpdate />}/>
          <Route path='/adminnewlisting' element={<AdminNewListing />}/>
          <Route path='/admin/:id' element={<AdminProduct />}/>
        </Route>
      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App
