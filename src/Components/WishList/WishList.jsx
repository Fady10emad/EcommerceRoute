import React, { useContext, useState } from "react";
import { WishListContext } from "../../context/WishListProvider";
import { CartContext } from "../../context/CartContextProvider";
import { toast } from "react-toastify";
import { SectionContainer, Card, Button } from "../UI";

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
    <SectionContainer
      title="Your Wishlist"
      subtitle="Items you've saved for later"
    >
      {loading && (
        <div className="fixed inset-0 bg-surface-900/60 backdrop-blur-sm z-50 flex justify-center items-center">
          <div
            className="animate-spin rounded-full h-12 w-12 border-2 border-brand-600 border-t-transparent"
            aria-label="loading"
          />
        </div>
      )}
      <Card className="p-6">
        {!WishListData || WishListData.length === 0 ? (
          <p className="text-center text-surface-500">
            Your wishlist is empty.
          </p>
        ) : (
          <ul className="space-y-6">
            {WishListData.map((item) => (
              <li
                key={item._id}
                className="flex flex-col md:flex-row md:items-center gap-5 border-b pb-6 last:border-b-0"
              >
                <div className="w-full md:w-32 h-32 flex items-center justify-center bg-surface-100 rounded-lg overflow-hidden">
                  <img
                    src={item.imageCover}
                    alt={item.name}
                    className="object-contain h-full w-full"
                  />
                </div>
                <div className="flex-1">
                  <h2 className="text-lg font-semibold mb-2">{item.title}</h2>
                  <p className="text-brand-600 font-bold mb-3">
                    {item.price} EGP
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleRemoveFromWishlist(item._id)}
                    >
                      <i className="fa-solid fa-trash mr-2" /> Remove
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleAddToCart(item._id)}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </SectionContainer>
  );
}
