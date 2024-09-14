import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import Brands from "./Components/Brands/Brands";
import Categories from "./Components/Categories/Categories";
import Products from "./Components/Products/Products";
import AuthContextProvider from "./context/AuthContextProvider";
import { QueryClient, QueryClientProvider } from "react-query";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import Cart from "./Components/Cart/Cart";
import CartContextProvider from "./context/CartContextProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import WishList from "./Components/WishList/WishList";
import WishListProvider from "./context/WishListProvider";
import ProtectedRoute from "./Components/Protected/ProtectedRoute";
import Payment from "./Components/Payment/Payment";

const queryClient = new QueryClient();

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/EcommerceRoute/",
      element: <Layout />,
      children: [
        { path: "/EcommerceRoute/", element: <Register /> },
        { path: "/EcommerceRoute/register", element: <Register /> },
        { path: "/EcommerceRoute/login", element: <Login /> },
        {
          path: "/EcommerceRoute/products",
          element: (
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          ),
        },
        {
          path: "/EcommerceRoute/brands",
          element: (
            <ProtectedRoute>
              <Brands />
            </ProtectedRoute>
          ),
        },
        {
          path: "/EcommerceRoute/categories",
          element: (
            <ProtectedRoute>
              <Categories />
            </ProtectedRoute>
          ),
        },
        { path: "/EcommerceRoute/ProductDetails/:id", element: <ProductDetails /> },
        {
          path: "/EcommerceRoute/Cart",
          element: (
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          ),
        },
        {
          path: "/EcommerceRoute/WishList",
          element: (
            <ProtectedRoute>
              <WishList />
            </ProtectedRoute>
          ),
        },
        {
          path: "/EcommerceRoute/Payment",
          element: (
            <ProtectedRoute>
              <Payment />
            </ProtectedRoute>
          ),
        },
      ],
    },
  ]);

  return (
    <>
      <AuthContextProvider>
        <QueryClientProvider client={queryClient}>
          <CartContextProvider>
            <WishListProvider>
              <RouterProvider router={router}  />
            </WishListProvider>
            <ToastContainer />
          </CartContextProvider>
        </QueryClientProvider>
      </AuthContextProvider>
    </>
  );
}
