import { getSecureCookie } from '../utils/secureCookie';
import { useGetUserProfileQuery } from '../store/slices/apiSlice';

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
  billingAddress?: Address;
  shippingAddress?: Address;
}

export const useUserProfile = () => {
  const auth = getSecureCookie('auth');
  const jwt = auth?.jwt;

  const {
    data,
    isLoading: loading,
    error,
  } = useGetUserProfileQuery(jwt, {
    skip: !jwt,
  });

  const addressList: Address[] = data?.Address || [];

  const billingAddress = addressList.find((a) => a.id === 1);
  const shippingAddress = addressList.find((a) => a.id === 2);

  const userProfile: UserProfile | null = data
    ? {
        id: data.documentId,
        firstName: data.firstname || 'N/A',
        lastName: data.surname || 'N/A',
        email: data.email,
        phone_number: data.phone_number || '',
        company: data.company || '',
        createdAt: new Date(data.createdAt).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
        Address: addressList,
        billingAddress,
        shippingAddress,
      }
    : null;

  return { userProfile, loading, error };
};
