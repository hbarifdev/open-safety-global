import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Product } from '../../store/slices/productsSlice';
import { addToCart } from '../../store/slices/cartSlice';
import { formatPrice } from '../../utils/formatPrice';
import { AppDispatch, RootState } from '../../store';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isAdding, setIsAdding] = useState(false);
  const { exchangeRate, selectedCurrency } = useSelector((state: RootState) => state.currency);

  const handleAddToCart = useCallback(async () => {
    setIsAdding(true);
    try {
      await dispatch(addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        quantity: 1,
        image: product.image,
      })).unwrap();
    } catch (error) {
      console.error('Failed to add to cart:', error);
      // Optional: Show error toast/message to user
    } finally {
      setIsAdding(false);
    }
  }, [dispatch, product]);

  const fallbackImage = 'https://images.pexels.com/photos/3760323/pexels-photo-3760323.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';
  const productUrl = `/product/${product.id}`;
  const hasPrice = product.price > 0;

  return (
    <article className="flex flex-col bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-lg h-full">
      <Link to={productUrl} className="block overflow-hidden h-48 relative">
        <img 
          src={typeof product.image === 'string' && product.image.startsWith('http') ? product.image : fallbackImage}
          alt={product.title}
          className="w-full h-full object-cover transform transition-transform hover:scale-105"
          loading="lazy"
          width={300}
          height={300}
          onError={(e) => {
            (e.target as HTMLImageElement).src = fallbackImage;
          }}
        />
      </Link>

      <div className="flex-1 p-4 flex flex-col">
        <Link to={productUrl} className="block">
          <h3 className="text-sm font-medium text-gray-900 hover:text-orange-600 transition-colors line-clamp-2">
            {product.title}
          </h3>
        </Link>

        <div className="mt-2">
          {hasPrice ? (
            <span className="text-lg font-bold text-gray-900">
              {formatPrice(product.price, exchangeRate, selectedCurrency)}
            </span>
          ) : (
            <span className="text-sm font-medium text-gray-600">
              Price on request
            </span>
          )}
        </div>

        <div className="mt-4 flex-grow flex items-end">
          {hasPrice ? (
            <button
              onClick={handleAddToCart}
              disabled={isAdding}
              aria-label={`Add ${product.title} to cart`}
              aria-busy={isAdding}
              className={`w-full py-2 px-4 bg-navy-900 hover:bg-navy-800 text-white 
              text-sm font-medium rounded transition-colors focus:outline-none focus:ring-2 focus:ring-navy-500
              flex items-center justify-center gap-2 ${isAdding ? 'opacity-75 cursor-not-allowed' : ''}`}
            >
              {isAdding ? (
                <>
                  <svg 
                    className="animate-spin h-4 w-4 text-white" 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Adding...
                </>
              ) : (
                'Add to Cart'
              )}
            </button>
          ) : (
            <Link
              to={productUrl}
              className="w-full py-2 px-4 border border-gray-300 hover:border-orange-500 
              text-center text-gray-700 hover:text-orange-600 text-sm font-medium rounded transition-colors"
            >
              Learn More
            </Link>
          )}
        </div>
      </div>
    </article>
  );
};

export default React.memo(ProductCard);