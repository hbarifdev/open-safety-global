import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { filterProducts } from '../store/slices/productsSlice';
import HeroSlider from '../components/home/HeroSlider';
import ProductGrid from '../components/products/ProductGrid';
import WarrantySection from '../components/home/WarrantySection';

const HomePage: React.FC = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(filterProducts('all'));
  }, [dispatch]);
  
  return (
    <div>
      <HeroSlider />
      <ProductGrid />
      <WarrantySection />
    </div>
  );
};

export default HomePage;