import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, Lock } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { increaseQuantity, decreaseQuantity, removeFromCart } from '../store/slices/cartSlice';
import { useCreateStripeSessionMutation } from '../store/slices/apiSlice';
import { RootState } from '../store';
import { formatPrice } from '../utils/formatPrice';
// import {
//   Elements,
//   PaymentElement,
//   useStripe,
//   useElements,
// } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';

// const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY!);

// const CheckoutFormInline = () => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const dispatch = useDispatch();
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState('');

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!stripe || !elements) return;

//     setLoading(true);

//     const { error, paymentIntent } = await stripe.confirmPayment({
//       elements,
//       confirmParams: {
//         return_url: `${import.meta.env.VITE_CLIENT_URL}/success`,
//       },
//       redirect: 'if_required',
//     });

//     if (error) {
//       setMessage(error.message || 'Payment failed');
//     } else if (paymentIntent?.status === 'succeeded') {
//       dispatch(clearCart());
//       setMessage('✅ Payment successful & order saved!');
//     }

//     setLoading(false);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="mt-6 space-y-4">
//       <PaymentElement />
//       <button
//         type="submit"
//         disabled={!stripe || loading}
//         className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
//       >
//         {loading ? 'Processing...' : 'Pay Now'}
//       </button>
//       {message && <p className="text-sm text-center text-red-500">{message}</p>}
//     </form>
//   );
// };

const CartPage = () => {
  const { items } = useSelector((state: RootState) => state.cart);
  const { exchangeRate, selectedCurrency } = useSelector((state: RootState) => state.currency);
  const [createStripeSession, { isLoading: isSessionLoading  }] = useCreateStripeSessionMutation();

  const dispatch = useDispatch();

  // const [clientSecret, setClientSecret] = useState('');
  // const [showPaymentForm, setShowPaymentForm] = useState(false);

  const fallbackImage =
    'https://images.pexels.com/photos/3760323/pexels-photo-3760323.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';

  const getItemTotal = (price: number, quantity: number) => price * quantity * exchangeRate;
  const cartTotal = items.reduce((total, item) => total + item.price * item.quantity, 0);

  // const handleStripeElementsPayment = async () => {
  //   const payload = {
  //     products: items.map((item) => ({
  //       id: item.id,
  //       unit_price: Math.round(item.price * exchangeRate * 100),
  //       attributes: { quantity: item.quantity },
  //     })),
  //     currency: selectedCurrency.toLowerCase(),
  //   };
  
  // try {
  //   const { clientSecret } = await createStripeSession(payload).unwrap();
  //   if (clientSecret) {
  //     setClientSecret(clientSecret);
  //     setShowPaymentForm(true);
  //   } else {
  //     alert('Payment init failed');
  //   }
  // } catch (err) {
  //   console.error('Stripe session error:', err);
  //   alert('Something went wrong while initializing payment');
  // }
  // };

  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link to="/" className="flex items-center text-gray-600 hover:text-gray-800 mb-4 max-w-max">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Continue Shopping
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <ShoppingBag className="w-8 h-8 mr-3" />
            Shopping Cart ({items.length} {items.length === 1 ? 'item' : 'items'})
          </h1>
        </div>

        <div className="space-y-8">
          {/* Cart Items */}
          <div>
            {items.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <ShoppingBag className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
                <p className="text-gray-500 mb-4">Add some items to get started</p>
                <Link
                  to="/"
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Start Shopping
                </Link>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm">
                {items.map((item, index) => (
                  <div
                    key={item.id}
                    className={`p-6 ${index !== items.length - 1 ? 'border-b border-gray-200' : ''}`}
                  >
                    <div className="flex items-start space-x-4">
                      <img
                        src={item?.featured || fallbackImage}
                        alt={item?.title}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-medium text-gray-900">{item?.title}</h3>
                        <p className="text-lg font-semibold text-gray-900 mt-2">
                          {formatPrice(getItemTotal(item?.price, item?.quantity), exchangeRate, selectedCurrency)}
                        </p>
                      </div>

                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => dispatch(decreaseQuantity(item?.id))}
                          className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-medium">{item?.quantity}</span>
                        <button
                          onClick={() => dispatch(increaseQuantity(item?.id))}
                          className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      <button
                        onClick={() => dispatch(removeFromCart(item?.id))}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Order Summary */}
          {items.length > 0 &&(
          <div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>

              {/* Price Breakdown */}
              <div className="space-y-4 mb-6">
                <div className="border-t pt-4">
                  <div className="flex justify-between text-2xl font-bold text-gray-900">
                    <span>Total</span>
                    <span>{formatPrice(cartTotal, exchangeRate, selectedCurrency)}</span>
                  </div>
                </div>
              </div>

              <Link
                to="/checkout"
                    className={`w-full py-3 px-4 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-colors ${
                    isSessionLoading
                      ? 'bg-blue-300 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  <Lock className="w-4 h-4" />
                  <span>Secure Checkout</span>
                </Link>

              {/* Checkout Button or Payment Element */}
              {/* {!showPaymentForm ? (
                <button
                  onClick={handleStripeElementsPayment}
                  disabled={isSessionLoading}
                  className={`w-full py-3 px-4 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-colors ${
                    isSessionLoading
                      ? 'bg-blue-300 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  <Lock className="w-4 h-4" />
                  <span>{isSessionLoading ? 'Initializing Payment...' : 'Secure Checkout'}</span>
                </button>

              ) : (
                clientSecret && (
                  <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <CheckoutFormInline />
                  </Elements>
                )
              )} */}

              <div className="mt-4 text-center">
                <p className="text-xs text-gray-500">
                  🔒 Your payment information is secure and encrypted
                </p>
              </div>
            </div>
          </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPage;
