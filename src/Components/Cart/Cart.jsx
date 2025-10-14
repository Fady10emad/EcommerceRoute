import React, { useContext, useState } from "react";
import { CartContext } from "../../context/CartContextProvider";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { SectionContainer, Button, Card } from "../UI";

export default function Cart() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    AllProductsCart,
    TotalPrice,
    AllNumberOfItems,
    updateCount,
    deleteProduct,
    handleClearAll,
  } = useContext(CartContext);

  function handleUpdate(id, Count) {
    updateCount(id, Count);
  }

  async function handleClearing() {
    setLoading(true);
    const res = await handleClearAll();
    if (res && res.status === 200) {
      toast.success("🛒 Cart cleared successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
      navigate("/products");
    } else {
      toast.error("❌ Failed to clear the cart.", {
        position: "top-right",
        autoClose: 2000,
      });
    }
    setLoading(false);
  }

  async function handleDelete(id) {
    setLoading(true);
    const res = await deleteProduct(id);
    if (res) {
      toast.success("🛒 Product removed from cart successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
    } else {
      toast.error("❌ Failed to remove product from cart.", {
        position: "top-right",
        autoClose: 2000,
      });
    }
    setLoading(false);
  }

  return (
    <SectionContainer
      title="Your Cart"
      subtitle="Manage items ready for checkout"
    >
      {loading && (
        <div className="fixed inset-0 bg-surface-900/60 backdrop-blur-sm z-50 flex justify-center items-center">
          <div
            className="animate-spin rounded-full h-12 w-12 border-2 border-brand-600 border-t-transparent"
            aria-label="loading"
          />
        </div>
      )}
      <div className="flex flex-wrap gap-3 mb-6">
        <Card className="px-4 py-2 text-sm font-medium bg-brand-50 text-brand-700">
          Total Price: {TotalPrice} EGP
        </Card>
        <Card className="px-4 py-2 text-sm font-medium bg-brand-50 text-brand-700">
          Total Items: {AllNumberOfItems}
        </Card>
        <Button variant="danger" size="sm" onClick={handleClearing}>
          Clear All
        </Button>
        <Button
          variant="primary"
          size="sm"
          onClick={() => navigate("/Payment")}
        >
          Checkout
        </Button>
      </div>
      <div className="overflow-x-auto rounded-xl border border-surface-200 bg-white dark:bg-surface-800 shadow-soft">
        <table className="w-full text-sm">
          <thead className="text-xs uppercase tracking-wide text-surface-600 dark:text-surface-300 bg-surface-100 dark:bg-surface-700">
            <tr>
              <th className="px-4 py-3 text-left">Product</th>
              <th className="px-4 py-3 text-left">Qty</th>
              <th className="px-4 py-3 text-left">Price</th>
              <th className="px-4 py-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {AllProductsCart?.map((product) => (
              <tr
                key={product._id}
                className="border-t border-surface-200 dark:border-surface-700"
              >
                <td className="px-4 py-3">
                  <Link
                    to={`/ProductDetails/${product.product._id}`}
                    className="flex items-center gap-3"
                  >
                    <img
                      src={product.product.imageCover}
                      alt={product.name}
                      className="h-14 w-14 object-contain rounded-md bg-surface-50"
                    />
                    <span className="font-medium text-surface-800 dark:text-surface-100 line-clamp-2 max-w-xs">
                      {product.name}
                    </span>
                  </Link>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        handleUpdate(product.id, product.quantity - 1)
                      }
                      aria-label="Decrease quantity"
                    >
                      -
                    </Button>
                    <input
                      readOnly
                      value={product.quantity}
                      className="w-14 text-center rounded-md border border-surface-300 bg-surface-50 py-1"
                    />
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        handleUpdate(product.id, product.quantity + 1)
                      }
                      aria-label="Increase quantity"
                    >
                      +
                    </Button>
                  </div>
                </td>
                <td className="px-4 py-3 font-semibold">{product.price} EGP</td>
                <td className="px-4 py-3">
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => handleDelete(product.product._id)}
                  >
                    Remove
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionContainer>
  );
}
