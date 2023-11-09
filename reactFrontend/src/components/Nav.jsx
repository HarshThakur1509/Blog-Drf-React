import { Link } from "react-router-dom";
import { AiFillAppstore } from "react-icons/ai";
import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../App";

export const Nav = () => {
  const { setShow, setReg, auth, setAuth } = useContext(LoginContext);
  const [log, setLog] = useState(null);
  useEffect(() => {
    const ShowAuth = () => {
      return localStorage.getItem("authKey") !== null ? (
        <button
          className="btn1"
          onClick={() => {
            localStorage.clear();
            setAuth(false);
          }}
        >
          Logout
        </button>
      ) : (
        <div className="my-auto [&>*]:p-2">
          <button
            className="mr-3  btn2"
            onClick={() => {
              setShow(true);
              setReg(false);
            }}
          >
            Login
          </button>
          <button
            className="bg-[var(--sec)] rounded-lg"
            onClick={() => {
              setShow(true);
              setReg(true);
            }}
          >
            Sign up
          </button>
        </div>
      );
    };
    setLog(ShowAuth);
  }, [auth]);

  return (
    <nav className="Nav flex justify-between px-4  py-4 shadow-lg">
      {/* logo */}
      <div className=" flex items-center cursor-pointer">
        <AiFillAppstore />
      </div>
      {/* menu items */}
      <ul className=" flex [&>*]:px-4  items-center">
        <li className="">
          <Link to="/" className="btn1">
            Home
          </Link>
        </li>
        <li className="">
          <Link to="/post" className=" btn1">
            Post
          </Link>
        </li>
        <li className="">
          <Link to="/todo" className=" btn1">
            Todo
          </Link>
        </li>
      </ul>
      {/* CTA */}
      {log}
    </nav>
  );
};
