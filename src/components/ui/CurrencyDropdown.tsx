import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

const CurrencyDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState('U.S. Dollar');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currencies = [
    { code: 'USD', name: 'U.S. Dollar' },
    { code: 'EUR', name: 'Euro' },
    { code: 'GBP', name: 'British Pound' },
    { code: 'JPY', name: 'Japanese Yen' },
    { code: 'CAD', name: 'Canadian Dollar' },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCurrencyChange = (currencyName: string) => {
    setSelectedCurrency(currencyName);
    setIsOpen(false);
    // Add your currency change logic here (e.g., context update, API call)
  };

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
            {selectedCurrency}
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
                    selectedCurrency === currency.name 
                        ? 'bg-blue-50 text-blue-600' 
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                    onClick={() => handleCurrencyChange(currency.name)}
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