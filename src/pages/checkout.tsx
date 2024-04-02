import { useCartStore } from "./../store/product";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./../components/ui/card";
import { Button } from "./../components/ui/button";
const CheckOutPage = () => {
  const { cartItems } = useCartStore();
  const quantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  return (
    <div className="max-w-6xl w-full p-2 mx-auto flex flex-col sm:flex-row gap-4">
      <Card
        className={`
            h-fit flex-1 shrink-0
      `}
      >
        <CardHeader>
          <CardTitle>Shipping Address</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <CardDescription>
            <div className="flex justify-between">
              <p>Address</p>
              <p>1234 Main Street</p>
            </div>
          </CardDescription>
          <CardDescription>
            <div className="flex justify-between">
              <p>City</p>
              <p>City Name</p>
            </div>
          </CardDescription>
          <CardDescription>
            <div className="flex justify-between">
              <p>State</p>
              <p>State Name</p>
            </div>
          </CardDescription>
          <CardDescription>
            <div className="flex justify-between">
              <p>Zip Code</p>
              <p>12345</p>
            </div>
          </CardDescription>
        </CardContent>
      </Card>

      <Card className=" max-w-sm  h-fit shrink-0">
        <CardHeader>
          <CardTitle>
            Order Summary with a total of {quantity}{" "}
            {quantity > 1 ? "items" : "item"}
          </CardTitle>
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
          <Button variant="outline" className="w-full">
            Confirm Order
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CheckOutPage;
