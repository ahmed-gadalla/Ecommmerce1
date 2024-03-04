import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import UserContextProvider from "./Components/Context/UserContext";
import { QueryClient, QueryClientProvider } from "react-query";
import StoreContextProvider from "./Components/Context/CardContext";
import "react-toastify/dist/ReactToastify.css";
import WishStoreContextProvider from "./Components/Context/WishListContext";
import { Offline, Online } from "react-detect-offline";

const root = ReactDOM.createRoot(document.getElementById("root"));

let query = new QueryClient();

root.render(
  <>
      <WishStoreContextProvider>
        <StoreContextProvider>
          <UserContextProvider>
            <QueryClientProvider client={query}>
              <App />
            </QueryClientProvider>
          </UserContextProvider>
        </StoreContextProvider>
      </WishStoreContextProvider>
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
