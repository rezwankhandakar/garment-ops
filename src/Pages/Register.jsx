import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';
import toast from 'react-hot-toast';
import useAxiosSecure from '../Hooks/useAxiosSecure';

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createUser, updateUserProfile } = useAuth();
    const navigate = useNavigate();
    const axiosSecure= useAxiosSecure()

    const handleRegister = async (data) => {
        const { name, email, password, photoURL, role } = data;

        // 🔐 Password Validation
        if (!/(?=.*[A-Z])/.test(password)) {
            return toast.error("Password must contain at least one uppercase letter");
        }
        if (!/(?=.*[a-z])/.test(password)) {
            return toast.error("Password must contain at least one lowercase letter");
        }
        if (password.length < 6) {
            return toast.error("Password must be at least 6 characters long");
        }

      try {
      // Create user in Firebase
      await createUser(email, password);
      await updateUserProfile(name, photoURL);

      // Save user in MongoDB
      const userInfo = {
        name,
        email,
        photoURL,
        role,
        status: "pending"
      };

      await axiosSecure.post("/users", userInfo);

      toast.success("Registration successful!");
      navigate("/");

  } catch (error) {
      toast.error(error.response?.data?.message || error.message);
  }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl text-black font-bold text-center mb-6">
                    Create Account
                </h2>

                <form onSubmit={handleSubmit(handleRegister)} className="space-y-4">

                    <input
                        type="text"
                        placeholder="Full Name"
                        className="input input-bordered w-full"
                        {...register("name", { required: true })}
                    />
                    {errors.name && <p className="text-red-500 text-sm">Name is required</p>}

                    <input
                        type="email"
                        placeholder="Email"
                        className="input input-bordered w-full"
                        {...register("email", { required: true })}
                    />
                    {errors.email && <p className="text-red-500 text-sm">Email is required</p>}

                    <input
                        type="text"
                        placeholder="Photo URL"
                        className="input input-bordered w-full"
                        {...register("photoURL", { required: true })}
                    />
                    {errors.photoURL && <p className="text-red-500 text-sm">Photo URL is required</p>}

                    <select
                        className="select select-bordered w-full"
                        {...register("role", { required: true })}
                    >
                        <option value="">Select Role</option>
                        <option value="buyer">Buyer</option>
                        <option value="manager">Manager</option>
                    </select>
                    {errors.role && <p className="text-red-500 text-sm">Role is required</p>}

                    <input
                        type="password"
                        placeholder="Password"
                        className="input input-bordered w-full"
                        {...register("password", { required: true })}
                    />
                    {errors.password && <p className="text-red-500 text-sm">Password is required</p>}

                    <button className="btn btn-primary w-full">
                        Register
                    </button>
                </form>

                <p className="text-sm text-black text-center mt-4">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-600 hover:underline">
                        Login here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
