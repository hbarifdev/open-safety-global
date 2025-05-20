import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { filterProducts } from '../store/slices/productsSlice';
import HeroSlider from '../components/home/HeroSlider';
import ProductGrid from '../components/products/ProductGrid';

const CommercialDivingPage: React.FC = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    // Filter products by commercial category
    dispatch(filterProducts('commercial'));
  }, [dispatch]);
  
  return (
    <div>
      <HeroSlider />
      <ProductGrid />
    </div>
  );
};

export default CommercialDivingPage;