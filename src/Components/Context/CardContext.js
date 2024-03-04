import axios from "axios";
import { createContext, useState } from "react";
import { useParams } from "react-router-dom";
async function cleareCart() {
  return axios
    .delete(
      `https://ecommerce.routemisr.com/api/v1/cart`,

      {
        headers: {
          token: localStorage.getItem("userToken"),
        },
      }
    )
    .then(({ data }) => data)
    .catch((err) => err);
}
async function addToCart(productId) {
  return axios
    .post(
      `https://ecommerce.routemisr.com/api/v1/cart`,
      { productId },
      {
        headers: {
          token: localStorage.getItem("userToken"),
        },
      }
    )
    .then(({ data }) => data)
    .catch((err) => err);
}

async function getCart() {
  return axios
    .get(
      `https://ecommerce.routemisr.com/api/v1/cart`,

      {
        headers: {
          token: localStorage.getItem("userToken"),
        },
      }
    )
    .then(({ data }) => data)
    .catch((err) => err);
}

async function dleteItem(productId) {
  return axios
    .delete(
      `https://ecommerce.routemisr.com/api/v1/cart/` + productId,

      {
        headers: {
          token: localStorage.getItem("userToken"),
        },
      }
    )
    .then(({ data }) => data)
    .catch((err) => err);
}

async function updateQTY(productId, count) {
  return axios
    .put(
      `https://ecommerce.routemisr.com/api/v1/cart/` + productId,
      { count },

      {
        headers: {
          token: localStorage.getItem("userToken"),
        },
      }
    )
    .then(({ data }) => data)
    .catch((err) => err);
}

async function Pay(cartId, shippingAddress) {
  return axios
    .post(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/` +
        cartId,
      { shippingAddress },

      {
        headers: {
          token: localStorage.getItem("userToken"),
        },
      }
    )
    .then(({ data }) => data)
    .catch((err) => err);
}

async function PayCash(cartId, shippingAddress) {
  return axios
    .post(
      `https://ecommerce.routemisr.com/api/v1/orders/` + cartId,
      { shippingAddress },

      {
        headers: {
          token: localStorage.getItem("userToken"),
        },
      }
    )
    .then(({ data }) => data)
    .catch((err) => err);
}

export let cartContext = createContext(0);
export default function StoreContextProvider({ children }) {
  let [counter, setCounter] = useState(0);
  return (
    <cartContext.Provider
      value={{
        counter,
        setCounter,
        addToCart,
        getCart,
        dleteItem,
        updateQTY,
        Pay,
        cleareCart,
        PayCash,
      }}
    >
      {children}
    </cartContext.Provider>
  );
}
