export const ProductItem = ({ product }) => {
  return (
    <tr className="table-row">
      {Object.entries(product).map(([key, value]) => {
        return <td key={`${product?.productId}_${key}`}>{value}</td>;
      })}
    </tr>
  );
};
