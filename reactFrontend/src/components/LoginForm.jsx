import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext } from "react";
import { LoginContext } from "../App";

export const LoginForm = () => {
  const { setShow, setAuth } = useContext(LoginContext);

  const login = (username, password) => {
    return fetch("http://127.0.0.1:8000/api/v1/dj-rest-auth/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
  };

  const onSubmit = async (formdata) => {
    const username = formdata.username;
    const password = formdata.password;

    try {
      const response = await login(username, password);

      if (response.status !== 200) {
        alert("Please try again.");
        return;
      }

      const data = await response.json();

      if (data.error) {
        alert("Error Password or Username");
        return;
      }

      localStorage.setItem("authKey", "Token " + data.key);
      fetch("http://127.0.0.1:8000/api/v1/dj-rest-auth/user/", {
        method: "GET",
        headers: {
          Authorization: localStorage.getItem("authKey"),
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          localStorage.setItem("userDetails", JSON.stringify(data));
        });
      setShow(false);
      setAuth(true);
    } catch (err) {
      console.log(err);
    }
  };

  const schema = yup.object().shape({
    username: yup.string().required("Username required"),
    password: yup.string().min(4).max(20).required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <form className="Form" onSubmit={handleSubmit(onSubmit)}>
      <input type="text" placeholder="Username..." {...register("username")} />
      <p>{errors.username?.message}</p>
      <input
        type="password"
        placeholder="Password..."
        {...register("password")}
      />

      <button className="btn3" type="submit">
        Submit
      </button>
    </form>
  );
};
