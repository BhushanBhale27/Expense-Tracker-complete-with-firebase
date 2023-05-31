import React from "react";
import Banner from "../components/Banner";

const Home = () => {
  return (
    <div>
      <Banner />
      <h2 className="bg-gray-500 text-white text-4xl py-4 px-6 transition-all duration-500 ease-in-out hover:bg-gray-600 items-center font-semibold font-mono">
        To add your Expenses, please Log In
      </h2>
    </div>
  );
};

export default Home;
