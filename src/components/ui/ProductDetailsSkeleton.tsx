import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const ProductDetailsSkeleton = () => {
  return (
    <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
        <div className="flex flex-col md:flex-row gap-8 mb-12">
            {/* Left: Image Placeholder */}
            <div className="md:w-1/2 relative">
            <div className="relative w-full border rounded-lg overflow-hidden">
                <Skeleton height={550} />
            </div>
            <p className="text-sm text-gray-500 mt-2 text-center">
                <Skeleton width={100} height={12} />
            </p>
            </div>

            {/* Right: Product Info */}
            <div className="md:w-1/2 relative">
            <h1 className="text-3xl font-bold">
                <Skeleton width="70%" height={36} />
            </h1>
            <p className="text-lg text-gray-700 mt-2">
                <Skeleton width="40%" height={28} />
            </p>
            <p className="text-lg text-gray-700 mt-4 mb-10 space-y-2">
                <Skeleton count={3} />
            </p>
            <Skeleton height={48} />
            </div>
        </div>

        {/* Tabs */}
        <div className="border-t pt-8">
            <div className="flex gap-4 mb-6">
            {Array.from({ length: 3 }).map((_, index) => (
                <Skeleton key={index} width={100} height={36} />
            ))}
            </div>

            {/* Description content */}
            <div className="prose prose-sm max-w-none space-y-4">
            <Skeleton width="60%" height={24} />
            <Skeleton count={2} />
            <Skeleton width="30%" height={20} />
            <ul className="ml-6 list-disc space-y-2">
                {Array.from({ length: 10 }).map((_, i) => (
                <li key={i}>
                    <Skeleton width={`${Math.floor(Math.random() * 40) + 60}%`} height={16} />
                </li>
                ))}
            </ul>
            </div>
        </div>
        </div>
    </div>
  );
};

export default ProductDetailsSkeleton;
