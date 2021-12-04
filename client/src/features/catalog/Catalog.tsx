import { useEffect, useState } from "react";
import { Product } from "../../app/layout/models/Products";
import ProductList from "./ProductList";

export default function Catalog() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);
  return (
    <>
      <h3>Catalog</h3>
      <ProductList products={products} />
    </>
  );
}
