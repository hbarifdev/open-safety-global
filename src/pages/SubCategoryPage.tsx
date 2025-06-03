import { useParams, useSearchParams } from "react-router-dom";
import { useEffect, useMemo } from "react";
import Sidebar from "../components/layout/Sidebar";
import ProductList from "../components/products/ProductList";
import { useSyncNavigationFromURL } from "../hooks/useSyncNavigationFromURL";
import Breadcrumb from "../components/layout/Breadcrumb";
import FilterBar from "../components/layout/FilterBar";
import { useGetSubCategoryDetailBySlugQuery } from "../store/slices/apiSlice";

export default function SubCategoryPage() {
  const { categoryname: parentSlug, subcategoryname: subcategorySlug } = useParams();
  useSyncNavigationFromURL();

  const [searchParams, setSearchParams] = useSearchParams();

  const viewLimit = useMemo(() => parseInt(searchParams.get("limit") || "16", 10), [searchParams]);
  const sortBy = useMemo(() => searchParams.get("sort") || "Name", [searchParams]);

  const {
    data,
    isLoading,
    error,
  } = useGetSubCategoryDetailBySlugQuery(subcategorySlug!);

  const subcategoryData = data?.data?.[0];

  const subcategories =
    subcategoryData?.parent?.sub_categories?.map((sub: any) => ({
      id: sub.id,
      name: sub.title,
      slug: sub.slug,
    })) || [];

  const products =
    subcategoryData?.products?.map((product: any) => ({
      id: product.id,
      ...product,
    })) || [];

  const sortedProducts = useMemo(() => {
    const sorted = [...products];
    if (sortBy === "Name") {
      sorted.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "Newest") {
      sorted.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    }
    return sorted;
  }, [products, sortBy]);

  const visibleProducts = sortedProducts.slice(0, viewLimit);

  const handleFilterChange = (newLimit: number, newSort: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("limit", newLimit.toString());
    params.set("sort", newSort);
    setSearchParams(params);
  };

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
          <FilterBar
            total={products.length}
            viewLimit={viewLimit}
            sortBy={sortBy}
            onChange={handleFilterChange}
          />
          <div className="mt-10">
            {isLoading ? (
              <p>Loading products...</p>
            ) : error ? (
              <p>Failed to load products.</p>
            ) : (
              <ProductList products={visibleProducts} />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
