import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../store/AuthContext";

const Header = () => {
  const authCtx = useContext(AuthContext);

  const handleLogout = () => {
    authCtx.logout();
  };

  return (
    <div className="w-full h-20 bg-white border-b-[1px] border-b-gray-800 sticky top-0 z-50">
      <div className="max-w-screen-xl h-full mx-auto flex item-center justify-between">
        <Link to="/">
          <div>
            <h1 className="text-2xl text-sky-700 font-bold mt-5">
              Expense Tracker
            </h1>
          </div>
        </Link>
        <div className="flex items-center gap-8">
          <ul className="flex items-center gap-8 mt-7 mb-7">
            <Link to="/">
              <li className="text-base text-black font-bold hover:text-orange-900 hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-500">
                Home
              </li>
            </Link>

            {authCtx.isLoggedIn && (
              <Link to="/expenses">
                <li className="text-base text-black font-bold hover:text-orange-900 hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-500">
                  Your Expenses
                </li>
              </Link>
            )}

            {!authCtx.isLoggedIn && (
              <Link
                to="/login"
                className="text-base text-black font-bold hover:text-orange-900
                hover:underline underline-offset-2 decoration-[1px]
                cursor-pointer duration-500"
              >
                Log In
              </Link>
            )}
          </ul>
          {authCtx.isLoggedIn && (
            <Link to="/">
              <button
                className="bg-sky-500/50 text-white py-3 px-6 active:bg-gray-800"
                onClick={handleLogout}
              >
                Log Out
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
