import { useGetAllProductsQuery } from "../../store/productApi";
import { ProductList } from "./ProductList";
import "./products.css";

export const Product = () => {
  const { data /*, isLoading, error*/ } = useGetAllProductsQuery();

  return <ProductList products={data?.products} />;
};
