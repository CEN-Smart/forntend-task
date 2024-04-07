import NavbarWrapper from './components/header/navbar-wrapper';
import Product from './pages/product';
import HomePage from './pages/products';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import CartPage from './pages/cart';
import CheckOutPage from './pages/checkout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <NavbarWrapper />,
    errorElement: <div>404 Not Found</div>,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: 'cart',
        element: <CartPage />,
      },
      {
        path: 'cart/checkout',
        element: <CheckOutPage />,
      },
      {
        path: 'product/:productId',
        element: <Product />,
      },
    ],
  },
]);
const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
