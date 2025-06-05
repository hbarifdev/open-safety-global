import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import ProductCard from './ProductCard';
import TabNavigation from '../ui/TabNavigation';
import InfoCardList from '../layout/InfoCardList';
import ProductList from './ProductList';
import { useGetProductsByIdsQuery } from '../../store/slices/apiSlice';

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

const ProductGrid: React.FC = () => {
  const activeTab = useSelector((state: RootState) => state.ui.activeTab);

  const tabs = [
    { id: 'featured', label: 'Featured' },
    { id: 'events', label: 'Events' },
    { id: 'information', label: 'Information' },
  ];

 const eventsInfo = [
  {
    image: 'assets/images/Training-200px.png',
    title: 'Training',
    description: 'Training onsite and 24/7 remote support',
    href: '#',
  },
  {
    image: 'assets/images/Exhibitions-200px.png',
    title: 'Exhibitions',
    description: 'Special Session on Functional Safety at UDT Stockholm',
    href: '#',
  },
  {
    image: 'assets/images/Servicing-200px.png',
    title: 'Servicing In-Country',
    description: 'Technician Training on-site, with free video refreshers and remote support',
    href: '#',
  },
  {
    image: 'assets/images/Pandemic-200px.png',
    title: 'Pandemic',
    description: 'Serving you during the pandemic',
    href: '#',
  },
  {
    image: 'assets/images/News-200px.png',
    title: 'News',
    description: 'Open Safety’s news timeline',
    href: '#',
  },
];

  const informationInfo = [
    {
      image: 'assets/images/OSEL-200px.png',
      title: 'About Us',
      description: 'Background, technology and experience.',
      href: '/about-us',
    },
    {
      image: 'assets/images/Certs-200px.png',
      title: 'Certifications',
      description: 'Certifications on our products',
      href: '/certifications',
    },
    {
      image: 'assets/images/Safety-Data.jpg',
      title: 'Safety Data',
      description: 'Detailed reports on all safety aspects',
      href: '/safety-data',
    },
    {
      image: 'assets/images/gallery-200px.png',
      title: 'Gallery',
      description: 'Photo album from our work over the past decade',
      href: '#',
    },
    {
      image: 'assets/images/News-200px.png',
      title: 'News',
      description: 'Open Safety’s news timeline',
      href: '#',
    },
  ];

const productIds = [ 
  'plwiuhi81nflbwxd83rk4xpx',
  'ltc0i15exqgcknznngcilsw6',
  'di2jsp049h4yex49tnbr6ndd',
  'lcluj98x9hmy6z21fcb6tn03',
  'cofovdx4ak86a5rxdvlai47s',
  ];

const { data, isLoading, error } = useGetProductsByIdsQuery(productIds);
const featuredProducts = data || [];
  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        {/* Tabs */}
        <TabNavigation tabs={tabs} activeTab={activeTab} />

        <div className="mt-8">
          {activeTab === 'featured' && (
            <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {isLoading && <p>Loading Featured products...</p>}
              {error && <p>Error loading featured products. Try a reload.</p>}
              
              {/* {featuredProducts.data && featuredProducts.data.map((product:Product) => (
                <ProductCard key={product.id} product={product} />
              ))} */}
            </div>
            <ProductList className={'md:grid-cols-4 lg:grid-cols-5'} products={featuredProducts.data}/>
            </>
          )}

          {activeTab === 'events' && <InfoCardList items={eventsInfo} />}

          {activeTab === 'information' && <InfoCardList items={informationInfo} />}
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;
