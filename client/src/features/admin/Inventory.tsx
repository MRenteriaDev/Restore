import {
  Typography,
  Button,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { currencyFormat } from "../../app/util/util";
import UseProducts from "../../app/hooks/useProducts";
import AppPagination from "../../app/components/AppPagination";
import { useAppDispatch } from "../../app/store/configureStore";
import { setProductsParams } from "../catalog/catalogSlice";
import ProductForm from "./ProductForm";
import { useState } from "react";
import { Product } from "../../app/layout/models/Products";

export default function Inventory() {
  const { products, metaData } = UseProducts();
  const dispatch = useAppDispatch();
  const [editMode, setEditMode] = useState(false);
  const [selectProduct, setSelectProduct] = useState<Product | undefined>(
    undefined
  );

  function handleSelectProduct(product: Product) {
    setSelectProduct(product);
    setEditMode(true);
  }

  function cancelEdit() {
    if (selectProduct) setSelectProduct(undefined);
    setEditMode(false);
  }

  if (editMode)
    return <ProductForm product={selectProduct} cancelEdit={cancelEdit} />;

  return (
    <>
      <Box display="flex" justifyContent="space-between">
        <Typography sx={{ p: 2 }} variant="h4">
          Inventory
        </Typography>
        <Button
          sx={{ m: 2 }}
          size="large"
          variant="contained"
          onClick={() => setEditMode(true)}
        >
          Create
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell align="left">Product</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="center">Type</TableCell>
              <TableCell align="center">Brand</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow
                key={product.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {product.id}
                </TableCell>
                <TableCell align="left">
                  <Box display="flex" alignItems="center">
                    <img
                      src={product.pictureUrl}
                      alt={product.name}
                      style={{ height: 50, marginRight: 20 }}
                    />
                    <span>{product.name}</span>
                  </Box>
                </TableCell>
                <TableCell align="right">
                  {currencyFormat(product.price)}
                </TableCell>
                <TableCell align="center">{product.type}</TableCell>
                <TableCell align="center">{product.brand}</TableCell>
                <TableCell align="center">{product.quantityInStock}</TableCell>
                <TableCell align="right">
                  <Button
                    startIcon={<Edit />}
                    onClick={() => handleSelectProduct(product)}
                  />
                  <Button startIcon={<Delete />} color="error" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {metaData && (
        <Box sx={{ pt: 2 }}>
          <AppPagination
            metaData={metaData}
            onPageChange={(page: number) =>
              dispatch(setProductsParams({ pageNumber: page }))
            }
          />
        </Box>
      )}
    </>
  );
}
