import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, Menu, X } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import Logo from '../ui/Logo';
import CurrencyDropdown from '../ui/CurrencyDropdown';
import CartDropdown from './CartDropdown';
import NavigationMenu from './NavigationMenu';
import { formatPrice } from '../../utils/formatPrice';
import { isAuthenticated } from '../../middlewares/auth';
import { removeSecureCookie } from '../../utils/secureCookie';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartRef = useRef<HTMLDivElement>(null);
  
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const { exchangeRate, selectedCurrency } = useSelector((state: RootState) => state.currency);
  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        setIsCartOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const navigate = useNavigate();

  const handleLogout = () => {
    removeSecureCookie('auth');
    navigate('/login');
  };

  return (
    <header className="bg-white shadow-sm">
      {/* Top bar */}
      <div className="hidden md:block bg-gray-50 border-b border-gray-100">
        <div className="container mx-auto py-2 px-4 flex justify-end items-center text-sm">
          <div className="flex items-center space-x-6">   
            <CurrencyDropdown />
            <div className="flex items-center space-x-4">
              <Link 
                to={ `${isAuthenticated() ? 'my-account' : 'login'}`}
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                My Account
              </Link>
              <span className="text-gray-300">|</span>
              
               {isAuthenticated() ? (
                <button
                  onClick={handleLogout}
                  className="text-gray-600 hover:text-red-600 transition-colors"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/register"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Register or Sign In
                </Link>
              )}
            

            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto py-4 px-4">
        <div className="flex items-center justify-between">
          {/* Mobile menu toggle */}
          <div className="block lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-600 p-1"
              aria-label="Toggle Menu"
            >
              {isMenuOpen
                ? <X size={24} className="transition-transform duration-200 transform hover:rotate-90" />
                : <Menu size={24} />}
            </button>
          </div>

          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <Logo className="h-12 w-12 text-orange-500" />
            <span className="ml-3 text-gray-800 text-lg md:text-xl font-medium group-hover:text-blue-600 transition-colors">
              Open Safety Equipment Ltd
            </span>
          </Link>

          {/* Desktop Search */}
          <div className="hidden md:flex items-center flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-4 py-2.5 pr-10 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
              />
              <button className="absolute right-0 top-0 bottom-0 px-3 text-gray-400 hover:text-blue-600" aria-label="Search">
                <Search size={20} />
              </button>
            </div>
          </div>

          {/* Cart */}
          <div className="relative" ref={cartRef}>
            <button
              onClick={() => setIsCartOpen(!isCartOpen)}
              className="flex items-center space-x-2 py-2 px-3 rounded-lg hover:bg-gray-50 group"
              aria-label="Toggle Cart"
            >
              <div className="relative">
                <ShoppingCart size={22} className="text-gray-700 group-hover:text-blue-600" />
                <span className="absolute -top-2 -right-2 w-5 h-5 text-xs font-medium text-white bg-blue-600 rounded-full flex items-center justify-center">
                  {cartItems.length}
                </span>
              </div>
              <div className="hidden sm:block text-left">
                <span className="text-sm text-gray-500">Cart</span>
                <p className="font-medium text-gray-900">{formatPrice(cartTotal, exchangeRate, selectedCurrency)}</p>
              </div>
            </button>
            {isCartOpen && <CartDropdown items={cartItems} total={cartTotal} />}
          </div>
        </div>

        {/* Mobile Search */}
        {isMenuOpen && (
          <div className="mt-4 md:hidden">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-4 py-2.5 pr-10 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
              />
              <button className="absolute right-0 top-0 bottom-0 px-3 text-gray-400 hover:text-blue-600" aria-label="Search">
                <Search size={20} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Menu */}
      <NavigationMenu isOpen={isMenuOpen} />
    </header>
  );
};

export default Header;
