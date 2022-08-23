import { useEffect } from "react";
import {
  productSelector,
  fetchProductsAsync,
  fetchFiltersAsync,
} from "../../features/catalog/catalogSlice";
import { useAppDispatch, useAppSelector } from "../store/configureStore";

export default function UseProducts() {
  const products = useAppSelector(productSelector.selectAll);
  const {
    productsLoaded,
    filtersLoaded,
    brands,
    types,
    metaData,
  } = useAppSelector((state) => state.catalog);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!productsLoaded) dispatch(fetchProductsAsync());
  }, [productsLoaded, dispatch]);

  useEffect(() => {
    if (!filtersLoaded) dispatch(fetchFiltersAsync());
  }, [dispatch, filtersLoaded]);

  return {
    products,
    productsLoaded,
    filtersLoaded,
    brands,
    types,
    metaData
  }
}
