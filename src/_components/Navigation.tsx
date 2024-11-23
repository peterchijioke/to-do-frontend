import React, { useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
import useUserStore from "../providers/user.provider";

export default function Navigation() {
  const authToken = useMemo(
    () => localStorage.getItem("userToken"),
    [localStorage.getItem("userToken")]
  );
  const { user, setUser } = useUserStore();
  const navigation = useNavigate();
  const logout = () => {
    localStorage.removeItem("userToken");
    setUser(null);
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
          {authToken && (
            <Link
              className=" text-amber-950 hover:text-white h-full px-6 font-semibold hover:bg-amber-950 flex items-center justify-center"
              to="/dashboard"
            >
              Dashboard
            </Link>
          )}
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
          {!authToken && (
            <Link
              className=" text-amber-950 hover:text-white h-full font-semibold px-6 hover:bg-amber-950 flex items-center justify-center"
              to="/signup"
            >
              Register
            </Link>
          )}
          {authToken && user && (
            <Link
              className=" text-amber-950 h-full capitalize font-semibold px-6  flex items-center justify-center"
              to="#"
            >
              Hi, {user.username}
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
