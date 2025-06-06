import { Link, useLocation } from 'react-router-dom';
import { useSearchProductsQuery } from '../store/slices/apiSlice';
import ProductSkeletonGrid from '../components/ui/ProductSkeletonGrid';

const SearchPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get('q') || '';

  const { data, isLoading, isError } = useSearchProductsQuery(searchTerm);
  const products = data?.data || [];

  if (isLoading) return <div className="container mx-auto py-8"><ProductSkeletonGrid breakpoints={{base:1,sm:2, md:3, lg:4, xl:4 }} /></div>;
  if (isError) return <div className="container mx-auto py-8">Error loading results.</div>;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">
        Search results for: "{searchTerm}"
      </h1>

      {products.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((product: any) => {
            const featuredImage = product?.featured?.url;
            const title = product?.title || 'Untitled';

            return (
              <div key={product.id} className="border p-4 rounded shadow flex flex-col align-center justify-between">
                
                {featuredImage ? (
                  <img
                    src={featuredImage}
                    alt={title}
                    className="w-full h-60 object-cover rounded"
                  />
                ) : (
                  <div className="w-full h-40 bg-gray-200 flex items-center justify-center rounded">
                    No Image
                  </div>
                )}
                <h2 className="text-lg font-semibold mt-4">{title}</h2>
                <p className="text-gray-600">
                  {product?.short_descriptions || 'No description available.'}
                </p>
                <Link
                  to={`/product/${product?.slug}`}
                  className="w-full py-2 px-4 bg-navy-900 hover:bg-navy-800 text-white text-sm font-medium rounded transition-colors focus:outline-none focus:ring-2 focus:ring-navy-500
              flex items-center justify-center mt-6">
                  View Product
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
