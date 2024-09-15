import axios from 'axios';
import React, { useContext, useState, useEffect } from 'react';
import { FallingLines } from 'react-loader-spinner';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { CartContext } from '../../context/CartContextProvider';
import { WishListContext } from '../../context/WishListProvider';
import { toast } from 'react-toastify';

export default function ProductDetails() {

  const { AddPorductToCart } = useContext(CartContext);
  const { AddToWishList, DeleteFromWishList, WishListData } = useContext(WishListContext);
  
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
    queryKey: ['ProductDetails', id],
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
      <div className="h-screen bg-blue-300 flex justify-center items-center">
        <FallingLines
          color="#fff"
          width="100"
          visible={true}
          ariaLabel="falling-circles-loading"
        />
      </div>
    );
  }

  const product = data.data.data;

  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col items-center md:flex-row bg-white rounded-lg shadow-lg p-5 shadow-green-500/50">
        <div className="md:w-1/2 p-5">
          <img
            src={product.imageCover}
            alt={product.title}
            className="w-6/12 mx-auto rounded-lg"
          />
        </div>
        <div className="md:w-1/2 p-5">
          <h1 className="text-3xl font-bold mb-5">{product.title}</h1>
          <h2 className="text-xl text-gray-700 mb-5">{product.category.name}</h2>
          <p className="text-gray-600 mb-5">{product.description}</p>
          <p className="text-2xl font-semibold mb-5">
            {product.priceAfterDiscount ? (
              <>
                <span className="line-through text-red-700">{product.price} EGP</span>
                <span className="ml-3 text-green-600">{product.priceAfterDiscount} EGP</span>
              </>
            ) : (
              <span>{product.price} EGP</span>
            )}
          </p>
          <p className="text-yellow-500 mb-5">
            <i className="fa-solid fa-star"></i> {product.ratingsAverage} Rating
          </p>
          <div className="flex justify-between items-center">
            <button
              onClick={() => handleAddToCart(product._id)}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              {loading ? "Adding..." : "Add to Cart"}
            </button>
            <i
              className={`fa-${
                likedProducts ? "solid" : "regular"
              } fa-heart text-3xl cursor-pointer transition-colors duration-300 hover:text-red-500 ${
                likedProducts ? "text-red-500" : "text-gray-500"
              }`}
              onClick={() => handleToggleWishList(product._id)}
              aria-hidden="true"
            ></i>
            {/* {loadingWishlist && <span className="ml-2">Loading...</span>} */}
          </div>
        </div>
      </div>
    </div>
  );
}
