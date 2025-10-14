import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContextProvider";
import { CartContext } from "../../context/CartContextProvider";
import { Button } from "../UI";

export default function NavBar({ dark, setDark }) {
  const { token, setToken } = useContext(AuthContext);
  const { AllNumberOfItems } = useContext(CartContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  function handleLogout() {
    setToken(null);
    localStorage.removeItem("tkn");
    navigate("/Login");
  }

  const linkBase =
    "px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150";

  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-white/90 dark:bg-surface-800/90 border-b border-surface-200 dark:border-surface-700 shadow-soft">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-4">
          <NavLink to="/" className="flex items-center gap-2">
            <i
              className="fa-solid fa-cart-shopping text-2xl text-brand-600"
              aria-hidden="true"
            />
            <span className="text-xl font-semibold tracking-tight">
              FreshCart
            </span>
          </NavLink>
        </div>
        <nav className="hidden md:flex items-center gap-1">
          <NavLink
            to="/Products"
            className={({ isActive }) =>
              `${linkBase} ${
                isActive
                  ? "text-brand-600 bg-brand-50"
                  : "text-surface-600 hover:text-surface-800 hover:bg-surface-100"
              }`
            }
          >
            Products
          </NavLink>
          <NavLink
            to="/Categories"
            className={({ isActive }) =>
              `${linkBase} ${
                isActive
                  ? "text-brand-600 bg-brand-50"
                  : "text-surface-600 hover:text-surface-800 hover:bg-surface-100"
              }`
            }
          >
            Categories
          </NavLink>
          <NavLink
            to="/Brands"
            className={({ isActive }) =>
              `${linkBase} ${
                isActive
                  ? "text-brand-600 bg-brand-50"
                  : "text-surface-600 hover:text-surface-800 hover:bg-surface-100"
              }`
            }
          >
            Brands
          </NavLink>
          <NavLink
            to="/WishList"
            className={({ isActive }) =>
              `${linkBase} ${
                isActive
                  ? "text-brand-600 bg-brand-50"
                  : "text-surface-600 hover:text-surface-800 hover:bg-surface-100"
              }`
            }
          >
            Wishlist
          </NavLink>
          <NavLink
            to="/Cart"
            className={({ isActive }) =>
              `${linkBase} relative ${
                isActive
                  ? "text-brand-600 bg-brand-50"
                  : "text-surface-600 hover:text-surface-800 hover:bg-surface-100"
              }`
            }
          >
            Cart{" "}
            {AllNumberOfItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded-full">
                {AllNumberOfItems}
              </span>
            )}
          </NavLink>
        </nav>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setDark(!dark)}
            aria-label="Toggle dark mode"
            className="h-9 w-9 inline-flex items-center justify-center rounded-md border border-surface-300 dark:border-surface-600 hover:bg-surface-100 dark:hover:bg-surface-700 transition"
          >
            {dark ? (
              <i className="fa-solid fa-moon"></i>
            ) : (
              <i className="fa-solid fa-sun"></i>
            )}
          </button>
          {token ? (
            <Button variant="outline" size="sm" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button
                variant="primary"
                size="sm"
                onClick={() => navigate("/Login")}
              >
                Login
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => navigate("/Register")}
              >
                Register
              </Button>
            </div>
          )}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden h-9 w-9 inline-flex items-center justify-center rounded-md border border-surface-300 dark:border-surface-600 hover:bg-surface-100 dark:hover:bg-surface-700"
            aria-label="Toggle menu"
          >
            <i className="fa-solid fa-bars"></i>
          </button>
        </div>
      </div>
      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden border-t border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 animate-slideDown">
          <nav className="container py-4 flex flex-col gap-2">
            <NavLink
              onClick={() => setOpen(false)}
              to="/Products"
              className={({ isActive }) =>
                `${linkBase} ${
                  isActive
                    ? "text-brand-600 bg-brand-50"
                    : "text-surface-700 hover:bg-surface-100 dark:hover:bg-surface-700"
                }`
              }
            >
              Products
            </NavLink>
            <NavLink
              onClick={() => setOpen(false)}
              to="/Categories"
              className={({ isActive }) =>
                `${linkBase} ${
                  isActive
                    ? "text-brand-600 bg-brand-50"
                    : "text-surface-700 hover:bg-surface-100 dark:hover:bg-surface-700"
                }`
              }
            >
              Categories
            </NavLink>
            <NavLink
              onClick={() => setOpen(false)}
              to="/Brands"
              className={({ isActive }) =>
                `${linkBase} ${
                  isActive
                    ? "text-brand-600 bg-brand-50"
                    : "text-surface-700 hover:bg-surface-100 dark:hover:bg-surface-700"
                }`
              }
            >
              Brands
            </NavLink>
            <NavLink
              onClick={() => setOpen(false)}
              to="/WishList"
              className={({ isActive }) =>
                `${linkBase} ${
                  isActive
                    ? "text-brand-600 bg-brand-50"
                    : "text-surface-700 hover:bg-surface-100 dark:hover:bg-surface-700"
                }`
              }
            >
              Wishlist
            </NavLink>
            <NavLink
              onClick={() => setOpen(false)}
              to="/Cart"
              className={({ isActive }) =>
                `${linkBase} relative ${
                  isActive
                    ? "text-brand-600 bg-brand-50"
                    : "text-surface-700 hover:bg-surface-100 dark:hover:bg-surface-700"
                }`
              }
            >
              Cart{" "}
              {AllNumberOfItems > 0 && (
                <span className="absolute top-1 right-2 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded-full">
                  {AllNumberOfItems}
                </span>
              )}
            </NavLink>
          </nav>
        </div>
      )}
    </header>
  );
}
