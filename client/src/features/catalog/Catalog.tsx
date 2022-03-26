import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  Pagination,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect } from "react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import {
  fetchFiltersAsync,
  fetchProductsAsync,
  productSelector,
} from "./catalogSlice";
import ProductList from "./ProductList";

const sortOptions = [
  { value: "name", label: "Alphabetical" },
  { value: "priceDec", label: "Price - High To Low" },
  { value: "price", label: "Price - Low To High" },
];

export default function Catalog() {
  const products = useAppSelector(productSelector.selectAll);
  const { productsLoaded, status, filtersLoaded, brands, types } =
    useAppSelector((state) => state.catalog);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!productsLoaded) dispatch(fetchProductsAsync());
  }, [productsLoaded, dispatch]);

  useEffect(() => {
    if (!filtersLoaded) dispatch(fetchFiltersAsync());
  }, [dispatch, filtersLoaded]);

  if (status.includes("pending"))
    return <LoadingComponent message="Loading Products" />;

  return (
    <Grid container spacing={4}>
      <Grid item xs={3}>
        <Paper sx={{ mb: 4 }}>
          <TextField label="Search Produtcs" variant="outlined" fullWidth />
        </Paper>
        <Paper sx={{ mb: 2, p: 2 }}>
          <FormControl>
            <RadioGroup>
              {sortOptions.map(({ value, label }) => (
                <FormControlLabel
                  value={value}
                  control={<Radio />}
                  label={label}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </Paper>
        <Paper sx={{ mb: 2, p: 2 }}>
          <FormGroup>
            {brands.map((brand) => (
              <FormControlLabel
                control={<Checkbox />}
                label={brand}
                key={brand}
              />
            ))}
          </FormGroup>
        </Paper>
        <Paper sx={{ mb: 2, p: 2 }}>
          <FormGroup>
            {types.map((type) => (
              <FormControlLabel
                control={<Checkbox />}
                label={type}
                key={type}
              />
            ))}
          </FormGroup>
        </Paper>
      </Grid>
      <Grid item xs={9}>
        <ProductList products={products} />
      </Grid>
      <Grid item xs={3} />
      <Grid item xs={9}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography>
            Displaying 1-6 of 20 items
          </Typography>
          <Pagination  color="secondary" size="large" count={10} page={2} />
        </Box>
      </Grid>
    </Grid>
  );
}
