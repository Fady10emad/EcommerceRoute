import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContextProvider";
import { toast } from "react-toastify";
import { CartContext } from "../../context/CartContextProvider";
import { WishListContext } from "../../context/WishListProvider";
import HomeSlider from "../HomeSlider/HomeSlider";
import { Card, Button, SectionContainer, ProductCardSkeleton } from "../UI";

export default function Products() {
  const { AddToWishList, DeleteFromWishList, WishListData, setWishListData } =
    useContext(WishListContext);

  const [loading, setLoading] = useState(false); // Global loading state

  async function handlePostInWishList(id) {
    setLoading(true);
    if (likedProducts.includes(id)) {
      const success = await DeleteFromWishList(id);
      if (success) {
        toast.success("❌ Product removed from your wishlist.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setLikedProducts((prevLikedProducts) =>
          prevLikedProducts.filter((productId) => productId !== id)
        );
      } else {
        toast.error(
          "❌ Failed to remove product from your wishlist. Please try again.",
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );
      }
    } else {
      const success = await AddToWishList(id);
      if (success) {
        toast.success("🎉 Product added to your wishlist successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setLikedProducts((prevLikedProducts) => [...prevLikedProducts, id]);
      } else {
        toast.error(
          "❌ Failed to add product to your wishlist. Please try again.",
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );
      }
    }
    setLoading(false);
  }

  const { token, setToken } = useContext(AuthContext);
  const { AddPorductToCart } = useContext(CartContext);

  function GetAllProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }

  const { data, isError, isLoading } = useQuery({
    queryKey: ["Products"],
    queryFn: GetAllProducts,
  });

  const [likedProducts, setLikedProducts] = useState([]);

  useEffect(() => {
    if (WishListData) {
      const wishlistedProductIds = WishListData.map((product) => product._id);
      setLikedProducts(wishlistedProductIds);
    }
  }, [WishListData]);

  async function handlePostInCart(id) {
    setLoading(true);
    const resFlag = await AddPorductToCart(id);
    if (resFlag) {
      toast.success("🛒 Product added to cart successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.error("❌ Failed to add product to cart.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    setLoading(false);
  }

  if (isError) {
    return <h1>There was an error fetching products.</h1>;
  }

  // Loading state skeleton grid
  if (isLoading) {
    return (
      <SectionContainer
        title="Loading products"
        subtitle="Fetching latest items..."
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <ProductCardSkeleton key={`skeleton-${i}`} />
          ))}
        </div>
      </SectionContainer>
    );
  }

  return (
    <>
      {loading && (
        <div className="fixed inset-0 bg-surface-900/60 backdrop-blur-sm z-50 flex justify-center items-center">
          <div className="flex flex-col items-center gap-4">
            <div
              className="animate-spin rounded-full h-12 w-12 border-2 border-brand-600 border-t-transparent"
              aria-label="loading"
            />
            <p className="text-sm text-surface-100">Processing...</p>
          </div>
        </div>
      )}
      <div className="mb-8">
        <HomeSlider />
      </div>
      <SectionContainer
        title="Our Products"
        subtitle="Browse the latest additions to the catalog"
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {data.data.data.map((item) => (
            <Card
              key={item._id}
              interactive
              padding="md"
              className="flex flex-col"
            >
              <Link
                to={`/ProductDetails/${item._id}`}
                className="block group mb-4"
              >
                <div className="aspect-video w-full overflow-hidden rounded-lg bg-surface-100">
                  <img
                    className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-300"
                    src={item.imageCover}
                    alt={item.title}
                    loading="lazy"
                  />
                </div>
              </Link>
              <div className="flex-1 flex flex-col">
                <h5 className="text-sm font-medium text-brand-600 mb-1 uppercase tracking-wide">
                  {item.category.name}
                </h5>
                <h2 className="text-lg font-semibold text-surface-800 dark:text-surface-100 line-clamp-2 mb-2">
                  {item.title}
                </h2>
                <p className="text-sm text-surface-600 dark:text-surface-300 line-clamp-3 mb-4">
                  {item.description}
                </p>
                <div className="mt-auto flex items-center justify-between">
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl font-bold text-surface-800 dark:text-surface-100">
                      {item.price}
                    </span>
                    <span className="text-xs text-surface-500">EGP</span>
                  </div>
                  <div className="flex items-center gap-1 text-yellow-500 text-sm font-medium">
                    <i className="fa-solid fa-star" aria-hidden="true"></i>
                    {item.ratingsAverage}
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between gap-3">
                  <Button
                    size="sm"
                    variant="primary"
                    onClick={() => handlePostInCart(item._id)}
                  >
                    Add to cart
                  </Button>
                  <button
                    aria-label={
                      likedProducts.includes(item._id)
                        ? "Remove from wishlist"
                        : "Add to wishlist"
                    }
                    onClick={() => handlePostInWishList(item._id)}
                    className={`h-10 w-10 inline-flex items-center justify-center rounded-full border transition-colors ${
                      likedProducts.includes(item._id)
                        ? "border-red-400 bg-red-50 text-red-600"
                        : "border-surface-300 hover:bg-surface-100 text-surface-500"
                    }`}
                  >
                    <i
                      className={`fa-${
                        likedProducts.includes(item._id) ? "solid" : "regular"
                      } fa-heart text-lg`}
                    />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </SectionContainer>
    </>
  );
}
