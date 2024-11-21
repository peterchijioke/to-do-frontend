import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";

export default function Navigation() {
  return (
    <nav className=" h-20 bg-white fixed shadow w-full flex justify-center">
      <div className="  container w-full flex justify-between items-center gap-2">
        <div className="flex w-fit md:px-0 px-6 h-full justify-center items-center font-bold">
          <span className=" text-3xl text-amber-950">To Do</span>
        </div>
        <button className=" md:hidden block px-6 w-fit">
          <Menu />
        </button>
        <div className=" h-full hidden w-fit md:flex justify-center gap-2">
          <Link
            className=" text-amber-950 hover:text-white h-full px-6 font-semibold hover:bg-amber-950 flex items-center justify-center"
            to="/"
          >
            Dashboard
          </Link>
          <Link
            className=" text-amber-950 hover:text-white h-full font-semibold px-6 hover:bg-amber-950 flex items-center justify-center"
            to="/login"
          >
            Login
          </Link>
          <Link
            className=" text-amber-950 hover:text-white h-full font-semibold px-6 hover:bg-amber-950 flex items-center justify-center"
            to="/login"
          >
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
}
