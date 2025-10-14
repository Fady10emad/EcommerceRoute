import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { CartContext } from "../../context/CartContextProvider";
import { Input, Button, Card, SectionContainer } from "../UI";

export default function Payment() {
  const { cartId, clearUI } = useContext(CartContext);
  const [isOnline, setIsOnline] = useState(true);
  const [loading, setLoading] = useState(false);

  function detectAndCall(values) {
    setLoading(true);
    if (isOnline) {
      createOnlineOrder(values);
    } else {
      createCashOrder(values);
    }
  }

  function createCashOrder(values) {
    const backendBody = {
      shippingAddress: values,
    };

    axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
        backendBody,
        {
          headers: {
            token: localStorage.getItem("tkn"),
          },
        }
      )
      .then((res) => {
        console.log(res);
        clearUI();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function createOnlineOrder(values) {
    const backendBody = {
      shippingAddress: values,
    };

    axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,
        backendBody,
        {
          headers: {
            token: localStorage.getItem("tkn"),
          },
          params: {
            url: "http://localhost:5173",
          },
        }
      )
      .then((res) => {
        window.open(res.data.session.url, "_self");
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const paymentFormik = useFormik({
    initialValues: {
      details: "",
      city: "",
      phone: "",
    },
    onSubmit: detectAndCall,
  });

  return (
    <SectionContainer title="Payment" subtitle="Complete your order">
      {loading && (
        <div className="fixed inset-0 bg-surface-900/60 backdrop-blur-sm z-50 flex items-center justify-center">
          <div
            className="animate-spin rounded-full h-12 w-12 border-2 border-brand-600 border-t-transparent"
            aria-label="loading"
          />
        </div>
      )}
      <Card className="max-w-xl mx-auto p-8">
        <form onSubmit={paymentFormik.handleSubmit} className="space-y-5">
          <Input
            label="Details"
            name="details"
            id="details"
            value={paymentFormik.values.details}
            onBlur={paymentFormik.handleBlur}
            onChange={paymentFormik.handleChange}
            required
          />
          <Input
            label="Phone"
            name="phone"
            id="phone"
            type="tel"
            value={paymentFormik.values.phone}
            onBlur={paymentFormik.handleBlur}
            onChange={paymentFormik.handleChange}
            required
          />
          <Input
            label="City"
            name="city"
            id="city"
            value={paymentFormik.values.city}
            onBlur={paymentFormik.handleBlur}
            onChange={paymentFormik.handleChange}
            required
          />
          <div className="flex gap-4 pt-4">
            <Button
              onClick={() => setIsOnline(false)}
              type="submit"
              variant="secondary"
              className="flex-1"
            >
              Cash Order
            </Button>
            <Button
              onClick={() => setIsOnline(true)}
              type="submit"
              variant="primary"
              className="flex-1"
            >
              Online Order
            </Button>
          </div>
        </form>
      </Card>
    </SectionContainer>
  );
}
