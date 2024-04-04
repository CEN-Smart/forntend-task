import { useQuery } from "@tanstack/react-query";
import { Product } from "./../../types/product";
import ProductCard from "./product-card";
import { fetchProducts } from "../../query/fetch-products";
import { cn } from "../../lib/utils";
import PageLoading from "../page-load-data";
const ProductsList = () => {
  const { data, isFetching, isPending, isError, error, isPaused } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    staleTime: 1000 * 60 * 5,
  });

  if (isFetching || isPending) {
    return <PageLoading />;
  }

  if (isPaused) {
    return (
      <div className="text-center text-gray-600 mt-4">
        Network delay: Please wait...
      </div>
    );
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div
      className={cn(`
      grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-4
      max-w-6xl mx-auto px-4 sm:px-6 lg:px-8
    `)}
    >
      {data.map((product: Product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductsList;
