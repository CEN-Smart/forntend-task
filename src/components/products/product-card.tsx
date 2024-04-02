import {
  Card,
  CardHeader,
  CardTitle,
  CardFooter,
  CardContent,
} from "../ui/card";

import { EyeOpenIcon } from "@radix-ui/react-icons";

import { cn } from "../../lib/utils";
import { ProductList } from "../../types/product";
import { Button } from "..//ui/button";
import { Link } from "react-router-dom";

interface Product {
  product: ProductList;
}

const ProductCard: React.FC<Product> = ({ product }) => {
  return (
    <Card
      className={cn(`
      flex flex-col justify-between
      bg-white rounded-lg shadow-lg
      transition hover:shadow-xl duration-300
      overflow-hidden group
      relative
    `)}
    >
      <Link
        className={cn(`
        absolute top-6 right-6 text-gray-500
        transition duration-300
        opacity-0 group-hover:opacity-100
       inline-block
       bg-white
        rounded-full
        p-2
        shadow-lg
        z-10
      `)}
        to={`/product/${product.id}`}
      >
        <EyeOpenIcon
          className={cn(`
        size-12
        `)}
        />
      </Link>
      <CardHeader>
        <img
          src={product.image}
          alt={product.title}
          className={cn(`
          w-full max-h-[160px] object-scale-down transition duration-300 
          group-hover:transform group-hover:scale-110
        `)}
        />

        <p>
          <span
            className={cn("", {
              "text-green-600": product.category === "women's clothing",
              "text-blue-600": product.category === "jewelery",
              "text-yellow-600": product.category === "electronics",
              "text-red-600": product.category === "men's clothing",
            })}
          >
            {product.category}
          </span>
        </p>
      </CardHeader>
      <CardContent>
        <CardTitle>{product.title}</CardTitle>
      </CardContent>
      <CardFooter>
        <div className={cn("flex justify-between w-full items-center")}>
          <span>
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(product.price)}
          </span>
          <Button variant="outline" className={cn("button", "button-primary")}>
            Add to Cart
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
