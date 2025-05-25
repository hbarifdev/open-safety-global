import { useParams } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import ProductGrid from "../components/products/ProductGrid";
import ProductList from "../components/products/ProductList";
import { useSyncNavigationFromURL } from "../hooks/useSyncNavigationFromURL";
import Slider, { Slide } from "../components/layout/Slider";
import Breadcrumb from "../components/layout/Breadcrumb";
import { useGetCategoryDetailBySlugQuery } from "../store/slices/apiSlice"; 

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

  const { categoryname: categorySlug } = useParams();

  const { data, isLoading, error } = useGetCategoryDetailBySlugQuery(categorySlug!);
  console.log("Category Data:", data);

  // Extract subcategories and products dynamically
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

  return (
    <div className="container mx-auto py-8">
      <Breadcrumb />

      <div className="flex flex-col md:flex-row gap-8 w-full py-4">
        {/* Sidebar */}
        <aside className="w-full md:w-1/4">
          {isLoading ? (
            <p>Loading categories...</p>
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
              <p>Loading products...</p>
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

