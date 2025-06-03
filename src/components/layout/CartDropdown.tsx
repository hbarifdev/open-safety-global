import { X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { increaseQuantity, decreaseQuantity, removeFromCart } from '../../store/slices/cartSlice';
import { RootState } from '../../store';
import { formatPrice } from '../../utils/formatPrice';


interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  featured: string;
}

interface CartDropdownProps {
  items: CartItem[];
  total: number;
}

const CartDropdown: React.FC<CartDropdownProps> = ({ items, total }) => {
    
  const { exchangeRate, selectedCurrency } = useSelector((state: RootState) => state.currency);

  const dispatch = useDispatch();

  const handleIncreaseQuantity = (id: string) => {
    dispatch(increaseQuantity(id));
  };

  const handleDecreaseQuantity = (id: string) => {
    dispatch(decreaseQuantity(id));
  };

  const handleRemoveItem = (id: string) => {
    dispatch(removeFromCart(id));

  };

  return (
    <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-lg shadow-lg border border-gray-100 z-50 overflow-hidden transform origin-top-right transition-all duration-200 ease-out">
      <div className="p-4 border-b border-gray-100">
        <h3 className="font-medium text-gray-900">Shopping Cart</h3>
      </div>

      {items.length > 0 ? (
        <>
          <div className="max-h-80 overflow-y-auto p-4">
            {items.map((item) => (
              <div key={item.id} className="flex items-center py-3 border-b border-gray-100 last:border-0">
                <div className="h-16 w-16 flex-shrink-0 rounded-md border border-gray-200 overflow-hidden">
                  <img 
                    src={item.featured} 
                    alt={item.title} 
                    className="h-full w-full object-cover object-center" 
                  />
                </div>
                <div className="ml-4 flex-1">
                  <h4 className="text-sm font-medium text-gray-900 line-clamp-1">{item.title}</h4>
                  <div className="mt-1 flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                      <span>{item.quantity} × {formatPrice(item.price * item.quantity, exchangeRate, selectedCurrency)}</span>
                    </div>
                    <div className="flex items-center">
                      <button
                        onClick={() => handleDecreaseQuantity(item.id)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        -
                      </button>
                      <button
                        onClick={() => handleIncreaseQuantity(item.id)}
                        className="text-gray-400 hover:text-gray-600 mx-2"
                      >
                        +
                      </button>
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-gray-50">
            <div className="flex justify-between mb-3">
              <span className="text-sm text-gray-600">Subtotal</span>
              <span className="text-sm font-medium text-gray-900">{formatPrice(total, exchangeRate, selectedCurrency)}
</span>
            </div>
            <div className="flex justify-between mb-4">
              <span className="text-sm text-gray-600">Shipping</span>
              <span className="text-sm font-medium text-gray-900">{formatPrice(0, exchangeRate, selectedCurrency)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-base font-medium text-gray-900">Total</span>
              <span className="text-base font-medium text-blue-600">{formatPrice(total, exchangeRate, selectedCurrency)}
</span>
            </div>
          </div>
        </>
      ) : (
        <div className="p-6 text-center">
          <p className="text-gray-600 mb-4">No items in your cart</p>
          <div className="h-px bg-gray-200 mb-4"></div>
          <div className="text-gray-600 mb-2">
            <span className="font-medium">Shipping:</span> {formatPrice(0, exchangeRate, selectedCurrency)}
          </div>
          <div className="text-blue-600 font-medium mb-6">
            <span>Total:</span> {formatPrice(0, exchangeRate, selectedCurrency)}
          </div>
        </div>
      )}

      <div className="p-4 border-t border-gray-100 flex flex-col space-y-2">
        <Link 
          to="/cart" 
          className="w-full py-2.5 px-4 bg-white border border-gray-300 rounded-lg text-gray-800 font-medium text-center hover:bg-gray-50 transition-colors"
        >
          VIEW CART
        </Link>
        <Link 
          to="/checkout" 
          className="w-full py-2.5 px-4 bg-blue-600 text-white font-medium rounded-lg text-center hover:bg-blue-700 transition-colors"
        >
          CHECKOUT
        </Link>
      </div>
    </div>
  );
};

export default CartDropdown;
