import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import ProductCard from './ProductCard';
import TabNavigation from '../ui/TabNavigation';

const ProductGrid: React.FC = () => {
  const products = useSelector((state: RootState) => state.products.items);
  const activeTab = useSelector((state: RootState) => state.ui.activeTab);
  
  const tabs = [
    { id: 'featured', label: 'Featured' },
    { id: 'events', label: 'Events' },
    { id: 'information', label: 'Information' },
  ];
  
  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        {/* Tabs */}
        <TabNavigation tabs={tabs} activeTab={activeTab} />
        
        {/* Product Grid */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;