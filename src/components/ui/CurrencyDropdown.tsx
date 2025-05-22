import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ChevronDown } from 'lucide-react';
import { fetchExchangeRate } from '../../store/slices/currencySlice';
import type { RootState, AppDispatch } from '../../store';

const currencies = [
  { code: 'USD', name: 'U.S. Dollar' },
  { code: 'EUR', name: 'Euro' },
  { code: 'GBP', name: 'British Pound' },
  { code: 'JPY', name: 'Japanese Yen' },
  { code: 'CAD', name: 'Canadian Dollar' },
  { code: 'AUD', name: 'Australian Dollar' },
  { code: 'CHF', name: 'Swiss Franc' },
];

const CurrencyDropdown = () => {
  const dispatch = useDispatch<AppDispatch>();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const selectedCurrency = useSelector((state: RootState) => state.currency.selectedCurrency);

  // Load stored currency on mount
  useEffect(() => {
    const storedCurrency = localStorage.getItem('selectedCurrency');
    if (storedCurrency) {
      dispatch(fetchExchangeRate(storedCurrency));
    }
  }, [dispatch]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCurrencyChange = (currencyCode: string) => {
    localStorage.setItem('selectedCurrency', currencyCode);
    dispatch(fetchExchangeRate(currencyCode));
    setIsOpen(false);
  };

  const selectedCurrencyName = currencies.find(c => c.code === selectedCurrency)?.name || selectedCurrency;

  return (
    <div className="flex items-center text-gray-600">
      <span>Currency:</span>
      <div className="relative ml-1" ref={dropdownRef}>
        <button
          className="flex items-center font-medium text-gray-800 hover:text-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-sm"
          onClick={() => setIsOpen(!isOpen)}
          aria-haspopup="true"
          aria-expanded={isOpen}
        >
          {selectedCurrencyName}
          <ChevronDown 
            size={14} 
            className={`ml-1 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
            aria-hidden="true"
          />
        </button>
        
        {isOpen && (
          <div 
            className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-100 z-50 animate-fadeIn"
            role="menu"
          >
            <div className="py-1">
              {currencies.map((currency) => (
                <button
                  key={currency.code}
                  className={`block w-full text-left px-4 py-2 text-sm ${
                    selectedCurrency === currency.code 
                      ? 'bg-blue-50 text-blue-600' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => handleCurrencyChange(currency.code)}
                  role="menuitem"
                >
                  {currency.name} ({currency.code})
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CurrencyDropdown;
