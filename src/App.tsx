import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import MyAccountPage from './pages/MyAccountPage';
import ProductPage from './pages/ProductPage';
import CategoryPage from './pages/CategoryPage';
import SubCategoryPage from './pages/SubCategoryPage';
import CertificationsPage from './pages/CertificationsPage';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';
import SafetyData from './pages/SafetyData';
import SalesSupport from './pages/SalesSupport';
import ReturnPolicy from './pages/ReturnPolicy';
import NotFoundPage from './pages/NotFoundPage';
import GuestOnlyRoute from './components/hoc/GuestOnlyRoute';
import ProtectedRoute from './components/hoc/ProtectedRoute';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/login" element={<GuestOnlyRoute><LoginPage /></GuestOnlyRoute>} />
              <Route path="/register" element={<GuestOnlyRoute><RegisterPage /></GuestOnlyRoute>} />
              <Route path="/forgot-password" element={<GuestOnlyRoute><ForgotPasswordPage /></GuestOnlyRoute>} />
              <Route path="/my-account" element={<ProtectedRoute><MyAccountPage /></ProtectedRoute>} />
              <Route path="/product/:productId" element={<ProductPage />} />
              <Route path="/:categoryname" element={<CategoryPage />} />
              <Route path="/:categoryname/:subcategoryname" element={<SubCategoryPage />} />
              <Route path="/certifications" element={<CertificationsPage />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/contact-us" element={<ContactUs />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-and-conditions" element={<TermsConditions />} />
              <Route path="/returns-policy" element={<ReturnPolicy />} />
              <Route path="/safety-data" element={<SafetyData />} />
              <Route path="/distributors" element={<SalesSupport />} />

              {/* Catch-all route for 404 Not Found */}
              <Route path="/404" element={<NotFoundPage />} />
              {/* Redirect all other paths to NotFoundPage */}
              {/* This will catch all undefined routes and redirect to NotFoundPage */}
              {/* <Route path="*" element={<Navigate to="/404" />} /> */}
              {/* Uncomment the above line to enable redirection to NotFoundPage */}
              {/* Alternatively, you can use the following line to render NotFoundPage directly */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;