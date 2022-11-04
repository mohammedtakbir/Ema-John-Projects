import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import About from './components/About/About';
import Inventory from './components/Inventory/Inventory';
import Login from './components/Login/Login';
import Orders from './components/Orders/Orders';
import Shipping from './components/Shipping/Shipping';
import Shop from './components/Shop/Shop';
import Signup from './components/Signup/Signup';
import Main from './layouts/Main';
import { ProductsAndCartLoader } from './loaders/ProductsAndCartLoader';
import PrivateRoute from './routers/PrivateRoute';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Main />,
      children: [
        {
          index: true,
          // loader: () => fetch(`http://localhost:5000/products`),
          element: <Shop />
        },
        {
          path: '/shop',
          // loader: () => fetch(`http://localhost:5000/products`),
          element: <Shop />
        },
        {
          path: '/orders',
          loader: ProductsAndCartLoader,
          element: <Orders />
        },
        {
          path: '/inventory',
          element: <PrivateRoute>
            <Inventory />
          </PrivateRoute>
        },
        {
          path: '/about',
          element: <About />
        },
        {
          path: '/login',
          element: <Login />
        },
        {
          path: '/signup',
          element: <Signup />
        },
        {
          path: '/shipping',
          element: <PrivateRoute>
            <Shipping />
          </PrivateRoute>
        }
      ]
    }
  ])
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
