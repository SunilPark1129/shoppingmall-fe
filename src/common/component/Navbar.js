import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import {
  faBars,
  faBox,
  faSearch,
  faShoppingBag,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/user/userSlice";
import { getCartQty } from "../../features/cart/cartSlice";
const Navbar = ({ user }) => {
  const dispatch = useDispatch();

  const { cartItemCount } = useSelector((state) => state.cart);
  const isMobile = window.navigator.userAgent.indexOf("Mobile") !== -1;
  const [showSearchBox, setShowSearchBox] = useState(false);
  const [curCategory, setCurCategory] = useState("");
  const menuList = [
    { label: "Women", to: "/?page=1&category=female" },
    { label: "Men", to: "/?page=1&category=male" },
    { label: "Top", to: "/?page=1&category=top" },
    { label: "Pants", to: "/?page=1&category=pants" },
    { label: "Dress", to: "/?page=1&category=dress" },
    { label: "S&P HOME", to: "/" },
    // { label: "Sale", to: "/" },
  ];
  const womenList = [
    { label: "Women Top", to: "/?page=1&category=female&category=top" },
    { label: "Women Pants", to: "/?page=1&category=female&category=pants" },
    { label: "Women Dress", to: "/?page=1&category=female&category=dress" },
    // { label: "Women Sale", to: "/" },
  ];
  const menList = [
    { label: "Men Top", to: "/?page=1&category=male&category=top" },
    { label: "Men Pants", to: "/?page=1&category=male&category=pants" },
    // { label: "Men Sale", to: "/" },
  ];
  let [width, setWidth] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const [query] = useSearchParams();
  const category = query.getAll("category");
  let gender = null;
  if (category.includes("male")) {
    gender = "male";
  } else if (category.includes("female")) {
    gender = "female";
  }

  useEffect(() => {
    if (category.length !== 0) {
      const temp = category.map((item) => {
        if (item === "female") return "women";
        if (item === "male") return "men";
        return item;
      });
      setCurCategory(temp);
    } else {
      setCurCategory("");
    }
  }, [query]);

  const onCheckEnter = (event) => {
    if (event.key === "Enter") {
      if (event.target.value === "") {
        return navigate("/");
      }
      navigate(`/?page=1&name=${event.target.value}`);
    }
  };
  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    if (user) {
      dispatch(getCartQty());
    }
  }, [user]);
  return (
    <div>
      {showSearchBox && (
        <div className="display-space-between mobile-search-box w-100">
          <div className="search display-space-between w-100">
            <div>
              <FontAwesomeIcon className="search-icon" icon={faSearch} />
              <input
                type="text"
                placeholder="Search Product"
                onKeyPress={onCheckEnter}
              />
            </div>
            <button
              className="closebtn"
              onClick={() => setShowSearchBox(false)}
            >
              &times;
            </button>
          </div>
        </div>
      )}
      <div className="side-menu" style={{ width: width }}>
        <button className="closebtn" onClick={() => setWidth(0)}>
          &times;
        </button>

        <div className="side-menu-list" id="menu-list">
          {menuList.map(({ label, to }, index) => (
            <Link
              to={to === "/" ? "/" : `/?page=1&category=${to}`}
              key={index}
              onClick={() => setWidth(0)}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
      {user && user.level === "admin" && (
        <Link to="/admin/product?page=1" className="link-area">
          Admin page
        </Link>
      )}
      <div className="nav-header">
        <div className="display-flex">
          <div className="burger-menu hide">
            <FontAwesomeIcon icon={faBars} onClick={() => setWidth(250)} />
          </div>
          {!isMobile && ( // admin페이지에서 같은 search-box스타일을 쓰고있음 그래서 여기서 서치박스 안보이는것 처리를 해줌
            <div className="nav-search-box">
              <FontAwesomeIcon icon={faSearch} />
              <input
                type="text"
                placeholder="Search Product"
                onKeyPress={onCheckEnter}
              />
            </div>
          )}
          {user ? (
            <div onClick={handleLogout} className="nav-icon">
              <FontAwesomeIcon icon={faUser} />
              {!isMobile && <span style={{ cursor: "pointer" }}>Logout</span>}
            </div>
          ) : (
            <div
              onClick={() => navigate("/login", { state: { from: location } })}
              className="nav-icon"
            >
              <FontAwesomeIcon icon={faUser} />
              {!isMobile && <span style={{ cursor: "pointer" }}>Login</span>}
            </div>
          )}
          <div onClick={() => navigate("/cart")} className="nav-icon">
            <FontAwesomeIcon icon={faShoppingBag} />
            {!isMobile && (
              <span style={{ cursor: "pointer" }}>{`Cart(${
                cartItemCount || 0
              })`}</span>
            )}
          </div>
          <div
            onClick={() => navigate("/account/purchase")}
            className="nav-icon"
          >
            <FontAwesomeIcon icon={faBox} />
            {!isMobile && <span style={{ cursor: "pointer" }}>My Order</span>}
          </div>
          {isMobile && (
            <div className="nav-icon" onClick={() => setShowSearchBox(true)}>
              <FontAwesomeIcon icon={faSearch} />
            </div>
          )}
        </div>
      </div>

      <div className="nav-logo">
        <Link to="/">
          <img
            width={200}
            height={200}
            src="/image/sparklogo.png"
            alt="sparklogo"
          />
        </Link>
      </div>
      <div className="nav-menu-area">
        <div className="nav-menu-area__content">
          <ul className="menu">
            {menuList.map(({ label, to }, index) => {
              let active = false;
              if (curCategory.includes(label.toLowerCase())) {
                active = true;
              }
              return (
                <li key={index} className={`${active && "active"}`}>
                  <Link to={to}>{label}</Link>
                </li>
              );
            })}
          </ul>
          {gender === "male" ? (
            <ul className="menu menu--semi">
              {menList.map(({ label, to }, index) => (
                <li key={index}>
                  <Link to={to}>{label}</Link>
                </li>
              ))}
            </ul>
          ) : (
            gender === "female" && (
              <ul className="menu menu--semi">
                {womenList.map(({ label, to }, index) => (
                  <li key={index}>
                    <Link to={to}>{label}</Link>
                  </li>
                ))}
              </ul>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
