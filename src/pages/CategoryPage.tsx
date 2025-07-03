import { useParams, Navigate } from "react-router-dom";
import SidebarSkeleton from "../components/ui/SidebarSkeleton";
import Sidebar from "../components/layout/Sidebar";
import { InfoItem } from "../components/layout/DynamicTabGrid";
import DynamicTabGrid from "../components/layout/DynamicTabGrid";
import { useSyncNavigationFromURL } from "../hooks/useSyncNavigationFromURL";
import Slider, { Slide } from "../components/layout/Slider";
import { useGetCategoryDetailBySlugQuery } from "../store/slices/apiSlice";


const CategoryPage = () => {
  useSyncNavigationFromURL();

  const { categoryname: categorySlug } = useParams();

 if (!categorySlug) {
    return <Navigate to="/404" replace />;
  }
  const { data, isLoading, error } = useGetCategoryDetailBySlugQuery(categorySlug);

   if (!isLoading && (error || !data?.data?.[0])) {
    return <Navigate to="/404" replace />;
  }

  const categoryData = data?.data?.[0];

  const subcategories = categoryData?.sub_categories?.map((sub: any) => ({
    id: sub.id,
    name: sub.title,
    slug: sub.slug,
  })) || [];

  const products = categoryData?.featured_products?.map((product: any) => ({
    id: product.id,
    ...product,
  })) || [];

  // Category-based slides
  const allSlides: Record<string, Slide[]> = {
    "military-diving": [
      {
        id: 1,
        title: "Military Diving",
        subtitle: "Advanced tactical solutions for underwater ops",
        image: "/assets/images/psl3.png",
      },
      {
        id: 2,
        title: "Stealth & Strength",
        subtitle: "Battle-tested gear for elite divers",
        image: "/assets/images/psl3.png",
      },
    ],
    "commercial-diving": [
      {
        id: 3,
        title: "Commercial Diving",
        subtitle: "Efficiency and safety in deep-sea industries",
        image: "/assets/images/psl2.png",
      },
      {
        id: 4,
        title: "Heavy Duty",
        subtitle: "Built for industrial underwater challenges",
        image: "/assets/images/psl2.png",
      },
    ],
    "sports-diving": [
      {
        id: 5,
        title: "Sports Diving",
        subtitle: "The safest rebreathers packed with innovation",
        image: "/assets/images/psl1.png",
      },
      {
        id: 6,
        title: "Dive with Freedom",
        subtitle: "Gear up for underwater adventures",
        image: "/assets/images/psl1.png",
      },
    ],
    "respiratory-validation": [
      {
        id: 7,
        title: "Respiratory Validation",
        subtitle: "Precision and reliability in breathing systems",
        image: "/assets/images/psl4.jpg",
      },
      {
        id: 8,
        title: "System Testing",
        subtitle: "Ensuring safety through validation",
        image: "/assets/images/psl4.jpg",
      },
    ],
  };

  const slides = allSlides[categorySlug] || [];

  const tabs = [
    { id: 'featured', label: 'Featured' },
    { id: 'events', label: 'Events' },
    { id: 'information', label: 'Information' },
  ];

  const eventsInfo: InfoItem[] = [
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

  const informationInfo: InfoItem[] = [
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

  const allEventsInfo: Record<string, InfoItem[]> = {
    'military-diving': eventsInfo.filter(item => item.title !== "Pandemic"),
    'commercial-diving': eventsInfo.filter(item => item.title !== "Pandemic"),
    'sports-diving': eventsInfo.filter(item => item.title !== "Pandemic"),
    'respiratory-validation': eventsInfo.filter(item => item.title !== "Pandemic"),
  };

  const allInformationInfo: Record<string, InfoItem[]> = {
    'military-diving': informationInfo.filter(item => item.title !== "Gallery"),
    'commercial-diving': informationInfo.filter(item => item.title !== "Gallery"),
    'sports-diving': informationInfo.filter(item => item.title !== "News"),
    'respiratory-validation': informationInfo.filter(item => item.title !== "Gallery"),
  };

  const infoData = {
    events: allEventsInfo[categorySlug] || [],
    information: allInformationInfo[categorySlug] || [],
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col md:flex-row gap-8 w-full py-4">
        {/* Sidebar */}
        <aside className="w-full md:w-1/4">
          {isLoading ? (
            <SidebarSkeleton />
          ) : error ? (
            <p>Failed to load categories.</p>
          ) : (
            <Sidebar categories={subcategories} parentSlug={categorySlug} />
          )}
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          <Slider slides={slides} height="h-[300px]" autoPlayInterval={7000} />

            <DynamicTabGrid
              tabs={tabs}
              productTabId="featured"
              productData={products}
              isProductLoading={isLoading}
              skeletonBreakpoints={{ base: 1, sm: 2, md: 3, lg: 4, xl: 4 }}
              infoData={infoData}
              gridClasses={{
                featured: 'md:grid-cols-3 lg:grid-cols-4',
                events: 'md:grid-cols-3 lg:grid-cols-4',
                information: 'md:grid-cols-3 lg:grid-cols-4',
              }}
            />
        </main>
      </div>
    </div>
  );
};

export default CategoryPage;
