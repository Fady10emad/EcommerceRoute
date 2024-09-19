import { Navbar, Dropdown, Button } from "flowbite-react";
import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContextProvider";
import CartContextProvider, {
  CartContext,
} from "../../context/CartContextProvider";

export default function NavBar() {
  const { token, setToken } = useContext(AuthContext);
  const { AllNumberOfItems } = useContext(CartContext);
  const navigate = useNavigate();

  function handleLogout() {
    setToken(null);
    localStorage.removeItem("tkn");
    navigate("/Login");
  }

  return (
    <div className="bg-gray-800">
      <div className="mx-3">
        <Navbar fluid={true} rounded={true} className="bg-gray-800">
          <Navbar.Brand>
            <NavLink to="/" className="flex items-center">
              <i className="fa-solid fa-cart-shopping text-3xl text-green-600"></i>
              <span className="self-center whitespace-nowrap text-2xl font-semibold text-white ml-2">
                Fresh Cart
              </span>
            </NavLink>
          </Navbar.Brand>

          <div className="flex md:order-2">
            {token ? (
              <Button
                onClick={handleLogout}
                className="text-white bg-red-600 hover:bg-red-700"
              >
                Logout
              </Button>
            ) : (
              <>
                <NavLink
                  to="Login"
                  className="text-white px-4 py-2 hover:text-gray-300"
                >
                  Login
                </NavLink>
                <NavLink
                  to="Register"
                  className="text-white px-4 py-2 hover:text-gray-300"
                >
                  Register
                </NavLink>
              </>
            )}
            <Navbar.Toggle />
          </div>

          <Navbar.Collapse>
            <NavLink
              to="/Cart"
              className="text-white text-lg flex items-center relative"
            >
              <i className="fa-solid fa-cart-shopping mx-2"></i>
              Cart
              {AllNumberOfItems > 0 && (
                <span className="absolute -left-2 bottom-0 bg-red-600 text-white rounded-full px-2 py-1 text-xs font-bold">
                  {AllNumberOfItems}
                </span>
              )}
            </NavLink>
            <NavLink
              to="/WishList"
              className="text-white text-lg px-4 py-2 hover:text-gray-300"
            >
              Wish List
            </NavLink>
            <NavLink
              to="/Products"
              className="text-white text-lg px-4 py-2 hover:text-gray-300"
            >
              Products
            </NavLink>
            <NavLink
              to="/Categories"
              className="text-white text-lg px-4 py-2 hover:text-gray-300"
            >
              Categories
            </NavLink>
            <NavLink
              to="/Brands"
              className="text-white text-lg px-4 py-2 hover:text-gray-300"
            >
              Brands
            </NavLink>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </div>
  );
}
