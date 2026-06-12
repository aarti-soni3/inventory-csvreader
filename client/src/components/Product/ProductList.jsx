import { ProductItem } from "./ProductItem";

export const ProductList = ({ products }) => {
  const headers = [
    "Id",
    "Name",
    "Quantity",
    "Price",
    "Manufacturer",
    "Category",
    // "Expiration Date",
    "Location",
    "Weight",
    // "Created At",
    // "Updated At",
  ];

  return (
    <div className="table-container">
      {products && (
        <table className="product-table">
          <thead>
            <tr className="table-row">
              {headers.map((key) => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
            <>
              <ProductItem key={product?.productId} product={product} />
            </>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
