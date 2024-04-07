import { cn } from './../lib/utils';
import { useCartStore } from './../store/product';
import { CartProduct } from './../types/product';
import { Button } from './ui/button';

interface CartItemProps {
  product: CartProduct;
}
const CartItem: React.FC<CartItemProps> = ({ product }) => {
  const { increaseItemQuantity, decreaseItemQuantity, removeItemFromCart } =
    useCartStore();

  const onIncreaseItemQuantity = (id: number) => {
    increaseItemQuantity(id);
  };

  const onDecreaseItemQuantity = (id: number) => {
    decreaseItemQuantity(id);
  };

  const onRemoveItemFromCart = (id: number) => {
    removeItemFromCart(id);
  };

  return (
    <div
      className={`
    max-w-3xl w-full overflow-y-auto bg-gray-50 mb-3 p-4 rounded-lg shadow-md
    `}
    >
      <div className="flex flex-col xs:flex-row xs:justify-between xs:items-center">
        <div className="flex items-center space-x-4">
          <img
            src={product.image}
            alt={product.description}
            className="size-16 object-scale-down rounded-lg"
          />
          <div>
            <p
              className={cn('', {
                'text-green-600': product.category === "women's clothing",
                'text-blue-600': product.category === 'jewelery',
                'text-yellow-600': product.category === 'electronics',
                'text-red-600': product.category === "men's clothing",
              })}
            >
              {product.category}
            </p>
            <p className="text-gray-500">
              {product.quantity} x{' '}
              {new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
              }).format(product.price)}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-4 mt-3 xs:mt-0">
          <Button
            onClick={() => onDecreaseItemQuantity(product.id)}
            className={cn('px-2 py-1', {
              'bg-gray-300': product.quantity === 1,
            })}
            disabled={product.quantity === 1}
          >
            -
          </Button>
          <p>{product.quantity}</p>
          <Button
            onClick={() => onIncreaseItemQuantity(product.id)}
            className="px-2 py-1"
          >
            +
          </Button>
          <Button
            onClick={() => onRemoveItemFromCart(product.id)}
            className="px-2 py-1"
          >
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
