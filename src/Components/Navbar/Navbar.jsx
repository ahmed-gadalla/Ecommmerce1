import React, { useContext, useEffect } from "react";
import style from "./Navbar.module.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../Assets/Images/freshcart-logo.svg";
import { UserContext } from "../Context/UserContext";
import { cartContext } from "../Context/CardContext";
import { wishListContext } from "../Context/WishListContext";

export default function Navbar() {
  let { userToken, setUserToken } = useContext(UserContext);
  let navigate = useNavigate();
  let { counter, getCart, setCounter } = useContext(cartContext);
  let { getWishList, wishCounter, setWishCounter } =
    useContext(wishListContext);
  useEffect(() => {
    (async () => {
      let data = await getCart();
      setCounter(data?.numOfCartItems);
    })();
    (async () => {
      let data = await getWishList();
      setWishCounter(data?.count);
    })();
  }, []);

  function logOut() {
    localStorage.removeItem("userToken");
    setUserToken(null);
    navigate("/login");
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary pt-3 fixed-top shadow">
        <div className="container-fluid mx-4">
          <Link className="navbar-brand" to="/">
            <img src={logo} alt="fresh cart logo" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {userToken !== null ? (
                <>
                  <li className="nav-item">
                    <NavLink  
                      className={({isActive}) =>
                        "nav-link" + (isActive ? " activeLink " : " ")
                        
                      }
                      
                    
                      
                      to="/home "
                    >
                      Home
                    </NavLink>
                  </li>

                  <li className="nav-item">
                    <NavLink   className={({isActive}) =>
                        "nav-link" + (isActive ? " activeLink " : " ")
                        
                      } to="/products">
                      Products
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink   className={({isActive}) =>
                        "nav-link" + (isActive ? " activeLink " : " ")
                        
                      } to="/categories">
                      Categories
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink   className={({isActive}) =>
                        "nav-link" + (isActive ? " activeLink " : " ")
                        
                      } to="/brands">
                      Brands
                    </NavLink>
                  </li>
                </>
              ) : (
                ""
              )}
            </ul>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 ">
              <li className=" d-flex alighn-items-center me-5">
                <Link className="nav-link  " to="">
                  <i className="fab fa-facebook"></i>
                </Link>
                <Link className="nav-link  m-lg-0 ms-3" to="">
                  <i className="fab fa-instagram"></i>
                </Link>
                <Link className="nav-link  m-lg-0 ms-3" to="">
                  <i className="fab fa-youtube"></i>
                </Link>
                <Link className="nav-link  m-lg-0 ms-3" to="">
                  <i className="fab fa-tiktok"></i>
                </Link>
                <Link className="nav-link  m-lg-0 ms-3" to="">
                  <i className="fab fa-twitter"></i>
                </Link>
              </li>

              {userToken !== null ? (
                <>
                  <li className="nav-item mt-lg-0 mt-3">
                    <NavLink   className={({isActive}) =>
                        "nav-link position-relative" + (isActive ? " activeLink " : " ")
                        
                      } to="/cart">
                      Cart
                      <i className="fa-solid fa-cart-arrow-down ms-1 fs-4"></i>
                      {counter ? (
                        <span className="position-absolute top-0 start-lg-100 start-35 translate-middle badge rounded-pill bg-danger">
                          {counter}
                        </span>
                      ) : (
                        ""
                      )}
                    </NavLink>
                  </li>
                  <li className="nav-item ms-lg-2 me-3 ">
                    <NavLink
                        className={({isActive}) =>
                      "nav-link position-relative" + (isActive ? " activeLink " : " ")
                      
                    }
                      to="/wishlist"
                    >
                      Wish List
                      <i className="fa-solid fa-heart-circle-check ms-1 fs-4"></i>
                      {wishCounter ? (
                        <span className="position-absolute top-0 start-lg-100 start-30 translate-middle badge rounded-pill bg-danger">
                          {wishCounter}
                        </span>
                      ) : (
                        ""
                      )}
                    </NavLink>
                  </li>

                  <li className="nav-item">
                    <span
                      onClick={() => {
                        logOut();
                      }}
                      className="nav-link   cursor-pointer"
                    >
                      Logout
                    </span>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link  " to="/login">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link  " to="/register">
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>{" "}
    </>
  );
}
