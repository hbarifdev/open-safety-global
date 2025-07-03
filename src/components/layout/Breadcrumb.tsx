import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const Breadcrumb = () => {
  const { parentCategorySlug, childCategorySlug } = useSelector(
    (state: RootState) => state.navigation
  );

  return (
  <nav className="text-gray-600 mb-4" aria-label="Breadcrumb">
    <ol className="list-reset flex items-strech flex-wrap gap-x-2 gap-y-1">
      <li>
        <Link to="/" className="text-sm sm:text-md md:text-lg font-medium text-gray-600 hover:text-blue-600">Home</Link>
      </li>
      {parentCategorySlug && (
        <>
          <li>/</li>
          <li>
            <Link to={`/${parentCategorySlug}`} className="text-sm sm:text-md md:text-lg font-medium text-gray-600 hover:text-blue-600">
              {parentCategorySlug.replace(/-/g, ' ')}
            </Link>
          </li>
        </>
      )}
      {childCategorySlug && (
        <>
          <li>/</li>
          <li className="text-sm sm:text-md md:text-lg font-medium text-blue-600"><p>
            {childCategorySlug.replace(/-/g, ' ')}
          </p></li>
        </>
      )}
    </ol>
  </nav>
);

};

export default Breadcrumb;
