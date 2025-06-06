import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const ProductCardSkeleton = () => {
  return (
    <article className="flex flex-col bg-white rounded-lg shadow-md overflow-hidden h-full animate-pulse">
      <div className="block overflow-hidden h-48 relative">
        <Skeleton height="100%" width="100%" />
      </div>

      <div className="flex-1 p-4 flex flex-col">
        <div className="block">
          <Skeleton height={20} width="80%" className="mb-2" />
          <Skeleton height={16} width="60%" />
        </div>

        <div className="mt-2">
          <Skeleton height={24} width="40%" />
        </div>

        <div className="mt-4">
          <Skeleton height={32} width="100%" borderRadius={8} />
        </div>
      </div>
    </article>
  );
};

export default ProductCardSkeleton;
