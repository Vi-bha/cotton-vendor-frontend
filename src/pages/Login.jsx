import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function (props) {
  let [authMode, setAuthMode] = useState("signin");
  const [isItLoading, setLoading] = useState(false);
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm({ mode: "onChange" });
  const changeAuthMode = () => {
    reset()
    setAuthMode(authMode === "signin" ? "signup" : "signin");
  };
  const onSubmitLogin = (data) => {
    console.log(data);
    axios
      .post(`http://localhost:4000/users/login`, data)
      .then((res) => {
        setLoading(false);
        //if (res.data.success) {
        //toast.success(res.data.message);
        localStorage.setItem("auth",JSON.stringify(res.data));
        console.log(res.data.token);
        //Cookies.set("token", res.data.token);
        console.log(res.data);

        //}
        if (!res.data.success) {
          //toast.error(res.data.message);
        }
      })
      // .then(() => refetch())
      .catch((e) => {
         console.log(e);
        setLoading(false);
        //toast.error(e.response.data.message);
      });
  };
  const onSubmitRegister = (data) => {
    console.log(data);
    axios.post(`http://localhost:4000/users/register`, data).then((res) => {
        setLoading(false);
        //if (res.data.success) {
        //toast.success(res.data.message);
        //console.log(res.data.token);
        //Cookies.set("token", res.data.token);
        console.log(res.data);

        //}
        if (!res.data.success) {
          //toast.error(res.data.message);
        }
      }).catch((e) => {
        console.log(e);
       setLoading(false);
       //toast.error(e.response.data.message);
     })
  };

  if (authMode === "signin") {
    return (
      <div className="Auth-form-container">
        <form className="Auth-form" onSubmit={handleSubmit(onSubmitLogin)}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>
            <div className="text-center">
              Not registered yet?{" "}
              <span className="link-primary" onClick={changeAuthMode}>
                Sign Up
              </span>
            </div>
            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                type="email"
                className="form-control mt-1"
                placeholder="Enter email"
                {...register("email", {
                  required: "*Email Address is required",
                })}
              />
              {errors.email && (
                <p className="text-danger">{errors.email.message}</p>
              )}
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Enter password"
                {...register("password", {
                  required: "*Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be 8 characters or longer",
                  },
                })}
              />
              {errors.password && (
                <p className="text-danger">{errors.password.message}</p>
              )}
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
            <p className="text-center mt-2">
              Forgot <a href="#">password?</a>
            </p>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={handleSubmit(onSubmitRegister)}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="text-center">
            Already registered?{" "}
            <span className="link-primary" onClick={changeAuthMode}>
              Sign In
            </span>
          </div>
          <div className="form-group mt-3">
            <label>Full Name</label>
            <input
              {...register("name", {
                required: true,
                maxLength: 40,
                pattern: /^[A-Za-z]+\b/i,
              })}
              type="text"
              className="form-control mt-1"
              placeholder="e.g Jane Doe"
            />
            {errors?.name?.type === "pattern" && (
              <p className="text-danger">*Alphabetical characters only</p>
            )}
            {errors?.name?.type === "maxLength" && (
              <p className="text-danger">*Name cannot exceed 40 characters</p>
            )}
          </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Email Address"
              {...register("email", {
                required: "*Email Address is required",
              })}
            />
            {errors.email && (
              <p className="text-danger">{errors.email.message}</p>
            )}
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Password"
              {...register("password", {
                required: "*Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be 8 characters or longer",
                },
              })}
            />
            {errors.password && (
              <p className="text-danger">{errors.password.message}</p>
            )}
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
          <p className="text-center mt-2">
            Forgot <a href="#">password?</a>
          </p>
        </div>
      </form>
    </div>
  );
}
