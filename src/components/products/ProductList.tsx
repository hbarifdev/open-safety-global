import ProductCard from './ProductCard';

interface Product {
  id: string;
  title: string;
  slug: string;
  category: string;
  price: number;
  featured: {
    url: string;
  };
  description: string;
}

interface ProductListProps {
  products: Product[];
  className?: string;
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  className = 'md:grid-cols-3 lg:grid-cols-4',
}) => {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 gap-6 ${className}`}>
      {products && products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
