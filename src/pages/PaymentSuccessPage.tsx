import React, { useEffect, useState } from 'react';
import { CheckCircle, Home, ArrowRight } from 'lucide-react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface OrderData {
  orderId: string;
  amount: number;
  currency: string;
  timestamp: string;
  email: string;
  items?: OrderItem[];
}

const PaymentSuccessPage: React.FC = () => {
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const orderIdFromUrl = searchParams.get('orderId');

  useEffect(() => {
    if (!orderIdFromUrl) {
      setError('No order ID provided.');
      setIsLoading(false);
      return;
    }

    const fetchOrderData = async () => {
      try {
        setIsLoading(true);
        // Replace with your actual Strapi API endpoint for fetching order by ID
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/orders/${orderIdFromUrl}`);

        if (!res.ok) {
          throw new Error('Failed to fetch order data');
        }

        const data = await res.json();

        // Adapt this depending on your Strapi data shape
        // For example, you might have data.data or data.attributes in Strapi REST
        const order = {
          orderId: data.id || orderIdFromUrl,
          amount: data.total || 0,
          currency: data.currency || 'USD',
          timestamp: data.createdAt || new Date().toISOString(),
          email: data.email || '',
          items: data.items || [], // Adjust if your order has items under a different key
        };

        setOrderData(order);
        setError(null);
      } catch (err: any) {
        console.error(err);
        setError(err.message || 'Error fetching order');
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrderData();
  }, [orderIdFromUrl]);

  const handleContinueShopping = () => {
    navigate('/');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <p className="text-gray-700 text-lg">Loading your order details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
        <p className="text-red-600 text-xl mb-4">Error: {error}</p>
        <button
          onClick={handleContinueShopping}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Back to Home
        </button>
      </div>
    );
  }

  if (!orderData) {
    return null; // or a fallback UI
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-100 flex items-center justify-center p-4">
      <div className="max-w-lg w-full bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Success Header */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-8 text-center text-white">
          <div className="mx-auto w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="w-10 h-10" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Payment Successful!</h1>
          <p className="text-green-100 text-lg">Your order has been confirmed</p>
        </div>

        {/* Order Details */}
        <div className="p-8">
          <div className="bg-gray-50 rounded-2xl p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>

            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-gray-600">Order ID</span>
                <span className="font-mono text-gray-900 font-medium">{orderData.orderId}</span>
              </div>

              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-gray-600">Amount</span>
                <span className="text-xl font-bold text-gray-900">
                  ${orderData.amount.toFixed(2)} {orderData.currency}
                </span>
              </div>

              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-gray-600">Date & Time</span>
                <span className="text-gray-900">{new Date(orderData.timestamp).toLocaleString()}</span>
              </div>

              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600">Email</span>
                <span className="text-gray-900">{orderData.email}</span>
              </div>
            </div>

            {/* Optional: List ordered items */}
            {orderData.items && orderData.items.length > 0 && (
              <>
                <h3 className="text-md font-semibold text-gray-900 mt-6 mb-2">Items</h3>
                <ul className="divide-y divide-gray-200 max-h-48 overflow-auto">
                  {orderData.items.map((item, idx) => (
                    <li key={idx} className="py-2 flex justify-between">
                      <span>{item.name} x {item.quantity}</span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <button
              onClick={handleContinueShopping}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
            >
              <Home className="w-5 h-5" />
              Continue Shopping
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* Support Info */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Need help?{' '}
              <Link to="/contact-us" className="text-green-600 hover:text-green-700 font-medium">
                Contact Support
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
