import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { logIn as authLogin } from "../store/authSlice";
import { Button, Input, Logo } from "./index.js";
import authService from "../Appwrite/auth.js";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    const [error, setError] = useState("");

    const login = async (data) => {
        setError("");
        try {
            const session = await authService.logIn(data);
            if (session) {
                const userData = await authService.getCurrentUser();
                if (userData) dispatch(authLogin({ userData })); // here we have to pass userdata as an object
                navigate("/");
            }
        } catch (error) {
            setError(error.message);
        }
    };
    return (
        <div className="flex items-center justify-center w-full">
            <div
                className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
            >
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[150px]">
                        <Logo mode="light" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">
                    Sign in to your account
                </h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>

                <div className="h-5">
                    {error && <p className="text-red-600 mt-2 text-center">{error}</p>}
                    {(!errors.email) && errors.password && <div className="text-red-600 mt-2 text-center">{errors.password.message}</div>}
                    {errors.email && <div className="text-red-600 mt-2 text-center">{errors.email.message}</div>}
                </div>

                <form onSubmit={handleSubmit(login)} className="mt-5">
                    <div className="space-y-5">
                        <Input
                            label="Email: "
                            placeholder="Enter your email"
                            type="email"
                            {...register("email", {
                                required: { value: true, message: "Enter the email please" },
                                validate: {
                                    matchPattern: (value) =>
                                        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email address must be a valid address",
                                },
                            })} //we do not need to explicitly pass a ref prop because ...register() provides the ref prop
                        />

                        <Input
                            label="Password: "
                            placeholder="Enter your password"
                            type="password"
                            {...register("password", {
                                required: { value: true, message: "Enter the password please" }
                                , minLength: { value: 8, message: "Password must have atleast 8 characters" }
                            })} //we do not need to explicitly pass a ref prop because ...register() provides the ref prop
                        />


                        <Button type="submit" className="w-full">
                            Sign In
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
