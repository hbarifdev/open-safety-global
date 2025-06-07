import DynamicTabGrid from "../layout/DynamicTabGrid";
import { useGetProductsByIdsQuery } from '../../store/slices/apiSlice';


const ProductGrid: React.FC = () => {

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
    href: '/training',
  },
  {
    image: 'assets/images/Exhibitions-200px.png',
    title: 'Exhibitions',
    description: 'Special Session on Functional Safety at UDT Stockholm',
    href: '/exhibitions',
  },
  {
    image: 'assets/images/Servicing-200px.png',
    title: 'Servicing In-Country',
    description: 'Technician Training on-site, with free video refreshers and remote support',
    href: '/servicing',
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
    href: '/news',
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
      href: '/gallery',
    },
    {
      image: 'assets/images/News-200px.png',
      title: 'News',
      description: 'Open Safety’s news timeline',
      href: '/news',
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
        <DynamicTabGrid
              tabs={tabs}
              productTabId="featured"
              productData={featuredProducts.data}
              isProductLoading={isLoading}
              skeletonBreakpoints={{ base: 1, sm: 2, md: 4, lg: 5, xl: 5 }}
              infoData={{events: eventsInfo, information: informationInfo}}
              gridClasses={{
                featured: 'md:grid-cols-4 lg:grid-cols-5',
                events: 'md:grid-cols-4 lg:grid-cols-5',
                information: 'md:grid-cols-4 lg:grid-cols-5',
              }}
            />
      </div>
    </div>
  );
};

export default ProductGrid;
