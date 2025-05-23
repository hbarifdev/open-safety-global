import React, { useState } from 'react';
import { User, Package, MapPin, CreditCard, Edit, Eye, Truck, X, ArrowLeft, Calendar, DollarSign } from 'lucide-react';

interface OrderItem {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  size?: string;
  color?: string;
}

interface Order {
  id: string;
  date: string;
  status: 'delivered' | 'processing' | 'shipped' | 'cancelled';
  total: number;
  items: OrderItem[];
  shippingAddress: {
    name: string;
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  trackingNumber?: string;
}

interface Address {
  name: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
}

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  joinDate: string;
}

const MyAccountPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [tempAddress, setTempAddress] = useState<Address>({} as Address);

  // Mock data
  const [userProfile, setUserProfile] = useState<UserProfile>({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    joinDate: 'January 2023'
  });

  const [address, setAddress] = useState<Address>({
    name: 'John Doe',
    street: '123 Main Street',
    city: 'New York',
    state: 'NY',
    zip: '10001',
    phone: '+1 (555) 123-4567'
  });

  const orders: Order[] = [
    {
      id: '#ORD-001',
      date: '2024-05-20',
      status: 'delivered',
      total: 149.99,
      trackingNumber: 'TRK123456789',
      items: [
        {
          id: '1',
          name: 'Wireless Bluetooth Headphones',
          image: '/api/placeholder/80/80',
          price: 89.99,
          quantity: 1,
          color: 'Black'
        },
        {
          id: '2',
          name: 'USB-C Charging Cable',
          image: '/api/placeholder/80/80',
          price: 19.99,
          quantity: 2
        },
        {
          id: '3',
          name: 'Phone Case',
          image: '/api/placeholder/80/80',
          price: 39.99,
          quantity: 1,
          color: 'Blue'
        }
      ],
      shippingAddress: {
        name: 'John Doe',
        street: '123 Main Street',
        city: 'New York',
        state: 'NY',
        zip: '10001'
      }
    },
    {
      id: '#ORD-002',
      date: '2024-05-15',
      status: 'shipped',
      total: 89.50,
      trackingNumber: 'TRK987654321',
      items: [
        {
          id: '4',
          name: 'Laptop Stand',
          image: '/api/placeholder/80/80',
          price: 49.99,
          quantity: 1
        },
        {
          id: '5',
          name: 'Wireless Mouse',
          image: '/api/placeholder/80/80',
          price: 39.51,
          quantity: 1,
          color: 'Silver'
        }
      ],
      shippingAddress: {
        name: 'John Doe',
        street: '123 Main Street',
        city: 'New York',
        state: 'NY',
        zip: '10001'
      }
    },
    {
      id: '#ORD-003',
      date: '2024-05-10',
      status: 'processing',
      total: 299.99,
      items: [
        {
          id: '6',
          name: 'Smart Watch',
          image: '/api/placeholder/80/80',
          price: 299.99,
          quantity: 1,
          size: '42mm',
          color: 'Space Gray'
        }
      ],
      shippingAddress: {
        name: 'John Doe',
        street: '123 Main Street',
        city: 'New York',
        state: 'NY',
        zip: '10001'
      }
    }
  ];

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'delivered': return 'text-green-600 bg-green-100';
      case 'shipped': return 'text-blue-600 bg-blue-100';
      case 'processing': return 'text-yellow-600 bg-yellow-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'delivered': return <Package className="w-4 h-4" />;
      case 'shipped': return <Truck className="w-4 h-4" />;
      case 'processing': return <div className="w-4 h-4 border-2 border-yellow-600 border-t-transparent rounded-full animate-spin" />;
      default: return <Package className="w-4 h-4" />;
    }
  };

  const handleProfileSave = () => {
    setIsEditing(false);
  };

  const handleOrderClick = (order: Order) => {
    setSelectedOrder(order);
  };

  const handleAddressEdit = () => {
    setTempAddress({ ...address });
    setIsAddressModalOpen(true);
  };

  const handleAddressSave = () => {
    setAddress({ ...tempAddress });
    setIsAddressModalOpen(false);
  };

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'orders', name: 'Orders', icon: Package },
    { id: 'addresses', name: 'Address', icon: MapPin },
    // { id: 'payment', name: 'Payment', icon: CreditCard }
  ];

  // If viewing order details
  if (selectedOrder) {
    return (
      <div className="bg-gray-50">
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4 py-6">
              <button
                onClick={() => setSelectedOrder(null)}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Orders</span>
              </button>
              <div className="h-6 w-px bg-gray-300" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Order Details</h1>
                <p className="text-gray-600">{selectedOrder.id}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Order Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Items</h2>
                <div className="space-y-4">
                  {selectedOrder.items.map((item) => (
                    <div key={item.id} className="flex gap-4 p-4 border border-gray-200 rounded-lg">
                      <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                        <Package className="w-8 h-8 text-gray-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{item.name}</h3>
                        <div className="text-sm text-gray-600 mt-1">
                          {item.color && <span>Color: {item.color}</span>}
                          {item.size && <span className="ml-4">Size: {item.size}</span>}
                          <span className="ml-4">Qty: {item.quantity}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">${item.price.toFixed(2)}</p>
                        {item.quantity > 1 && (
                          <p className="text-sm text-gray-600">${(item.price * item.quantity).toFixed(2)} total</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              {/* Status Card */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Status</h3>
                <div className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium w-fit ${getStatusColor(selectedOrder.status)}`}>
                  {getStatusIcon(selectedOrder.status)}
                  <span className="capitalize">{selectedOrder.status}</span>
                </div>
                {selectedOrder.trackingNumber && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-600">Tracking Number</p>
                    <p className="font-mono text-sm font-medium text-gray-900">{selectedOrder.trackingNumber}</p>
                  </div>
                )}
              </div>

              {/* Order Summary */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">Ordered on {selectedOrder.date}</span>
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t">
                    <span className="font-semibold text-gray-900">Total</span>
                    <span className="font-semibold text-lg text-gray-900">${selectedOrder.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Shipping Address</h3>
                <div className="text-gray-700 space-y-1">
                  <p className="font-medium">{selectedOrder.shippingAddress.name}</p>
                  <p>{selectedOrder.shippingAddress.street}</p>
                  <p>{selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} {selectedOrder.shippingAddress.zip}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Account</h1>
              <p className="text-gray-600 mt-1">Manage your account settings and preferences</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center gap-3 mb-6 pb-6 border-b">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {userProfile.firstName[0]}{userProfile.lastName[0]}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{userProfile.firstName} {userProfile.lastName}</h3>
                  <p className="text-sm text-gray-600">Member since {userProfile.joinDate}</p>
                </div>
              </div>
              
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                        activeTab === tab.id
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{tab.name}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-sm border">
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold text-gray-900">Profile Information</h2>
                    <button
                      onClick={() => setIsEditing(!isEditing)}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                      {isEditing ? 'Cancel' : 'Edit Profile'}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={userProfile.firstName}
                          onChange={(e) => setUserProfile({...userProfile, firstName: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      ) : (
                        <p className="text-gray-900 py-2">{userProfile.firstName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={userProfile.lastName}
                          onChange={(e) => setUserProfile({...userProfile, lastName: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      ) : (
                        <p className="text-gray-900 py-2">{userProfile.lastName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      {isEditing ? (
                        <input
                          type="email"
                          value={userProfile.email}
                          onChange={(e) => setUserProfile({...userProfile, email: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      ) : (
                        <p className="text-gray-900 py-2">{userProfile.email}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                      {isEditing ? (
                        <input
                          type="tel"
                          value={userProfile.phone}
                          onChange={(e) => setUserProfile({...userProfile, phone: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      ) : (
                        <p className="text-gray-900 py-2">{userProfile.phone}</p>
                      )}
                    </div>
                  </div>

                  {isEditing && (
                    <div className="mt-6 flex gap-3">
                      <button
                        onClick={handleProfileSave}
                        className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        Save Changes
                      </button>
                      <button
                        onClick={() => setIsEditing(false)}
                        className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Orders Tab */}
              {activeTab === 'orders' && (
                <div className="p-6">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-6">Order History</h2>
                  
                  {/* <div className="space-y-4">
                    {orders.map((order) => (
                      <div key={order.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                          <div className="flex items-center gap-4">
                            <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                              {getStatusIcon(order.status)}
                              <span className="capitalize">{order.status}</span>
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900">{order.id}</p>
                              <p className="text-sm text-gray-600">{order.date} • {order.items.length} items</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-4">
                            <p className="font-semibold text-lg text-gray-900">${order.total.toFixed(2)}</p>
                            <button
                              onClick={() => handleOrderClick(order)}
                              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                              <Eye className="w-4 h-4" />
                              View Details
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div> */}
                <p className="text-md text-gray-600">No Orders Found.</p>
                </div>
              )}

              {/* Address Tab */}
              {activeTab === 'addresses' && (
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold text-gray-900">Shipping Address</h2>
                    <button
                      onClick={handleAddressEdit}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                      Edit Address
                    </button>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-6 max-w-md">
                    <div className="text-gray-700 space-y-2">
                      <p className="font-semibold text-gray-900">{address.name}</p>
                      <p>{address.street}</p>
                      <p>{address.city}, {address.state} {address.zip}</p>
                      <p>{address.phone}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Payment Tab */}
              {/* {activeTab === 'payment' && (
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold text-gray-900">Payment Methods</h2>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      Add Payment Method
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div className="border border-gray-200 rounded-lg p-4 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded flex items-center justify-center text-white text-xs font-bold">
                          VISA
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">•••• •••• •••• 4242</p>
                          <p className="text-sm text-gray-600">Expires 12/26</p>
                        </div>
                      </div>
                      <button className="text-red-600 hover:text-red-800">Remove</button>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-8 bg-gradient-to-r from-red-600 to-orange-600 rounded flex items-center justify-center text-white text-xs font-bold">
                          MC
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">•••• •••• •••• 8888</p>
                          <p className="text-sm text-gray-600">Expires 08/27</p>
                        </div>
                      </div>
                      <button className="text-red-600 hover:text-red-800">Remove</button>
                    </div>
                  </div>
                </div>
              )} */}
            </div>
          </div>
        </div>
      </div>

      {/* Address Edit Modal */}
      {isAddressModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-screen overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h3 className="text-xl font-semibold text-gray-900">Edit Address</h3>
              <button
                onClick={() => setIsAddressModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  value={tempAddress.name || ''}
                  onChange={(e) => setTempAddress({...tempAddress, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Street Address</label>
                <input
                  type="text"
                  value={tempAddress.street || ''}
                  onChange={(e) => setTempAddress({...tempAddress, street: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                  <input
                    type="text"
                    value={tempAddress.city || ''}
                    onChange={(e) => setTempAddress({...tempAddress, city: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                  <input
                    type="text"
                    value={tempAddress.state || ''}
                    onChange={(e) => setTempAddress({...tempAddress, state: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code</label>
                <input
                  type="text"
                  value={tempAddress.zip || ''}
                  onChange={(e) => setTempAddress({...tempAddress, zip: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  value={tempAddress.phone || ''}
                  onChange={(e) => setTempAddress({...tempAddress, phone: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex gap-3 p-6 border-t">
              <button
                onClick={handleAddressSave}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Save Changes
              </button>
              <button
                onClick={() => setIsAddressModalOpen(false)}
                className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAccountPage;