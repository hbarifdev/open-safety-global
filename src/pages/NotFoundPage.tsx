import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center px-4 py-16">
      <h1 className="text-6xl font-bold text-blue-600 mb-4">404</h1>
      <p className="text-xl text-gray-700 mb-8">Page not found. The page you are looking for does not exist.</p>
      <Link to="/" className="text-blue-600 hover:underline">Go back to Homepage</Link>
    </div>
  );
};

export default NotFoundPage;
