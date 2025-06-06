import { useParams } from "react-router-dom";
import ProductSkeletonGrid from "../components/ui/ProductSkeletonGrid";
import SidebarSkeleton from "../components/ui/SidebarSkeleton";
import Sidebar from "../components/layout/Sidebar";
import ProductList from "../components/products/ProductList";
import { useSyncNavigationFromURL } from "../hooks/useSyncNavigationFromURL";
import Slider, { Slide } from "../components/layout/Slider";
import { useGetCategoryDetailBySlugQuery } from "../store/slices/apiSlice";

const CategoryPage = () => {
  useSyncNavigationFromURL();

  const { categoryname: categorySlug } = useParams();

  const { data, isLoading, error } = useGetCategoryDetailBySlugQuery(categorySlug!);
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

  const slides = allSlides[categorySlug as string] || [];

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
            <Sidebar categories={subcategories} parentSlug={categorySlug!} />
          )}
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          <Slider slides={slides} height="h-[300px]" autoPlayInterval={7000} />

          <div className="mt-10">
            {isLoading ? (
              <ProductSkeletonGrid breakpoints={{base:1,sm:2, md:3, lg:4, xl:4 }} />
            ) : error ? (
              <p>Failed to load products.</p>
            ) : (
              <ProductList products={products} />
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default CategoryPage;
