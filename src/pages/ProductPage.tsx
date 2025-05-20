import React, { useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { addToCart } from '../store/slices/cartSlice';
import { formatPrice } from '../utils/formatPrice';
import ReactImageZoom from 'react-image-zoom';

interface Product {
  id: string;
  name: string;
  model: string;
  price: number;
  description: string;
  features: string[];
  datasheet: string;
  faqs: { question: string; answer: string }[];
  category: string;
  subcategory: string;
  image: string;
  options: {
    version: string[];
  };
}

type TabType = 'description' | 'datasheet' | 'faqs';

const ProductPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const [selectedVersion, setSelectedVersion] = useState('');
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [addError, setAddError] = useState('');
  const [activeTab, setActiveTab] = useState<TabType>('description');
  const [zoomActive, setZoomActive] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);

  // Mock product data
  const product: Product = {
    id: productId || '1',
    name: 'Umbilical Supplied Rebreather',
    model: 'Deep Worker',
    price: 161000.00,
    description: 'The Deep Worker umbilical rebreather is a state of the art diving set delivering unprecedented performance down to 350 metres.',
    features: [
      'Available in saturation dive and surface supplied versions',
      'CE and NOISOCK certified for 350m depth',
      'Functional Safety Certified for CRC 6150/500 SL1 - 5'
    ],
    datasheet: 'This product meets all international safety standards...',
    faqs: [
      { question: 'What is the maximum depth?', answer: '350 metres' },
      { question: 'Duration?', answer: 'Up to 10 hours' }
    ],
    category: 'Commercial Diving',
    subcategory: 'Umbilical Rebreathers',
    image: '/assets/images/DSC_5498.jpg',
    options: {
      version: ['Surface Supplied', 'Saturation Dive']
    }
  };

  const zoomProps = {
    width: 550,
    height: 550,
    zoomWidth: 500,
    img: product.image,
    zoomStyle: 'z-50 border-4 border-white shadow-xl',
    zoomPosition: 'original'
  };

  const handleAddToCart = async () => {
    if (!selectedVersion) {
      setAddError('Please select a version');
      return;
    }

    setIsAddingToCart(true);
    setAddError('');
    
    try {
      const resultAction = await dispatch(
        addToCart({
          id: `${productId}-${selectedVersion.toLowerCase().replace(/\s+/g, '-')}`,
          name: `${product.name} (${selectedVersion})`,
          price: product.price,
          quantity: 1,
          image: product.image,
        })
      );

      if (addToCart.fulfilled.match(resultAction)) {
        console.log('Added to cart');
      }
    } catch (error) {
      setAddError('Failed to add to cart');
    } finally {
      setIsAddingToCart(false);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'description':
        return (
          <>
            <h3 className="text-2xl font-bold mb-4">Features</h3>
            <ul className="list-disc pl-5 space-y-2">
              {product.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </>
        );
      case 'datasheet':
        return (
          <div className="prose">
            <h3 className="text-2xl font-bold mb-4">Technical Specifications</h3>
            <p>{product.datasheet}</p>
          </div>
        );
      case 'faqs':
        return (
          <div className="space-y-4">
            <h3 className="text-2xl font-bold mb-4">FAQs</h3>
            {product.faqs.map((faq, index) => (
              <div key={index} className="border-b pb-4">
                <h4 className="font-medium">{faq.question}</h4>
                <p className="text-gray-600 mt-1">{faq.answer}</p>
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-600 mb-6">
        Home / {product.category} / {product.subcategory} / {product.name}
      </div>

      {/* Product Header */}
      <div className="flex flex-col md:flex-row gap-8 mb-12">
        {/* Product Image with Zoom */}
        <div className="md:w-1/2">
          <div 
            ref={imageRef}
            className="relative overflow-hidden rounded-lg shadow-md"
            onMouseEnter={() => setZoomActive(true)}
            onMouseLeave={() => setZoomActive(false)}
          >
            {zoomActive ? (
              <ReactImageZoom {...zoomProps} />
            ) : (
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/assets/images/product-placeholder.jpg';
                }}
              />
            )}
          </div>
          <p className="text-sm text-gray-500 mt-2 text-center">
            {zoomActive ? 'Zoom active - hover to inspect' : 'Hover to zoom'}
          </p>
        </div>

        {/* Product Info */}
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <h2 className="text-xl text-gray-700 mb-4">{product.model}</h2>
          <p className="text-2xl font-bold text-navy-900 mb-6">{formatPrice(product.price)}</p>
          <p className="text-gray-700 mb-6">{product.description}</p>

          {/* Product Options */}
          <div className="mb-6">
            <h3 className="font-medium mb-2">Available Options:</h3>
            <div>
              <label className="block mb-1">Version:</label>
              <select
                value={selectedVersion}
                onChange={(e) => setSelectedVersion(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">Select version</option>
                {product.options.version.map(version => (
                  <option key={version} value={version}>{version}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            disabled={!selectedVersion || isAddingToCart}
            className={`w-full py-3 px-6 bg-navy-900 hover:bg-navy-800 text-white font-medium rounded transition-colors ${
              (!selectedVersion || isAddingToCart) ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isAddingToCart ? (
              <>
                <svg className="animate-spin h-5 w-5 mr-2 inline" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Adding...
              </>
            ) : (
              'ADD TO CART'
            )}
          </button>
          {addError && <p className="text-red-500 mt-2 text-sm">{addError}</p>}
        </div>
      </div>

      {/* Product Tabs */}
      <div className="mb-12">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8">
            {(['description', 'datasheet', 'faqs'] as TabType[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 border-b-2 font-medium ${
                  activeTab === tab
                    ? 'border-navy-900 text-navy-900'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="py-8">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;