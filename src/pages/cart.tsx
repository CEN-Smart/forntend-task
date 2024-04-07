import { Link } from 'react-router-dom';
import { Button } from './../components/ui/button';
import { GiShoppingCart } from 'react-icons/gi';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
  CardDescription,
} from './../components/ui/card';
import { useCartStore } from './../store/product';
import CartItem from './../components/cart-item';

const CartPage = () => {
  const { cartItems, clearCart } = useCartStore();
  const quantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const onClearCart = () => {
    clearCart();
  };

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>
            <GiShoppingCart className="inline-block mr-2" />
            Cart :{' '}
            {quantity > 0
              ? `(${quantity})
            ${quantity > 1 ? 'items' : 'item'}`
              : ''}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {cartItems.length > 0 ? (
            cartItems.map(item => <CartItem key={item.id} product={item} />)
          ) : (
            <CardDescription>
              Your cart is empty.{' '}
              <Link to="/">
                <Button variant="link" className="text-blue-500">
                  Start Shopping
                </Button>
              </Link>
            </CardDescription>
          )}
        </CardContent>
        <CardFooter>
          <div className="flex justify-between items-center w-full">
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
            <div className="space-x-4">
              <Button
                onClick={onClearCart}
                className="bg-red-500 text-white"
                disabled={cartItems.length === 0}
              >
                Clear Cart
              </Button>
              <Link to="/checkout">
                <Button
                  className="bg-green-500 text-white"
                  disabled={cartItems.length === 0}
                >
                  Checkout
                </Button>
              </Link>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CartPage;
