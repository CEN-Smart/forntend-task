import { useCartStore } from './../store/product';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './../components/ui/card';
import { Button } from './../components/ui/button';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';
const CheckOutPage = () => {
  const { cartItems, removeItemFromCart } = useCartStore();
  const quantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const onRemoveItemFromCart = (id: number) => {
    removeItemFromCart(id);
  };

  return (
    <div className="max-w-3xl w-full mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>
            Checkout :{' '}
            {quantity > 0
              ? `(${quantity})
            ${quantity > 1 ? 'items' : 'item'}`
              : ''}
          </CardTitle>
        </CardHeader>
        <CardContent className="max-h-[320px] overflow-y-auto">
          {cartItems.length > 0 ? (
            cartItems.map(item => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg mb-2"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={item.description}
                    className="w-16 h-16 object-scale-down rounded-lg"
                  />
                  <div>
                    <p className="text-gray-500">
                      {item.quantity} x{' '}
                      {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD',
                      }).format(item.price)}
                    </p>
                  </div>
                </div>
                <div>
                  <Button
                    onClick={() => onRemoveItemFromCart(item.id)}
                    variant="link"
                    className="text-red-500"
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <CardDescription>
              Your cart is empty. Add some items to cart.
              <Link to="/">
                <Button variant="link" className="text-blue-500">
                  Start Shopping
                </Button>
              </Link>
            </CardDescription>
          )}
        </CardContent>
        <CardFooter>
          <div className="flex justify-between items-center space-x-2">
            <p className="text-lg">
              Total:{' '}
              {new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
              }).format(
                cartItems.reduce(
                  (acc, item) => acc + item.price * item.quantity,
                  0
                )
              )}
            </p>
            <Link to="/payment">
              <Button
                variant="outline"
                className={cn(``, {
                  'cursor-not-allowed': cartItems.length === 0,
                })}
              >
                Continue
              </Button>
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CheckOutPage;
