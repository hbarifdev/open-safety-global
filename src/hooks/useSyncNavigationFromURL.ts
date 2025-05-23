import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setNavigationFromURL } from '../store/slices/navigationSlice';

export const useSyncNavigationFromURL = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const [parentSlug, subCategorySlug] = pathSegments;

    dispatch(
      setNavigationFromURL({
        parentSlug: parentSlug || '',
        subCategorySlug: subCategorySlug || '',
      })
    );
  }, [location.pathname, dispatch]);
};
