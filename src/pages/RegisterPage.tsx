import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Define validation schema with Zod
const registerSchema = z.object({
  // Personal Details
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  surname: z.string().min(2, 'Surname must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  
  // Company Details
  companyName: z.string().optional(),
  
  // Address
  address: z.string().min(5, 'Address must be at least 5 characters'),
  postCode: z.string().min(3, 'Post code must be at least 3 characters'),
  city: z.string().min(2, 'City must be at least 2 characters'),
  country: z.string().min(1, 'Please select a country'),
  
  // Contact Information
  telephone: z.string().min(6, 'Telephone must be at least 6 characters'),
  newsletter: z.boolean().optional(),
  
  // Password
  password: z.string().min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Must contain at least one number'),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

type RegisterFormData = z.infer<typeof registerSchema>;

const countries = [
  { value: '', label: 'Please Select' },
  { value: 'us', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'ca', label: 'Canada' },
  // Add more countries as needed
];

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      newsletter: false,
    }
  });

  const onSubmit = (data: RegisterFormData) => {
    console.log('Registration data:', data);
    // Add your registration logic here
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-3xl">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
            Sign in here
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-3xl">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {/* Personal Details Section */}
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Your Personal Details</h3>
              
              <div className="grid grid-cols-1 gap-y-4 gap-x-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                    First Name
                  </label>
                  <input
                    id="firstName"
                    className={`mt-1 block w-full px-3 py-2 border ${errors.firstName ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                    {...register('firstName')}
                  />
                  {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>}
                </div>

                <div>
                  <label htmlFor="surname" className="block text-sm font-medium text-gray-700">
                    Surname
                  </label>
                  <input
                    id="surname"
                    className={`mt-1 block w-full px-3 py-2 border ${errors.surname ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                    {...register('surname')}
                  />
                  {errors.surname && <p className="mt-1 text-sm text-red-600">{errors.surname.message}</p>}
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    E-Mail Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    className={`mt-1 block w-full px-3 py-2 border ${errors.email ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                    {...register('email')}
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
                </div>
              </div>
            </div>

            {/* Company Details Section */}
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Company Details</h3>
              <div>
                <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
                  Company Name (optional)
                </label>
                <input
                  id="companyName"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  {...register('companyName')}
                />
              </div>
            </div>

            {/* Address Section */}
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Your Address</h3>
              
              <div className="grid grid-cols-1 gap-y-4 gap-x-6 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                    Address
                  </label>
                  <input
                    id="address"
                    className={`mt-1 block w-full px-3 py-2 border ${errors.address ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                    {...register('address')}
                  />
                  {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>}
                </div>

                <div>
                  <label htmlFor="postCode" className="block text-sm font-medium text-gray-700">
                    Post Code
                  </label>
                  <input
                    id="postCode"
                    className={`mt-1 block w-full px-3 py-2 border ${errors.postCode ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                    {...register('postCode')}
                  />
                  {errors.postCode && <p className="mt-1 text-sm text-red-600">{errors.postCode.message}</p>}
                </div>

                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                    City or Town
                  </label>
                  <input
                    id="city"
                    className={`mt-1 block w-full px-3 py-2 border ${errors.city ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                    {...register('city')}
                  />
                  {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>}
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                    Country
                  </label>
                  <select
                    id="country"
                    className={`mt-1 block w-full px-3 py-2 border ${errors.country ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                    {...register('country')}
                  >
                    {countries.map((country) => (
                      <option key={country.value} value={country.value}>
                        {country.label}
                      </option>
                    ))}
                  </select>
                  {errors.country && <p className="mt-1 text-sm text-red-600">{errors.country.message}</p>}
                </div>
              </div>
            </div>

            {/* Contact Information Section */}
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Your Contact Information</h3>
              
              <div className="grid grid-cols-1 gap-y-4 gap-x-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="telephone" className="block text-sm font-medium text-gray-700">
                    Telephone Number
                  </label>
                  <input
                    id="telephone"
                    type="tel"
                    className={`mt-1 block w-full px-3 py-2 border ${errors.telephone ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                    {...register('telephone')}
                  />
                  {errors.telephone && <p className="mt-1 text-sm text-red-600">{errors.telephone.message}</p>}
                </div>

                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="newsletter"
                      type="checkbox"
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                      {...register('newsletter')}
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="newsletter" className="font-medium text-gray-700">
                      Subscribe to newsletter
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Password Section */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Your Password</h3>
              
              <div className="grid grid-cols-1 gap-y-4 gap-x-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    className={`mt-1 block w-full px-3 py-2 border ${errors.password ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                    {...register('password')}
                  />
                  {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                    Password Confirmation
                  </label>
                  <input
                    id="confirmPassword"
                    type="password"
                    className={`mt-1 block w-full px-3 py-2 border ${errors.confirmPassword ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                    {...register('confirmPassword')}
                  />
                  {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>}
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Registering...' : 'REGISTER'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;