import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';

const MAILCHIMP_URL =
  'https://gmail.us4.list-manage.com/subscribe/post?u=7b0fc9809ad3c8457a732d7e2&id=cd933a4851';

const newsletterSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

type NewsletterFormData = z.infer<typeof newsletterSchema>;

const NewsletterSubscription = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async (data: NewsletterFormData) => {
    setError('');
    const formData = new URLSearchParams();
    formData.append('EMAIL', data.email);
    // Using the EXACT b_* field from your embedded form
    formData.append('b_7b0fc9809ad3c8457a732d7e2_cd933a4851', '');

    try {
      // Mailchimp's legacy endpoint requires no-cors mode
      const res = await fetch(MAILCHIMP_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString(),
        mode: 'no-cors', // Essential for Mailchimp's endpoint
      });

      // With no-cors we can't read response, but assume success if no error
      setSubmitted(true);
      reset();
    } catch (err) {
      setError('Subscription failed. Please try again later.');
    }
  };

  /* 
   * Layout remains exactly the same as your original
   * Only the Mailchimp submission logic was updated
   */
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Subscribe for Newsletter</h3>

      {submitted ? (
        <div className="p-3 bg-green-100 text-green-800 rounded-md">
          Thank you for subscribing!
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div>
            <input
              type="email"
              placeholder="Your email address"
              className={`w-full px-3 py-2 bg-gray-800 text-white border ${
                errors.email ? 'border-red-500' : 'border-gray-700'
              } rounded focus:outline-none focus:ring-1 focus:ring-orange-500`}
              {...register('email')}
              aria-invalid={errors.email ? 'true' : 'false'}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          {error && (
            <div className="text-sm text-red-500">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 px-4 rounded transition-colors ${
              isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>
      )}
    </div>
  );
};

export default NewsletterSubscription;