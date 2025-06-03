import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { addToCart } from '../store/slices/cartSlice';
import { formatPrice } from '../utils/formatPrice';

interface Product {
  id: number;
  title: string;
  short_descriptions: string;
  price: number;
  featured?: {
    url: string;
  };
  long_descriptions: string[];
  Datasheet?: {
    name: string;
    url: string;
  };
  Faqs?: {
    Question: string;
    Answer: any[];
  }[];
  sub_categories?: string[];
}

type TabType = 'description' | 'datasheet' | 'faqs';

const ProductPage: React.FC = () => {
  const { productSlug } = useParams<{ productSlug: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { exchangeRate, selectedCurrency } = useSelector((state: RootState) => state.currency);
  const [product, setProduct] = useState<Product | null>(null);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('description');
  const [zoomVisible, setZoomVisible] = useState(false);
  const [zoomStyle, setZoomStyle] = useState({});
  const [accordionOpen, setAccordionOpen] = useState<number | null>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const isTouchDevice = typeof window !== 'undefined' && 'ontouchstart' in window;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/products?filters[slug][$eq]=${productSlug}&populate=*`
        );
        if (!response.ok) throw new Error('Failed to fetch product data');
        const json = await response.json();
        const productData = json.data?.[0];
        if (productData) {
          setProduct({
            id: productData.id,
            title: productData.title,
            short_descriptions: productData.short_descriptions,
            price: productData.price,
            long_descriptions: productData.long_descriptions || [],
            featured: productData.featured || undefined,
            Faqs: productData.Faqs || [],
            Datasheet: productData.Datasheet
              ? {
                  name: productData.Datasheet.name,
                  url: productData.Datasheet.url,
                }
              : undefined,
            sub_categories: productData.sub_categories?.map((s: any) => s.name) || [],
          });
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [productSlug]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current || !product?.featured?.url) return;

    const { left, top, width, height } = imageRef.current.getBoundingClientRect();
    const x = ((e.pageX - left - window.scrollX) / width) * 100;
    const y = ((e.pageY - top - window.scrollY) / height) * 100;

    setZoomStyle({
      backgroundImage: `url(${product.featured.url})`,
      backgroundSize: '200% 200%',
      backgroundPosition: `${x}% ${y}%`,
    });
  };

  const toggleAccordion = (index: number) => {
    setAccordionOpen(accordionOpen === index ? null : index);
  };

  const renderFaqAnswer = (answer: any[]) => {
    return answer.map((block: any, index: number) => {
      if (block.type === 'paragraph') {
        return (
          <p key={index} className="text-gray-700">
            {block.children.map((child: any, i: number) => child.text).join('')}
          </p>
        );
      }
      if (block.type === 'list') {
        return (
          <ol key={index} className="list-decimal ml-6 text-gray-700">
            {block.children.map((li: any, i: number) => (
              <li key={i}>
                {li.children.map((child: any, j: number) => child.text).join('')}
              </li>
            ))}
          </ol>
        );
      }
      return null;
    });
  };

  const renderTabContent = () => {
    if (!product) return null;

    switch (activeTab) {
      case 'description':
        return (
          <div className="prose">
            <h3 className="text-2xl font-bold mb-4">Overview</h3>
            {product.short_descriptions.split('\n').map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
        );
      case 'datasheet':
        return product.Datasheet ? (
          <div className="prose">
            <h3 className="text-2xl font-bold mb-4">Technical Datasheet</h3>
            <a
              href={product.Datasheet.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              {product.Datasheet.name}
            </a>
          </div>
        ) : null;
      case 'faqs':
        return product.Faqs?.length ? (
          <div className="space-y-4">
            <h3 className="text-2xl font-bold mb-4">FAQs</h3>
            {product.Faqs.map((faq, index) => (
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

  if (!product) return <div>Loading...</div>;

  const availableTabs: TabType[] = ['description'];
  if (product.Datasheet) availableTabs.push('datasheet');
  if (product.Faqs?.length) availableTabs.push('faqs');

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <div className="flex flex-col md:flex-row gap-8 mb-12">
          <div className="md:w-1/2 relative">
                <div
                  ref={imageRef}
                  className="relative w-full border rounded-lg overflow-hidden"
                  onMouseEnter={() => !isTouchDevice && setZoomVisible(true)}
                  onMouseLeave={() => setZoomVisible(false)}
                  onMouseMove={handleMouseMove}
                >
                  <img
                    src={product?.featured?.url}
                    alt={product.title}
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
        <div className="md:w-1/2 relative">
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <p className="text-lg text-gray-700">{formatPrice(product.price, exchangeRate, selectedCurrency)}</p>
        </div>
      </div>
      </div>
      {/* TABS */}
      <div className="flex space-x-4 mb-4">
        {availableTabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded ${
              activeTab === tab ? 'bg-black text-white' : 'bg-gray-200 text-black'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* TAB CONTENT */}
      <div>{renderTabContent()}</div>
    </div>
  );
};

export default ProductPage;
