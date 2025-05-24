import { useParams } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import { useSyncNavigationFromURL } from '../hooks/useSyncNavigationFromURL';
import ProductGrid from "../components/products/ProductGrid";
import HeroSlider from '../components/home/HeroSlider';
import Slider, { Slide } from "../components/layout/Slider";

const sampleSubCategories = [
  { id: 1, name: 'Multimode Rebreathers', slug: 'multimode-rebreathers' },
  { id: 2, name: 'Divers Tactical Vests', slug: 'divers-tactical-vests' },
  { id: 3, name: 'Buoyancy Management', slug: 'buoyancy-management' },
  { id: 4, name: 'Dive Electronics', slug: 'dive-electronics' },
  { id: 5, name: 'Bail Out Systems', slug: 'bail-out-systems' },
  { id: 6, name: 'Diver Communications', slug: 'diver-communications' },
  { id: 7, name: 'Tactical Equipment', slug: 'tactical-equipment' },
  { id: 8, name: 'Diver Propulsion', slug: 'diver-propulsion' },
  { id: 9, name: 'Personal Dive Gear', slug: 'personal-dive-gear' },
  { id: 10, name: 'Consumables', slug: 'consumables' },
  { id: 11, name: 'Technician', slug: 'technician' },
  { id: 12, name: 'Training', slug: 'training' },
];

const slides: Slide[] = [
  {
    id: 1,
    title: "Sports Diving",
    subtitle: "The safest rebreathers packed with innovation",
    image: "/assets/images/psl1.png",
  },
  {
    id: 2,
    title: "Military Diving",
    subtitle: "Advanced tactical solutions for underwater ops",
    image: "/assets/images/psl3.png",
  },
];

const CategoryPage = () => {
  useSyncNavigationFromURL();
  const { categoryname } = useParams();
  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col md:flex-row gap-8 w-full py-4">
      <Sidebar categories={sampleSubCategories} parentSlug={categoryname!} />
      <main className="flex-1">
         <Slider slides={slides} height="h-[300px]" autoPlayInterval={7000} />
        <ProductGrid />
      </main>
    </div>
  </div>
  );
};

export default CategoryPage;

