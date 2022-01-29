import { useEffect } from "react";
import { useState } from "react";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Product } from "../../app/layout/models/Products";
import ProductList from "./ProductList";

export default function Catalog() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    agent.Catalog.list()
      .then((products) => {
        setProducts(products);
      })
      .catch((err) => console.log(err.message))
      .finally(() => setLoading(false));
  }, [setProducts]);

  if (loading) return <LoadingComponent message="Loading Products" />;

  return (
    <>
      <h4>Catalog</h4>
      <ProductList products={products} />
    </>
  );
}
