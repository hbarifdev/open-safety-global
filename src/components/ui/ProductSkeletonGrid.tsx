import ProductCardSkeleton from './ProductCardSkeleton';
import { useWindowSize } from '../../hooks/useWindowSize'; 
interface Props {
  className?: string;
  breakpoints?: {
    base?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
}

const ProductSkeletonGrid = ({
  className = 'md:grid-cols-3 lg:grid-cols-4',
  breakpoints = {
    base: 1,
    sm: 2,
    md: 4,
    lg: 4,
    xl: 5,
  },
}: Props) => {
  const { width } = useWindowSize();

  const getCountFromWidth = () => {
    if (width >= 1280) return breakpoints.xl || 5;
    if (width >= 1024) return breakpoints.lg || 4;
    if (width >= 768) return breakpoints.md || 3;
    if (width >= 640) return breakpoints.sm || 2;
    return breakpoints.base || 1;
  };

  const count = getCountFromWidth();

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 gap-6 ${className}`}>
      {Array.from({ length: count }, (_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
};

export default ProductSkeletonGrid;
