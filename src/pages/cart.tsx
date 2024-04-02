import { cn } from "./../lib/utils";
import { Link } from "react-router-dom";
import { Button } from "./../components/ui/button";
import { GiShoppingCart } from "react-icons/gi";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
  CardDescription,
} from "./../components/ui/card";
import { useProductStore } from "./../store/product";

const CartPage = () => {
  const products = useProductStore((state) => state.products);
  const clearCart = useProductStore((state) => state.clearCart);
  const removeProduct = useProductStore((state) => state.removeProduct);
  const increase = useProductStore((state) => state.increaseProduct);
  const decrease = useProductStore((state) => state.decreaseProduct);
  return (
    <div className="container mx-auto ">
      {products.length > 0 ? (
        <div className="flex justify-between gap-4 lg:flex-row flex-col">
          <Card className="max-w-4xl w-full overflow-auto h-80 ">
            <CardHeader>
              <CardTitle>
                Cart {products.length > 0 && `(${products.length})`}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="flex justify-between items-start border-b border-gray-200 gap-3 py-1"
                >
                  <div className="flex items-start">
                    <div>
                      <img
                        src={product.image}
                        alt={product.title}
                        className="size-16 object-scale-down"
                      />
                      <Button
                        onClick={() => product.id && removeProduct(product.id)}
                        className="mt-2"
                        size="sm"
                        variant="destructive"
                      >
                        Remove
                      </Button>
                    </div>
                    <div className="flex flex-col ml-10">
                      <p>{product.title}</p>
                      <p
                        className={cn("", {
                          "text-green-600":
                            product.category === "women's clothing",
                          "text-blue-600": product.category === "jewelery",
                          "text-yellow-600": product.category === "electronics",
                          "text-red-600": product.category === "men's clothing",
                        })}
                      >
                        {product.category}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p>
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(product.price)}
                    </p>

                    <div className="flex gap-2 mt-4">
                      <Button
                        onClick={() => product.id && decrease(product.id)}
                        size="sm"
                        variant="outline"
                      >
                        -
                      </Button>
                      <span>
                        {products.filter((p) => p.id === product.id).length}
                      </span>
                      <Button
                        onClick={() => product.id && increase(product.id)}
                        size="sm"
                        variant="outline"
                      >
                        +
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button onClick={clearCart}>Clear Cart</Button>
            </CardFooter>
          </Card>
          <Card className=" max-w-sm  h-fit">
            <CardHeader>
              <CardTitle>Cart Summary</CardTitle>
            </CardHeader>
            <CardContent className=" divide-y-2 space-y-2">
              <CardDescription>
                <div className="flex justify-between">
                  <p>Subtotal</p>
                  <p>
                    {products
                      .reduce((acc, product) => acc + product.price, 0)
                      .toFixed(2)}
                  </p>
                </div>
              </CardDescription>
              <CardDescription>
                <div className="flex justify-between">
                  <p>Tax</p>
                  <p>
                    {(
                      products.reduce(
                        (acc, product) => acc + product.price,
                        0
                      ) * 0.1
                    ).toFixed(2)}
                  </p>
                </div>
              </CardDescription>
              <CardDescription>
                <div className="flex justify-between">
                  <p>Total</p>
                  <p>
                    {(
                      products.reduce(
                        (acc, product) => acc + product.price,
                        0
                      ) * 1.1
                    ).toFixed(2)}
                  </p>
                </div>
              </CardDescription>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                Checkout ({" "}
                {(
                  products.reduce((acc, product) => acc + product.price, 0) *
                  1.1
                ).toFixed(2)}
                ){" "}
              </Button>
            </CardFooter>
          </Card>
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-96">
          <div className="flex flex-col items-center">
            <GiShoppingCart className="size-24" />
            <p>Your cart is empty</p>
            <p>Add some products to your cart</p>
            <Button asChild variant="link">
              <Link to="/">Go back to home</Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
