import Button from "components/common/Button";
import { useEffect, useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import {
  Collapse,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
} from "reactstrap";
import { logoutUser, setEmail } from "redux/Auth/slice";
import { setPopUp } from "redux/Common/slice";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { checkTokenEXP, isAuth } from "util/helpers";
import classes from "./Layout.module.scss";

const Header = () => {
  const { email } = useAppSelector((state) => state.Auth);

  const dispatch = useAppDispatch();
  const location = useLocation();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const logout = () => {
    dispatch(
      setPopUp({
        state: true,
        text: "Are you sure to logout?",
        buttons: [
          {
            value: "Logout",
            color: "danger",
            isCloseBTN: false,
            onClick: () => {
              dispatch(logoutUser());
            },
          },
          {
            value: "Close",
            color: undefined,
            isCloseBTN: true,
            onClick: () => {},
          },
        ],
      })
    );
  };

  useEffect(() => {
    if (!email) {
      let emailLocalStorage = localStorage.getItem("email");
      !!emailLocalStorage && dispatch(setEmail(emailLocalStorage));
    }
  }, [email, dispatch]);

  useEffect(() => {
    const token = localStorage.getItem("Mtoken");
    if (token) checkTokenEXP(token, dispatch);
    console.log(location.pathname);
  }, [isAuth()]);

  return (
    <Navbar color="dark" dark expand="sm" fixed="top">
      <Nav className={classes.Wrapper}>
        <NavItem>
          <NavbarBrand tag={Link} to="/">
            Movie App
          </NavbarBrand>
        </NavItem>
        <NavbarToggler className="me-2" onClick={toggle} />
        <Collapse navbar isOpen={isOpen} className={classes.collapseWrapper}>
          <div className={classes.linkWrapper}>
            {isAuth() && (
              <>
                <NavItem>
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? classes.active : undefined
                    }
                    to="/add-movie"
                  >
                    add movie
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? classes.active : undefined
                    }
                    to="/profile"
                  >
                    profile
                  </NavLink>
                </NavItem>
              </>
            )}
            {!isAuth() && (
              <>
                <NavItem>
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? classes.active : undefined
                    }
                    to="/login"
                  >
                    login
                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? classes.active : undefined
                    }
                    to="/register"
                  >
                    register
                  </NavLink>
                </NavItem>
              </>
            )}
          </div>

          {isAuth() && (
            <NavItem>
              <Button color="danger" onClick={logout}>
                Logout
              </Button>
            </NavItem>
          )}
        </Collapse>
      </Nav>
    </Navbar>
  );
};

export default Header;
