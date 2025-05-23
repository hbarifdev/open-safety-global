import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

interface SubCategory {
  id: number;
  name: string;
  slug: string;
}

interface SidebarProps {
  categories: SubCategory[];
  parentSlug?: string; 
}

export default function Sidebar({ categories, parentSlug }: SidebarProps) {
  const { categoryname } = useParams();
  const activeSlug = useSelector((state: RootState) => state.navigation.childCategorySlug);

  const resolvedParentSlug = parentSlug || categoryname || '';

  return (
    <aside className="w-64 flex-shrink-0">
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-4 border-b">
          <h2 className="font-semibold text-gray-900 capitalize">
            {resolvedParentSlug.replace(/-/g, ' ').toUpperCase() || 'Main Category'}
          </h2>
        </div>
        <nav className="p-0">
          {categories.map((category) => (
            <div key={category.id}>
              <Link
                to={`/${resolvedParentSlug}/${category.slug}`}
                className={`block px-4 py-3 text-sm transition-colors ${
                  category.slug === activeSlug
                    ? 'bg-gray-900 text-white font-medium'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                {category.name}
              </Link>
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
}
