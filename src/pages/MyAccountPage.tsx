import { useState, useEffect } from 'react';
import { User, Package, MapPin, Edit } from 'lucide-react';
import { getSecureCookie } from '../utils/secureCookie';

interface UserProfile {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone_number?: string;
  company?: string;
  address?: string;
  city?: string;
  country?: string;
  postcode?: string;
  createdAt?: string;
  [key: string]: string | undefined;
}


const MyAccountPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);


  const auth = getSecureCookie('auth');
  const jwt = auth?.jwt;

  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const auth = getSecureCookie('auth');
    const jwt = auth?.jwt;

    if (!jwt) return;

    const fetchUserProfile = async () => {
      try {
        const response = await fetch('https://lovable-warmth-ed47be2d92.strapiapp.com/api/users/me', {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });

        if (!response.ok) throw new Error('Failed to fetch user profile');

        const data = await response.json();
        if (!data) throw new Error('No user profile data found');
        
        setUserProfile({
          id: data.id,
          firstName: data.firstname || 'N/A',
          lastName: data.surname || 'N/A',
          email: data.email,
          phone_number: data.phone_number || '',
          company: data.company || '',
          address: data.address || '',
          city: data.city || '',
          country: data.country || '',
          postcode: data.postcode || '',
          createdAt: new Date(data.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }),

        });

        console.log('User Profile:', userProfile);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, [jwt]);

 
  const handleProfileSave = async () => {
  if (!userProfile || !jwt) return;
  setIsSaving(true);

  try {
    const response = await fetch(`https://lovable-warmth-ed47be2d92.strapiapp.com/api/users/${userProfile.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({
        firstname: userProfile.firstName,
        surname: userProfile.lastName,
        phone_number: userProfile.phone_number,
        company: userProfile.company,
        address: userProfile.address,
        city: userProfile.city,
        country: userProfile.country,
        postcode: userProfile.postcode,
      }),
    });

    if (!response.ok) throw new Error('Failed to update profile');

    const updatedUser = await response.json();

    console.log('Profile updated:', updatedUser);
    setIsEditing(false);
  } catch (error) {
    console.error('Error updating profile:', error);
  } finally {
    setIsSaving(false);
  }
};




  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'orders', name: 'Orders', icon: Package },
  ];

 
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
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold aspect-square">
                  {userProfile?.firstName[0]}{userProfile?.lastName[0]}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{userProfile?.firstName} {userProfile?.lastName}</h3>
                  <p className="text-sm text-gray-600">Member since {userProfile?.createdAt}</p>
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
                    {[
                      { label: 'First Name', key: 'firstName' },
                      { label: 'Last Name', key: 'lastName' },
                      { label: 'Email', key: 'email', type: 'email' },
                      { label: 'Phone', key: 'phone_number', type: 'tel' },
                      { label: 'Company', key: 'company' },
                      { label: 'Address', key: 'address' },
                      { label: 'City', key: 'city' },
                      { label: 'Country', key: 'country' },
                      { label: 'Postcode', key: 'postcode' },
                    ].map(({ label, key, type = 'text' }) => (
                      <div key={key}>
                        <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
                        {isEditing ? (
                          <input
                            type={type}
                            value={userProfile?.[key] || ''}
                            onChange={(e) => setUserProfile({ ...userProfile, [key]: e.target.value })}
                            disabled={key === 'email'}
                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:border-transparent ${key === 'email' ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : 'border-gray-300 focus:ring-blue-500'}`}
                          />
                        ) : (
                          <p className="text-gray-900 py-2">{userProfile?.[key]}</p>
                        )}
                      </div>
                    ))}
                  </div>

                  {isEditing && (
                    <div className="mt-6 flex gap-3">
                      <button
                        onClick={handleProfileSave}
                        disabled={isSaving}
                        className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {isSaving ? (
                          <>
                            <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                            Saving...
                          </>
                        ) : (
                          'Save Changes'
                        )}
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
                <p className="text-md text-gray-600">No Orders Found.</p>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAccountPage;