import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Shop from './Pages/Shop';
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import LoginSignup from './Pages/LoginSignup';
import Admin from './Pages/Admin';
import Checkout from './Pages/Checkout';
import Profile from './Pages/Profile';
import Footer from './Components/Footer/Footer';
import men_banner from './Components/Assets/men_banner.png'
import women_banner from './Components/Assets/women_banner.png'
import kid_banner from './Components/Assets/kid_banner.png'


function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path = '/' element={<Shop/>}/>
          <Route path = '/mens' element={<ShopCategory banner = {men_banner} category = 'Men'/>}/>
          <Route path = '/womens' element={<ShopCategory banner = {women_banner} category = 'Women'/>}/>
          <Route path = '/kids' element={<ShopCategory banner = {kid_banner} category = 'Kid'/>}/>
          <Route path = "/product" element={<Product/>}>
            <Route path = ':productId' element={<Product/>}/>
          </Route>
          <Route path = "/cart" element={<Cart/>}/>
          <Route path = "/login" element={<LoginSignup/>}/>
          <Route path = "/admin" element={<Admin/>}/>
          <Route path = "/checkout" element={<Checkout/>}/>
          <Route path = "/profile" element={<Profile/>}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
