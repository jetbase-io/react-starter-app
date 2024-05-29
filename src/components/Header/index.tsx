import classNames from "classnames";
import PropTypes from "prop-types";
import React, { FC, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import {
  CONTACT_US_ROUTE,
  PLANS_ROUTE,
  PROFILE_ROUTE,
  RESET_PASSWORD_ROUTE,
  SIGN_IN_ROUTE,
  SIGN_UP_ROUTE,
} from "../../store/constants/route-constants";
import { Dispatch, RootState } from "../../store/store";
import HeaderLink from "../HeaderLink";
import { useSignOut } from "../../hooks/user/useSignOut";

type HeaderPageProps = ReturnType<typeof mapState>;

const Header: FC<HeaderPageProps> = ({ isAuthenticated }) => {
  const [openBurger, setOpenBurger] = useState(false);
  const { mutate: signOut } = useSignOut();

  const handleSignOutClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    signOut();
  };

  const LINKS = [
    { id: 0, text: "Main", to: "/", isVisible: isAuthenticated },
    { id: 1, text: "Plans", to: PLANS_ROUTE, isVisible: isAuthenticated },
    {
      id: 2,
      text: "My Profile",
      to: PROFILE_ROUTE,
      isVisible: isAuthenticated,
    },
  ];

  const toggle = () => {
    setOpenBurger(!openBurger);
  };

  const burgerClass = classNames({
    block: openBurger,
    hidden: !openBurger,
  });

  return (
    <header className="sticky top-0 shadow-sm">
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <div className="flex flex-wrap items-center justify-between max-w-screen-xl mx-auto">
          <a href="/" className="flex items-center">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-6 mr-3 sm:h-9"
              alt="Flowbite Logo"
            />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              JetBase.IO
            </span>
          </a>
          <div className="flex items-center lg:order-2">
            <Link
              to={CONTACT_US_ROUTE}
              className="text-black bg-[#ffffff] hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
            >
              Contact Us
            </Link>
            {isAuthenticated && (
              <button
                onClick={handleSignOutClick}
                className="text-white bg-[#117ff9] hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
              >
                Sign out
              </button>
            )}
            <button
              onClick={toggle}
              data-collapse-toggle="mobile-menu-2"
              type="button"
              className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="mobile-menu-2"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <svg
                className="hidden w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <div
            className={`${burgerClass} justify-between items-center w-full lg:flex lg:w-auto lg:order-1`}
            id="mobile-menu-2"
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              {LINKS.map(
                ({ id, text, to, isVisible }) =>
                  isVisible && <HeaderLink key={id} text={text} to={to} />
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

Header.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapState = (state: RootState) => ({
  isAuthenticated: state.user.isAuthenticated,
});

export default connect(mapState)(Header);
