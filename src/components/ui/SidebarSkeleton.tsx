import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SidebarSkeleton = () => {
  const getRandomWidth = () => `${Math.floor(Math.random() * (90 - 50 + 1)) + 50}%`;

  return (
    <aside className="w-64 flex-shrink-0">
      <div className="bg-white rounded-lg shadow-sm border">
        {/* Title Skeleton */}
        <div className="p-4 border-b">
          <Skeleton height={28} width="80%" />
        </div>

        {/* Navigation Links Skeleton */}
        <nav className="p-0">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="px-4 py-3">
              <Skeleton height={20} width={getRandomWidth()} />
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default SidebarSkeleton;
