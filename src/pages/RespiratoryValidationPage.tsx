import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { filterProducts } from '../store/slices/productsSlice';
import HeroSlider from '../components/home/HeroSlider';
import ProductGrid from '../components/products/ProductGrid';

const RespiratoryValidationPage: React.FC = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    // Filter products by military category
    dispatch(filterProducts('military'));
  }, [dispatch]);
  
  return (
    <div>
      <HeroSlider />
      <ProductGrid />
    </div>
  );
};

export default RespiratoryValidationPage;