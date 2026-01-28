import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import toast from "react-hot-toast";

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signInUser } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (data) => {
    const { email, password } = data;

    try {
      // Firebase Sign In
      const result = await signInUser(email, password);
      const loggedUser = result.user;

      toast.success(`Welcome back, ${loggedUser.displayName || "User"}!`);
      navigate("/"); 

    } catch (error) {
      toast.error(error.message || "Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl text-black font-bold text-center mb-6">
          Login
        </h2>

        <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="input input-bordered w-full"
            {...register("email", { required: true })}
          />
          {errors.email && <p className="text-red-500 text-sm">Email is required</p>}

          <input
            type="password"
            placeholder="Password"
            className="input input-bordered w-full"
            {...register("password", { required: true })}
          />
          {errors.password && <p className="text-red-500 text-sm">Password is required</p>}

          <button className="btn btn-primary w-full">Login</button>
        </form>

        <p className="text-sm text-black text-center mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
