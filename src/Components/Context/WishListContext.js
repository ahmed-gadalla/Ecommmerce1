import axios from "axios";
import { createContext, useState } from "react";
import { useParams } from "react-router-dom";

async function addToWishList(productId) {
  return axios
    .post(
      `https://ecommerce.routemisr.com/api/v1/wishlist`,
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

async function getWishList() {
  return axios
    .get(
      `https://ecommerce.routemisr.com/api/v1/wishlist`,

      {
        headers: {
          token: localStorage.getItem("userToken"),
        },
      }
    )
    .then(({ data }) => data)
    .catch((err) => err);
}

async function dleteItemWishList(productId) {
  return axios
    .delete(
      `https://ecommerce.routemisr.com/api/v1/wishlist/` + productId,

      {
        headers: {
          token: localStorage.getItem("userToken"),
        },
      }
    )
    .then(({ data }) => data)
    .catch((err) => err);
}

export let wishListContext = createContext(0);
export default function WishStoreContextProvider({ children }) {
  let [wishCounter, setWishCounter] = useState(0);
  return (
    <wishListContext.Provider
      value={{
        wishCounter,
        setWishCounter,
        addToWishList,
        getWishList,
        dleteItemWishList,
      }}
    >
      {children}
    </wishListContext.Provider>
  );
}
