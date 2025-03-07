import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CardScreen from './screens/CardScreen';
import SigninScreen from './screens/SigninScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import SignupScreen from './screens/SignupScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import ProfileScreen from './screens/ProfileScreen';
import SearchScreen from './screens/SearchScreen';
import Footer from './components/Footer';
import AboutUs from './screens/AboutUs';
import Home from './screens/Home';
import Fabric from './screens/Fabric';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/product/:slug" element={<ProductScreen />} />
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<HomeScreen />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/fabrics" element={<Fabric />} />
        <Route path="/cart" element={<CardScreen />} />
        <Route path="/signin" element={<SigninScreen />} />
        <Route path="/signup" element={<SignupScreen />} />
        <Route path="/shipping" element={<ShippingAddressScreen />} />
        <Route path="/payment" element={<PaymentMethodScreen />} />
        <Route path="/placeorder" element={<PlaceOrderScreen />} />
        <Route path="/order/:id" element={<OrderScreen />} />
        <Route path="/search" element={<SearchScreen />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfileScreen />
            </ProtectedRoute>
          }
        />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
