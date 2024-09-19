import React, { useContext, useState } from "react";
import { WishListContext } from "../../context/WishListProvider";
import { CartContext } from "../../context/CartContextProvider";
import { toast } from "react-toastify";
import { FallingLines } from "react-loader-spinner";

export default function WishList() {
  const { WishListData, DeleteFromWishList } = useContext(WishListContext);
  const { AddPorductToCart } = useContext(CartContext);

  const [loading, setLoading] = useState(false);

  async function handleAddToCart(id) {
    setLoading(true);
    const resFlag = await AddPorductToCart(id);
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

  async function handleRemoveFromWishlist(id) {
    setLoading(true);
    const resFlag = await DeleteFromWishList(id);
    if (resFlag) {
      toast.success("🗑️ Product removed from wishlist.", {
        position: "top-right",
        autoClose: 5000,
      });
    } else {
      toast.error("❌ Failed to remove product from wishlist.", {
        position: "top-right",
        autoClose: 5000,
      });
    }
    setLoading(false);
  }

  return (
    <div className="relative">
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <FallingLines color="#fff" width="100" visible={true} />
        </div>
      )}

      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4 text-center md:text-left">
          Your Wishlist
        </h1>
        <div className="bg-white shadow-md rounded-lg p-4">
          {(!WishListData || WishListData.length === 0) ? (
            <p className="text-center text-gray-500">
              Your wishlist is empty.
            </p>
          ) : (
            <ul>
              {WishListData.map((item) => (
                <li
                  key={item.id}
                  className="flex flex-col md:flex-row items-center md:items-start border-b py-4 space-y-4 md:space-y-0"
                >
                  <img
                    src={item.imageCover}
                    alt={item.name}
                    className="w-24 h-24 object-cover mr-0 md:mr-4"
                  />
                  <div className="flex-1 text-center md:text-left">
                    <h2 className="text-xl font-semibold">{item.title}</h2>
                    <p className="text-green-500 my-5">{item.price} EGP</p>

                    <button
                      onClick={() => handleRemoveFromWishlist(item._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg mb-4"
                    >
                      <i className="fa-solid fa-trash me-2"></i>
                      Remove from Wishlist
                    </button>
                  </div>

                  <button
                    onClick={() => handleAddToCart(item._id)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full md:w-auto"
                  >
                    Add to Cart
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
