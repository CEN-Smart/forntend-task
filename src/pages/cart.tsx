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
import { useCartStore } from "./../store/product";
import { toast } from "react-hot-toast";

const CartPage = () => {
  const {
    cartItems,
    increaseItemQuantity,
    decreaseItemQuantity,
    removeItemFromCart,
    clearCart,
  } = useCartStore();
  const quantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const productTitle = cartItems.find((item) => item.title);

  const onIncreaseItemQuantity = (id: number) => {
    increaseItemQuantity(id);
  };

  const onDecreaseItemQuantity = (id: number) => {
    decreaseItemQuantity(id);
  };

  const onRemoveItemFromCart = (id: number) => {
    removeItemFromCart(id);
    toast.success(`${productTitle?.title} removed from cart`);
  };

  const onClearCart = () => {
    clearCart();
  };

  return (
    <div className="container mx-auto ">
      {cartItems.length > 0 ? (
        <div className="flex justify-center gap-4 lg:flex-row flex-col">
          <Card className="max-w-4xl w-full overflow-y-auto h-80 ">
            <CardHeader>
              <CardTitle>
                Cart{" "}
                {quantity > 1 ? `(${quantity} items)` : `(${quantity} item)`}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {cartItems.map((product) => (
                <div
                  key={product.id}
                  className="flex justify-between items-start border-b border-gray-200 gap-3 py-1"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start ">
                    <div>
                      <img
                        src={product.image}
                        alt={product.title}
                        className="size-16 object-scale-down"
                      />
                      <Button
                        onClick={() => onRemoveItemFromCart(product.id)}
                        className="sm:mt-2 w-full sm:w-fit mt-6"
                        size="sm"
                        variant="destructive"
                      >
                        Remove
                      </Button>
                    </div>
                    <div className="flex flex-col sm:ml-10 mt-6 sm:mt-0">
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
                        onClick={() => onDecreaseItemQuantity(product?.id)}
                        size="sm"
                        variant="outline"
                      >
                        -
                      </Button>
                      <span>{product.quantity ? product.quantity : 1}</span>
                      <Button
                        onClick={() => onIncreaseItemQuantity(product?.id)}
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
              <Button onClick={onClearCart}>Clear Cart</Button>
            </CardFooter>
          </Card>
          <Card className=" max-w-sm  h-fit shrink-0">
            <CardHeader>
              <CardTitle>Cart Summary</CardTitle>
            </CardHeader>
            <CardContent className=" divide-y-2 space-y-2">
              <CardDescription>
                <div className="flex justify-between">
                  <p>Subtotal</p>
                  <p>
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(
                      cartItems.reduce(
                        (acc, item) => acc + item.price * item.quantity,
                        0
                      )
                    )}
                  </p>
                </div>
              </CardDescription>
              <CardDescription>
                <div className="flex justify-between">
                  <p>Tax</p>
                  <p>
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(
                      cartItems.reduce(
                        (acc, item) => acc + item.price * item.quantity * 0.1,
                        0
                      )
                    )}
                  </p>
                </div>
              </CardDescription>
              <CardDescription>
                <div className="flex justify-between">
                  <p>Total</p>
                  <p>
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(
                      cartItems.reduce(
                        (acc, item) => acc + item.price * item.quantity,
                        0
                      ) +
                        cartItems.reduce(
                          (acc, item) => acc + item.price * item.quantity * 0.1,
                          0
                        )
                    )}
                  </p>
                </div>
              </CardDescription>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link to="/checkout/addresses">
                  Checkout (
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(
                    cartItems.reduce(
                      (acc, item) => acc + item.price * item.quantity,
                      0
                    ) +
                      cartItems.reduce(
                        (acc, item) => acc + item.price * item.quantity * 0.1,
                        0
                      )
                  )}
                  )
                </Link>
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
