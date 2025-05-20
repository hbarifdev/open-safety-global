import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { increaseQuantity, decreaseQuantity, removeFromCart } from '../store/slices/cartSlice';
import { Trash2 } from 'lucide-react';

const CartPage = () => {
  const { items, totalAmount } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  const fallbackImage = 'https://images.pexels.com/photos/3760323/pexels-photo-3760323.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';


  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold mb-8">Shopping Cart</h1>

      {items.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-6">
            {items.map(item => (
              <div key={item.id} className="flex items-center justify-between border-b pb-4">
                <div className="flex items-center">
                  <img src={item.image.startsWith('http') ? item.image : fallbackImage} alt={item.name} className="h-16 w-16 rounded object-cover" />
                  <div className="ml-4">
                    <h3 className="text-lg font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <button onClick={() => dispatch(decreaseQuantity(item.id))} className="px-2 py-1 border rounded">-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => dispatch(increaseQuantity(item.id))} className="px-2 py-1 border rounded">+</button>
                  <button onClick={() => dispatch(removeFromCart(item.id))} className="text-red-500">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-between items-center">
            <h2 className="text-xl font-semibold">Total:</h2>
            <span className="text-xl font-bold text-blue-600">${totalAmount.toFixed(2)}</span>
          </div>

          <div className="mt-6">
            <a href="/checkout" className="inline-block px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
              Proceed to Checkout
            </a>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
