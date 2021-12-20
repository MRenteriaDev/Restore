import { useEffect } from "react";
import { useState } from "react";
import agent from "../../app/api/agent";
import { Product } from "../../app/layout/models/Products";
import ProductList from "./ProductList";

export default function Catalog() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    agent.Catalog.list().then((products) => {
      setProducts(products);
    });
  },[setProducts]);
  return (
    <>
      <h4>Catalog</h4>
      <ProductList products={products} />
    </>
  );
}
