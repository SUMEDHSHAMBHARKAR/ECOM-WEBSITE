import { createBrowserRouter, Router, RouterProvider } from "react-router-dom";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Checkout from "./pages/Checkout";
import Success from "./pages/Success";
import ProductDetails from "./pages/ProductDetails";
import MainLayout from "./layouts/MainLayout";


const router = createBrowserRouter([
  {
    path : "/", element: <MainLayout />, children :[
  {
    index: true, element:<Home/>
  },
  {
    path:"products", element: <Products/>
  },
  {
    path:"products/:id", element: <ProductDetails/>
  },
  {
    path :"cart", element: <Cart/>
  },
  {
    path :"checkout", element: <Checkout/>
  },
  {
    path :"success", element: <Success/>
  },
  {
    path:"*", element: <div>404 page not found</div>
  } 
    ]
  }
])


function App() {
  return (
    <div className="main">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
