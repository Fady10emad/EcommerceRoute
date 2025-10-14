import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { CartContext } from "../../context/CartContextProvider";
import { WishListContext } from "../../context/WishListProvider";
import { toast } from "react-toastify";
import { Card, Button, SectionContainer, ProductCardSkeleton } from "../UI";

export default function ProductDetails() {
  const { AddPorductToCart } = useContext(CartContext);
  const { AddToWishList, DeleteFromWishList, WishListData } =
    useContext(WishListContext);

  const [likedProducts, setLikedProducts] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingWishlist, setLoadingWishlist] = useState(false); // loading state for wishlist
  const { id } = useParams();

  useEffect(() => {
    if (WishListData) {
      const isWishlisted = WishListData.some((product) => product._id === id);
      setLikedProducts(isWishlisted);
    }
  }, [WishListData, id]);

  async function handleAddToCart(productId) {
    setLoading(true);
    const resFlag = await AddPorductToCart(productId);
    if (resFlag) {
      toast.success("🛒 Product added to cart successfully!", {
        position: "top-right",
        autoClose: 5000,
      });
    } else {
      toast.error("❌ Failed to add product to cart.", {
        position: "top-right",
        autoClose: 5000,
      });
    }
    setLoading(false);
  }

  async function handleToggleWishList(productId) {
    setLoadingWishlist(true);
    if (likedProducts) {
      const success = await DeleteFromWishList(productId);
      if (success) {
        toast.success("❌ Product removed from your wishlist.", {
          position: "top-right",
          autoClose: 5000,
        });
        setLikedProducts(false);
      } else {
        toast.error("❌ Failed to remove product from your wishlist.", {
          position: "top-right",
          autoClose: 5000,
        });
      }
    } else {
      const success = await AddToWishList(productId);
      if (success) {
        toast.success("🎉 Product added to your wishlist successfully!", {
          position: "top-right",
          autoClose: 5000,
        });
        setLikedProducts(true);
      } else {
        toast.error("❌ Failed to add product to your wishlist.", {
          position: "top-right",
          autoClose: 5000,
        });
      }
    }
    setLoadingWishlist(false);
  }

  function ProductDetailsFunc() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }

  const { data, isError, isLoading } = useQuery({
    queryKey: ["ProductDetails", id],
    queryFn: ProductDetailsFunc,
  });

  if (isError) {
    return (
      <div className="h-screen bg-red-100 flex justify-center items-center">
        <h1 className="text-red-500 text-2xl">Error loading product details</h1>
      </div>
    );
  }

  if (isLoading) {
    return (
      <SectionContainer title="Loading product" subtitle="Fetching details...">
        <ProductCardSkeleton />
      </SectionContainer>
    );
  }

  const product = data.data.data;

  return (
    <SectionContainer title={product.title} subtitle={product.category.name}>
      <Card className="grid md:grid-cols-2 gap-10" padding="lg">
        <div className="flex items-start justify-center">
          <div className="w-full max-w-md aspect-square bg-surface-100 rounded-xl overflow-hidden flex items-center justify-center">
            <img
              src={product.imageCover}
              alt={product.title}
              className="object-contain w-full h-full"
            />
          </div>
        </div>
        <div className="flex flex-col">
          <p className="text-sm text-surface-600 mb-4 leading-relaxed">
            {product.description}
          </p>
          <div className="mb-6">
            {product.priceAfterDiscount ? (
              <div className="flex items-baseline gap-3">
                <span className="text-lg font-medium line-through text-red-600">
                  {product.price} EGP
                </span>
                <span className="text-2xl font-bold text-brand-600">
                  {product.priceAfterDiscount} EGP
                </span>
              </div>
            ) : (
              <span className="text-2xl font-bold text-brand-600">
                {product.price} EGP
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 text-yellow-500 mb-6">
            <i className="fa-solid fa-star" aria-hidden="true"></i>
            <span className="text-sm font-medium">
              {product.ratingsAverage} Rating
            </span>
          </div>
          <div className="flex gap-3">
            <Button
              variant="primary"
              onClick={() => handleAddToCart(product._id)}
              disabled={loading}
            >
              {loading ? "Adding..." : "Add to Cart"}
            </Button>
            <button
              aria-label={
                likedProducts ? "Remove from wishlist" : "Add to wishlist"
              }
              onClick={() => handleToggleWishList(product._id)}
              className={`h-11 w-11 inline-flex items-center justify-center rounded-md border transition-colors ${
                likedProducts
                  ? "border-red-400 bg-red-50 text-red-600"
                  : "border-surface-300 hover:bg-surface-100 text-surface-600"
              }`}
            >
              <i
                className={`fa-${
                  likedProducts ? "solid" : "regular"
                } fa-heart text-lg`}
              />
            </button>
          </div>
        </div>
      </Card>
    </SectionContainer>
  );
}
