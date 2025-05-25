import React from 'react';
import { useForm } from 'react-hook-form';

type CheckoutFormData = {
  fullName: string;
  email: string;
  address: string;
  city: string;
  zip: string;
  country: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
};

const CheckoutPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>();

  const onSubmit = (data: CheckoutFormData) => {
    console.log('Checkout data:', data);
    alert('Order placed successfully!');
  };

  const cartItems = [
    { id: 1, name: 'Product A', quantity: 2, price: 40 },
    { id: 2, name: 'Product B', quantity: 1, price: 25 },
  ];

  const totalPrice = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);

  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Checkout Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <h2 className="text-2xl font-semibold">Shipping & Billing</h2>

        <div>
          <label className="block font-medium">Full Name</label>
          <input
            {...register('fullName', { required: true })}
            className="w-full border p-2 rounded"
          />
          {errors.fullName && <p className="text-red-500 text-sm">Full name is required</p>}
        </div>

        <div>
          <label className="block font-medium">Email</label>
          <input
            type="email"
            {...register('email', { required: true })}
            className="w-full border p-2 rounded"
          />
          {errors.email && <p className="text-red-500 text-sm">Email is required</p>}
        </div>

        <div>
          <label className="block font-medium">Address</label>
          <input
            {...register('address', { required: true })}
            className="w-full border p-2 rounded"
          />
          {errors.address && <p className="text-red-500 text-sm">Address is required</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium">City</label>
            <input
              {...register('city', { required: true })}
              className="w-full border p-2 rounded"
            />
            {errors.city && <p className="text-red-500 text-sm">City is required</p>}
          </div>
          <div>
            <label className="block font-medium">ZIP</label>
            <input
              {...register('zip', { required: true })}
              className="w-full border p-2 rounded"
            />
            {errors.zip && <p className="text-red-500 text-sm">ZIP code is required</p>}
          </div>
        </div>

        <div>
          <label className="block font-medium">Country</label>
          <input
            {...register('country', { required: true })}
            className="w-full border p-2 rounded"
          />
          {errors.country && <p className="text-red-500 text-sm">Country is required</p>}
        </div>

        <h2 className="text-2xl font-semibold mt-8">Payment Info</h2>

        <div>
          <label className="block font-medium">Card Number</label>
          <input
            {...register('cardNumber', { required: true })}
            className="w-full border p-2 rounded"
          />
          {errors.cardNumber && <p className="text-red-500 text-sm">Card number is required</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium">Expiry Date</label>
            <input
              type="text"
              placeholder="MM/YY"
              {...register('expiry', { required: true })}
              className="w-full border p-2 rounded"
            />
            {errors.expiry && <p className="text-red-500 text-sm">Expiry date is required</p>}
          </div>
          <div>
            <label className="block font-medium">CVV</label>
            <input
              type="text"
              {...register('cvv', { required: true })}
              className="w-full border p-2 rounded"
            />
            {errors.cvv && <p className="text-red-500 text-sm">CVV is required</p>}
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
        >
          Place Order
        </button>
      </form>

      {/* Order Summary */}
      <div className="bg-gray-50 p-6 rounded shadow-sm">
        <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
        <ul className="divide-y divide-gray-200">
          {cartItems.map((item) => (
            <li key={item.id} className="py-4 flex justify-between">
              <span>
                {item.name} × {item.quantity}
              </span>
              <span>${item.price * item.quantity}</span>
            </li>
          ))}
        </ul>
        <div className="flex justify-between mt-4 font-semibold">
          <span>Total</span>
          <span>${totalPrice}</span>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
