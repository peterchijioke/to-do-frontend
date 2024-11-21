import React, { useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";

export default function Navigation() {
  const authToken = useMemo(
    () => localStorage.getItem("userToken"),
    [localStorage.getItem("userToken")]
  );
  const navigation = useNavigate();
  const logout = () => {
    localStorage.removeItem("userToken");
    navigation("/");
  };
  return (
    <nav className=" h-20 bg-white fixed shadow w-full flex justify-center py-3">
      <div className="  container w-full flex justify-between items-center gap-2">
        <div className="flex w-fit md:px-0 px-6 h-full justify-center items-center font-bold">
          <Link className=" text-3xl text-amber-950" to={"/"}>
            To-Do
          </Link>
        </div>
        <button className=" md:hidden mx-6 w-fit p-2 border border-amber-950 rounded-md">
          <Menu className=" text-amber-950" />
        </button>
        <div className=" h-full hidden w-fit md:flex justify-center gap-2">
          <Link
            className=" text-amber-950 hover:text-white h-full px-6 font-semibold hover:bg-amber-950 flex items-center justify-center"
            to="/dashboard"
          >
            Dashboard
          </Link>
          {authToken ? (
            <button
              onClick={logout}
              className=" text-amber-950 hover:text-white h-full font-semibold px-6 hover:bg-amber-950 flex items-center justify-center"
            >
              Logout
            </button>
          ) : (
            <Link
              className=" text-amber-950 hover:text-white h-full font-semibold px-6 hover:bg-amber-950 flex items-center justify-center"
              to="/"
            >
              Login
            </Link>
          )}
          <Link
            className=" text-amber-950 hover:text-white h-full font-semibold px-6 hover:bg-amber-950 flex items-center justify-center"
            to="/signup"
          >
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
}
