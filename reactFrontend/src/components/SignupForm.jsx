import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext } from "react";
import { LoginContext } from "../App";

export const SignupForm = () => {
  const { setShow, setAuth } = useContext(LoginContext);

  const signup = async (username, email, password1, password2) => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/v1/dj-rest-auth/registration/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            email,
            password1,
            password2,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed on sign up request");
      }

      // Check if the response body is not empty before parsing it
      if (response.statusText !== "No Content") {
        return await response.json();
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  const onSubmit = async (formdata) => {
    const username = formdata.username;
    const email = formdata.email;
    const password1 = formdata.password;
    const password2 = formdata.confirmPassword;

    try {
      const data = await signup(username, email, password1, password2);

      // Check if data is not undefined before trying to access data.key
      if (data) {
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
      }
    } catch (err) {
      // Handle the error
      console.log(err);
    }
  };

  const schema = yup.object().shape({
    username: yup.string().required("username required"),
    email: yup.string().email().required("email required"),
    password: yup.string().min(4).max(20).required("password required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords dont match")
      .required(),
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
      <p className="error">{errors.username?.message}</p>
      <input type="email" placeholder="Email..." {...register("email")} />
      <p>{errors.email?.message}</p>
      <input
        type="password"
        placeholder="Password..."
        {...register("password")}
      />
      <p>{errors.password?.message}</p>
      <input
        type="password"
        placeholder="Confirm Password..."
        {...register("confirmPassword")}
      />
      <p className="error">{errors.confirmPassword?.message}</p>

      <button className="btn3" type="submit">
        Submit
      </button>
    </form>
  );
};
