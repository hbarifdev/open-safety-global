import { Product } from '../../store/slices/productsSlice'; 
import ProductCard from './ProductCard';

interface ProductListProps {
  products: Product[];
  filterByCategory?: string;
  filterByTags?: string[]; 
  limit?: number;
  className?: string;
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  filterByCategory,
  filterByTags,
  limit,
  className = '',
}) => {
  const filteredProducts = products
    .filter((product) =>
      filterByCategory ? product.category === filterByCategory : true
    )
    .filter((product) =>
      filterByTags && filterByTags.length > 0
        ? filterByTags.every((tag) => (product as any).tags?.includes(tag))
        : true
    )
    .slice(0, limit || products.length);

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ${className}`}>
      {filteredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
