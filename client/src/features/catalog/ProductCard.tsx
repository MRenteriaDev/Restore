import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";
import { Link } from "react-router-dom";
import agent from "../../app/api/agent";
import { Product } from "../../app/layout/models/Products";
import { useStoreContext } from "../../app/context/StoreContext";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const [loading, setLoading] = useState(false);
  const { setBasket } = useStoreContext();

  function handleAddItem(productId: number) {
    setLoading(true);
    agent.Basket.addItem(productId)
      .then((basket) => setBasket(basket))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "secondary.main" }}>
            {product.name.charAt(0).toUpperCase()}
          </Avatar>
        }
        title={product.name}
        titleTypographyProps={{
          sx: { fontWeight: "bold", color: "secondary.main" },
        }}
      ></CardHeader>
      <CardMedia
        sx={{
          height: 140,
          backgroundSize: "contain",
          bgcolor: "primary.light",
        }}
        image={product.pictureUrl}
        title={product.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          ${(product.price / 100).toFixed(2)}
        </Typography>
        <Typography variant="body2" color="GrayText.secondary">
          {product.brand} - {product.type}
        </Typography>
      </CardContent>
      <CardActions>
        <LoadingButton
          loading={loading}
          onClick={() => handleAddItem(product.id)}
          size="small"
        >
          Add To Cart
        </LoadingButton>
        <Button component={Link} to={`catalog/${product.id}`} size="small">
          View
        </Button>
      </CardActions>
    </Card>
  );
}
