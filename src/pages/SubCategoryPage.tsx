import { useParams } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import ProductList from "../components/products/ProductList";
import { useSyncNavigationFromURL } from "../hooks/useSyncNavigationFromURL";
import Breadcrumb from "../components/layout/Breadcrumb";
import FilterBar from "../components/layout/FilterBar";
import { useGetSubCategoryDetailBySlugQuery } from "../store/slices/apiSlice";

export default function SubCategoryPage() {
  const { categoryname: parentSlug, subcategoryname: subcategorySlug } = useParams();
  useSyncNavigationFromURL();

  const {
    data,
    isLoading,
    error,
  } = useGetSubCategoryDetailBySlugQuery(subcategorySlug!);

  const subcategoryData = data?.data?.[0];

  const subcategories = subcategoryData?.parent?.sub_categories?.map((sub: any) => ({
    id: sub.id,
    name: sub.title,
    slug: sub.slug,
  })) || [];

  const products = subcategoryData?.products?.map((product: any) => ({
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
            <Sidebar categories={subcategories} parentSlug={parentSlug!} />
          )}
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          <FilterBar />
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
}
