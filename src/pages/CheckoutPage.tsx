import React, { useState } from 'react';
import { User, MapPin, CreditCard, ShoppingCart } from 'lucide-react';
import { useUserProfile } from '../hooks/useUserProfile';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { useCreateStripeSessionMutation } from '../store/slices/apiSlice';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { clearCart } from '../store/slices/cartSlice';
import { getCurrencySymbol } from '../utils/currency';
import { Navigate } from 'react-router-dom';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY!);

const CheckoutFormInline = () => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${import.meta.env.VITE_CLIENT_URL}/success`,
      },
      redirect: 'if_required',
    });

    if (error) {
      setMessage(error.message || 'Payment failed');
    } else if (paymentIntent?.status === 'succeeded') {
      dispatch(clearCart());
      setMessage('✅ Payment successful & order saved!');
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      <PaymentElement />
      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
      >
        {loading ? 'Processing...' : 'Pay Now'}
      </button>
      {message && <p className="text-sm text-center text-red-500">{message}</p>}
    </form>
  );
};

const CheckoutPage: React.FC = () => {
  const { items: cartItems } = useSelector((state: RootState) => state.cart);
  const { exchangeRate, selectedCurrency } = useSelector((state: RootState) => state.currency);
  const [createStripeSession, { isLoading }] = useCreateStripeSessionMutation();
  const symbol = getCurrencySymbol(selectedCurrency);

  const { userProfile, loading } = useUserProfile();
  const [useSameAddress, setUseSameAddress] = useState(false);
  const [clientSecret, setClientSecret] = useState('');
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState('stripe');


  const getItemTotal = (price: number, quantity: number) => price * quantity * exchangeRate;
  const subtotal = cartItems.reduce((sum, item) => sum + getItemTotal(item.price, item.quantity), 0);
  const shipping = 0.0;
  const tax = 0.0;
  const total = subtotal + shipping + tax;

  const handleStripeElementsPayment = async () => {
    const payload = {
      products: cartItems.map((item) => ({
        id: item.id,
        title: item.title,
        unit_price: Math.round(item.price * exchangeRate * 100),
        currency: selectedCurrency.toLowerCase(),
        attributes: { quantity: item.quantity },
      })),
      email: userProfile?.email,
      currency: selectedCurrency.toLowerCase(),
    };

    try {
      const { clientSecret } = await createStripeSession(payload).unwrap();
      if (clientSecret) {
        setClientSecret(clientSecret);
        setShowPaymentForm(true);
      } else {
        alert('Payment init failed');
      }
    } catch (err) {
      console.error('Stripe session error:', err);
      alert('Something went wrong while initializing payment');
    }
  };

  if (loading) return <div className="p-10 text-center">Loading user profile...</div>;
  if (!userProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded shadow text-center">
          <h2 className="text-2xl font-bold">Please Log In</h2>
          <p className="text-gray-600 mt-2">You need to be logged in to continue.</p>
          <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded">Go to Login</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <div className="max-w-6xl mx-auto px-4 py-8 grid lg:grid-cols-3 gap-8">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Account Info */}
          <div className="bg-white rounded-lg p-6 border shadow-sm">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <User className="w-5 h-5 mr-2" /> Account Info
            </h2>
            <p><strong>Name:</strong> {userProfile.firstName} {userProfile.lastName}</p>
            <p><strong>Email:</strong> {userProfile.email}</p>
            <p><strong>Phone:</strong> {userProfile.phone_number}</p>
          </div>

          {/* Billing Address */}
          <div className="bg-white p-6 rounded border shadow-sm">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <CreditCard className="w-5 h-5 mr-2" /> Billing Address
            </h2>

            {userProfile.billingAddress?.company && (
                <p>
                  <strong className='text font-medium'>Company : </strong> {userProfile.billingAddress.company}
                </p>
              )}
              <p><strong className='text font-medium'>Street Address : </strong>{userProfile.billingAddress?.street_address}</p>
              <p><strong className='text font-medium'>City : </strong>{userProfile.billingAddress?.city}, <strong className='text font-medium'>State : </strong>{userProfile.billingAddress?.state}</p>
              <p><strong className='text font-medium'>Country : </strong>{userProfile.billingAddress?.country}</p>
              <p><strong className='text font-medium'>Zip : </strong>{userProfile.billingAddress?.zip}</p>
          </div>

          {/* Same address checkbox */}
          <div className="bg-white p-6 rounded border shadow-sm">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={useSameAddress}
                onChange={() => setUseSameAddress(!useSameAddress)}
              />
              <span>Shipping address same as billing</span>
            </label>
          </div>

          {/* Shipping Address */}
          {!useSameAddress && (
            <div className="bg-white p-6 rounded border shadow-sm">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <MapPin className="w-5 h-5 mr-2" /> Shipping Address
              </h2>
              {userProfile.shippingAddress?.company && (
                <p>
                  <strong className='text font-medium'>Company : </strong> {userProfile.shippingAddress.company}
                </p>
              )}
              <p><strong className='text font-medium'>Street Address : </strong>{userProfile.shippingAddress?.street_address}</p>
              <p><strong className='text font-medium'>City : </strong>{userProfile.shippingAddress?.city}, <strong className='text font-medium'>State : </strong>{userProfile.shippingAddress?.state}</p>
              <p><strong className='text font-medium'>Country : </strong>{userProfile.shippingAddress?.country}</p>
              <p><strong className='text font-medium'>Zip : </strong>{userProfile.shippingAddress?.zip}</p>
            </div>
          )}

          {/* Payment Method */}
          <div className="bg-white p-6 rounded border shadow-sm">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <CreditCard className="w-5 h-5 mr-2" /> Payment Method
            </h2>
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="payment"
                  value="stripe"
                  checked={selectedPayment === 'stripe'}
                  onChange={(e) => setSelectedPayment(e.target.value)}
                />
                <span>STRIPE</span>
              </label>
            </div>
          </div>
        </div>

        {/* Right column - Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg p-6 border shadow-sm sticky top-4">
            <h2 className="text-xl font-semibold flex items-center mb-4">
              <ShoppingCart className="w-5 h-5 mr-2" />
              Order Summary
            </h2>

            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between items-center text-sm mb-2">
                <span>{item.title} x {item.quantity}</span>
                <span>{symbol}{(item.price * item.quantity * exchangeRate).toFixed(2)}</span>
              </div>
            ))}

            <div className="border-t mt-4 pt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{symbol}{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{symbol}{shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>{symbol}{tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold text-gray-800 border-t pt-2">
                <span>Total</span>
                <span>{symbol}{total.toFixed(2)}</span>
              </div>
            </div>

            {!showPaymentForm ? (
              <button
                onClick={handleStripeElementsPayment}
                disabled={isLoading}
                className={`mt-6 w-full py-3 px-4 rounded-lg font-semibold flex items-center justify-center transition-colors ${
                  isLoading ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {isLoading ? 'Initializing Payment...' : 'Proceed to Payment'}
              </button>
            ) : (
              clientSecret && (
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                  <CheckoutFormInline />
                </Elements>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
