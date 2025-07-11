import { useState, useEffect } from 'react';
import { User, Package, Edit, MapIcon } from 'lucide-react';
import { getSecureCookie } from '../utils/secureCookie';
import {
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
  useGetUserOrdersQuery,
} from '../store/slices/apiSlice';

interface Address {
  id?: number;
  name: string;
  street_address: string;
  city: string;
  zip: string;
  country: string;
  company: string;
  state: string;
  [key: string]: string | number | undefined;
}

interface UserProfile {
  id: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone_number?: string;
  company?: string;
  createdAt?: string;
  Address?: Address[];
  [key: string]: any;
}

const MyAccountPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const auth = getSecureCookie('auth');
  const jwt = auth?.jwt;

  const { data: userdata, isLoading: loading, refetch } = useGetUserProfileQuery(jwt, {
    skip: !jwt,
  });

  const { data: orders, isLoading: ordersLoading } = useGetUserOrdersQuery(jwt, {
    skip: !jwt,
  });

  const [updateUserProfile] = useUpdateUserProfileMutation();

  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [billingForm, setBillingForm] = useState<Address>({
    name: 'Billing Address',
    street_address: '',
    city: '',
    zip: '',
    state: '',
    country: '',
    company: '',
  });

  const [shippingForm, setShippingForm] = useState<Address>({
    name: 'Shipping Address',
    street_address: '',
    city: '',
    zip: '',
    state: '',
    country: '',
    company: '',
  });

  const [isAddressEditing, setIsAddressEditing] = useState(false);
  const handleAddressSave = async () => {
    if (!jwt) return;

    try {
      await updateUserProfile({
        jwt,
        id: userProfile?.id,
        payload: {
          Address: [...(billingForm ? [billingForm] : []), ...(shippingForm ? [shippingForm] : [])],
        },
      }).unwrap();

      await refetch();
      setIsAddressEditing(false);
    } catch (error) {
      console.error('Address update failed:', error);
    }
  };

  useEffect(() => {
    if (userdata) {
      const addressList = userdata.Address || [];

      const billing = addressList.find((a: any) => a.id === 1);
      const shipping = addressList.find((a: any) => a.id === 2);

      setUserProfile({
        id: userdata.id,
        firstName: userdata.firstname || 'N/A',
        lastName: userdata.surname || 'N/A',
        email: userdata.email,
        phone_number: userdata.phone_number || '',
        createdAt: new Date(userdata.createdAt).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
        Address: addressList,
      });

      if (billing) {
        setBillingForm({ ...billing });
      }

      if (shipping) {
        setShippingForm({ ...shipping });
      }
    }
  }, [userdata]);

  const handleProfileSave = async () => {
    if (!userProfile || !jwt || !userProfile.id) return;
    setIsSaving(true);

    try {
      await updateUserProfile({
        jwt,
        id: userProfile.id,
        payload: {
          firstname: userProfile.firstName,
          surname: userProfile.lastName,
          phone_number: userProfile.phone_number,
        },
      }).unwrap();

      await refetch();
      setIsEditing(false);
    } catch (error) {
      console.error('Update failed:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'orders', name: 'Orders', icon: Package },
    { id: 'address', name: 'Address', icon: MapIcon },
  ];

  if (loading) {
    return <div className="p-10 text-center">Loading profile...</div>;
  }

  if (!userProfile) {
    return <div className="p-10 text-center text-red-600">Profile not found</div>;
  }

  return (
    <div className="bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">My Account</h1>
          <p className="text-gray-600 mt-1">Manage your account settings and preferences</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <aside className="lg:w-64 flex-shrink-0">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center gap-3 mb-6 pb-6 border-b">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                {userProfile.firstName?.[0]}
                {userProfile.lastName?.[0]}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">
                  {userProfile.firstName} {userProfile.lastName}
                </h3>
                <p className="text-sm text-gray-600">Member since {userProfile.createdAt}</p>
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
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <>
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
                  {[{ label: 'First Name', key: 'firstName' }, { label: 'Last Name', key: 'lastName' }, { label: 'Email', key: 'email', type: 'email' }, { label: 'Phone', key: 'phone_number', type: 'tel' }].map(
                    ({ label, key, type = 'text' }) => (
                      <div key={key}>
                        <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
                        {isEditing ? (
                          <input
                            type={type}
                            value={userProfile[key] || ''}
                            onChange={(e) => setUserProfile({ ...userProfile, [key]: e.target.value })}
                            disabled={key === 'email'}
                            className={`w-full px-3 py-2 border rounded-lg ${
                              key === 'email'
                                ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                                : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                            }`}
                          />
                        ) : (
                          <p className="text-gray-900 py-2">{userProfile[key]}</p>
                        )}
                      </div>
                    )
                  )}
                </div>

                {isEditing && (
                  <div className="mt-6 flex gap-3">
                    <button
                      onClick={handleProfileSave}
                      disabled={isSaving}
                      className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {isSaving ? 'Saving...' : 'Save Changes'}
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </>
            )}

            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Order History</h2>
                {ordersLoading ? (
                  <p className="text-gray-600">Loading orders...</p>
                ) : orders?.data?.length ? (
                  <ul className="space-y-4">
                    {orders.data.map((order: any) => (
                      <li key={order.id} className="border p-4 rounded-lg space-y-2">
                        <p className="font-medium text-lg text-gray-900">Order ID: {order.documentId}</p>
                        <p className="font-medium text-gray-700">Payment ID: {order.payment_id}</p>
                        <p className="text-sm text-gray-500">Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                        <p className="text-sm text-gray-500">Total: {order.amount} {order.currency}</p>
                        <p className="text-sm text-gray-500">Status: {order.payment_status}</p>
                        <p className="text-sm text-gray-500">Payment Method: {order.payment_method}</p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-600">No orders found.</p>
                )}
              </div>
            )}

            {/* Address Tab */}
            {/* {activeTab === 'address' && (
              <div className="p-6 space-y-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Addresses</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[{ title: 'Billing Address', form: billingForm, setForm: setBillingForm }, { title: 'Shipping Address', form: shippingForm, setForm: setShippingForm }].map(
                    ({ title, form, setForm }) => (
                      <div key={title}>
                        <h3 className="text-lg font-semibold mb-2">{title}</h3>
                        {['street_address', 'city', 'zip', 'state', 'country', 'company'].map((field) => (
                          <div key={field} className="mb-3">
                            <label className="block text-sm text-gray-700 capitalize mb-1">{field.replace('_', ' ')}</label>
                            <input
                              readOnly={!isEditing}
                              type="text"
                              className={`w-full ${ isEditing? 'border': '' } px-3 py-2 rounded`}
                              disabled={!isEditing}
                              value={form[field] || ''}
                              onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                            />
                          </div>
                        ))}
                      </div>
                    )
                  )}
                </div>
              </div>
            )} */}

            {activeTab === 'address' && (
              <div className="p-6 space-y-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-semibold text-gray-900">Addresses</h2>
                  <button
                    onClick={() => setIsAddressEditing(!isAddressEditing)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                    {isAddressEditing ? 'Cancel' : 'Edit Address'}
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[{ title: 'Billing Address', form: billingForm, setForm: setBillingForm },
                    { title: 'Shipping Address', form: shippingForm, setForm: setShippingForm }]
                    .map(({ title, form, setForm }) => (
                    <div key={title}>
                      <h3 className="text-lg font-semibold mb-2">{title}</h3>
                      {['street_address', 'city', 'zip', 'state', 'country', 'company'].map((field) => (
                        <div key={field} className="mb-3">
                          <label className="block text-sm text-gray-700 capitalize mb-1">{field.replace('_', ' ')}</label>
                          <input
                            type="text"
                            className={`w-full px-3 py-2 rounded ${isAddressEditing ? 'border border-gray-300' : 'bg-gray-100 text-gray-500'}`}
                            value={form[field] || ''}
                            onChange={(e) => {
                              if (!isAddressEditing) return;
                              setForm({ ...form, [field]: e.target.value });
                            }}
                            readOnly={!isAddressEditing}
                          />
                        </div>
                      ))}
                    </div>
                  ))}
                </div>

                {isAddressEditing && (
                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={handleAddressSave}
                      className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Save Address
                    </button>
                    <button
                      onClick={() => setIsAddressEditing(false)}
                      className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            )}

          </div>
        </main>
      </div>
    </div>
  );
};

export default MyAccountPage;
