import React, { useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { addToCart } from '../store/slices/cartSlice';
import { useGetProductDetailBySlugQuery } from "../store/slices/apiSlice";
import { formatPrice } from '../utils/formatPrice';
import LongDescriptionRenderer from '../components/layout/LongDescriptionRenderer';
    
// Define the type for the tabs
type TabType = 'description' | 'datasheet' | 'faqs';

const ProductPage: React.FC = () => {
  const { productSlug } = useParams<{ productSlug: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { exchangeRate, selectedCurrency } = useSelector((state: RootState) => state.currency);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('description');
  const [zoomVisible, setZoomVisible] = useState(false);
  const [zoomStyle, setZoomStyle] = useState({});
  const [accordionOpen, setAccordionOpen] = useState<number | null>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const isTouchDevice = typeof window !== 'undefined' && 'ontouchstart' in window;

  const { data, isLoading, error } = useGetProductDetailBySlugQuery(productSlug!);
  const productData = data?.data?.[0];

  if (isLoading) return <div>Loading...</div>;

  if (error) {
    console.error('Error fetching product data:', error);
    return <div>Error loading product details.</div>;
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current || !productData?.featured?.url) return;

    const { left, top, width, height } = imageRef.current.getBoundingClientRect();
    const x = ((e.pageX - left - window.scrollX) / width) * 100;
    const y = ((e.pageY - top - window.scrollY) / height) * 100;

    setZoomStyle({
      backgroundImage: `url(${productData.featured.url})`,
      backgroundSize: '200% 200%',
      backgroundPosition: `${x}% ${y}%`,
    });
  };

  const handleAddToCart = async () => {
    if (!productData) return;

    setIsAddingToCart(true);

    try {
      const resultAction = await dispatch(
        addToCart({
          id: productData.documentId,
          title: productData.title,
          quantity: 1,
          price: productData.price,
          featured: productData.featured?.url || '',
        })
      );

      if (!addToCart.fulfilled.match(resultAction)) {
        console.error('Failed to add to cart:', resultAction.error.message);
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setIsAddingToCart(false);
    }
  };

  const toggleAccordion = (index: number) => {
    setAccordionOpen(accordionOpen === index ? null : index);
  };

  const renderFaqAnswer = (answer: any[]) => {
    return answer.map((block: any, index: number) => {
      if (block.type === 'paragraph') {
        return (
          <p key={index} className="text-gray-700">
            {block.children.map((child: any) => child.text).join('')}
          </p>
        );
      }
      if (block.type === 'list') {
        return (
          <ol key={index} className="list-decimal ml-6 text-gray-700">
            {block.children.map((li: any, i: number) => (
              <li key={i}>
                {li.children.map((child: any) => child.text).join('')}
              </li>
            ))}
          </ol>
        );
      }
      return null;
    });
  };

  const renderTabContent = () => {
    if (!productData) return null;

    switch (activeTab) {
      case 'description':
        return (
          <div className="prose">
              <LongDescriptionRenderer content={productData.long_descriptions} />
          </div>
        );
      case 'datasheet':
        return productData.Datasheet ? (
          <div className="prose">
            <h3 className="text-2xl font-bold mb-4">Technical Datasheet</h3>
            <a
              href={productData.Datasheet.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              {productData.Datasheet.name}
            </a>
          </div>
        ) : null;
      case 'faqs':
        return productData.Faqs?.length ? (
          <div className="max-w-4xl space-y-4">
            {productData.Faqs.map((faq: any, index: number) => (
              <div key={index} className="border border-gray-200 rounded">
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full text-left px-4 py-3 bg-gray-100 hover:bg-gray-200 font-medium"
                >
                  {faq.Question}
                </button>
                {accordionOpen === index && (
                  <div className="px-4 py-2">{renderFaqAnswer(faq.Answer)}</div>
                )}
              </div>
            ))}
          </div>
        ) : null;
      default:
        return null;
    }
  };

  const availableTabs: TabType[] = ['description'];
  if (productData.Datasheet) availableTabs.push('datasheet');
  if (productData.Faqs?.length) availableTabs.push('faqs');

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <div className="flex flex-col md:flex-row gap-8 mb-12">
          {/* IMAGE + ZOOM */}
          <div className="md:w-1/2 relative">
            <div
              ref={imageRef}
              className="relative w-full border rounded-lg overflow-hidden"
              onMouseEnter={() => !isTouchDevice && setZoomVisible(true)}
              onMouseLeave={() => setZoomVisible(false)}
              onMouseMove={handleMouseMove}
            >
              <img
                src={productData.featured?.url}
                alt={productData.title}
                className="w-full h-full max-h-[550px] object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/assets/images/product-placeholder.jpg';
                }}
              />
              {!isTouchDevice && zoomVisible && (
                <div
                  className="absolute top-0 left-0 w-full h-full pointer-events-none object-contain"
                  style={{
                    ...zoomStyle,
                    transform: 'scale(1.2)',
                    backgroundRepeat: 'no-repeat',
                    opacity: 1,
                  }}
                />
              )}
            </div>
            <p className="text-sm text-gray-500 mt-2 text-center">
              {!isTouchDevice
                ? zoomVisible
                  ? 'Zoom active - hover to inspect'
                  : 'Hover to zoom'
                : 'Pinch to zoom'}
            </p>
          </div>

          {/* DETAILS */}
          <div className="md:w-1/2 relative">
            <h1 className="text-3xl font-bold">{productData.title}</h1>
 
          {productData.price !== null && (     
            <p className="text-lg text-gray-700 mt-2">
              {formatPrice(productData.price, exchangeRate, selectedCurrency)}
            </p>
          )}
            <p className="text-lg text-gray-700 mt-4 mb-10">{productData.short_descriptions}</p>
            
          {productData.price !== null && (   
            <button
              onClick={handleAddToCart}
              disabled={isAddingToCart}
              className={`w-full py-3 px-6 bg-navy-900 hover:bg-navy-800 text-white font-medium rounded transition-colors ${
                isAddingToCart ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isAddingToCart ? (
                <>
                  <svg className="animate-spin h-5 w-5 mr-2 inline" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Adding...
                </>
              ) : (
                'ADD TO CART'
              )}
            </button>
          )}
          </div>
        </div>

        {/* TABS */}
        <div className="border-t pt-8">
          <div className="flex gap-4 mb-6">
            {availableTabs.map((tab) => (
              <button
                key={tab}
                className={`px-4 py-2 border-b-2 font-medium ${
                  activeTab === tab ? 'border-navy-900 text-navy-900' : 'border-transparent text-gray-500'
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab === 'description' ? 'Description' : tab === 'datasheet' ? 'Datasheet' : 'FAQs'}
              </button>
            ))}
          </div>
          <div>{renderTabContent()}</div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
