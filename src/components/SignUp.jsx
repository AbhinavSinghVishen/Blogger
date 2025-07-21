import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router";
import { Button, Logo, Input } from "./index.js";
import authService from "../Appwrite/auth.js";
import { logIn } from "../store/authSlice";

const SignUp = () => {
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const signUp = async (data) => {
        setError("");
        try {
            const userData = await authService.createAccount(data);
            if (userData) {
                const userData = await authService.getCurrentUser();
                if (userData) dispatch(logIn({ userData })); // here we have to pass userdata inside an object
                navigate("/");
            }
        } catch (error) {
            setError(error.message);
        }
    };
    return (
        <div className="flex items-center justify-center">
            <div
                className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
            >
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[150px]">
                        <Logo mode="light" />
                    </span>
                </div>

                <h2 className="text-center text-2xl font-bold leading-tight">
                    Sign up to create account
                </h2>

                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>

                <div className="h-5">
                    {error && <p className="text-red-600 mt-2 text-center">{error}</p>}
                    {(!errors.email) && errors.password && <div className="text-red-600 mt-2 text-center">{errors.password.message}</div>}
                    {errors.email && <div className="text-red-600 mt-2 text-center">{errors.email.message}</div>}
                </div>

                <form onSubmit={handleSubmit(signUp)} className="mt-5">
                    <div
                        className='space-y-5'
                    >
                        <Input
                            label='Full Name: '
                            placeholder='Enter your full name'
                            {...register('name', { required: { value: true, message: "Enter the name please" }, })}
                        />

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

                        {/* we can add confirm password input section */}

                        <Button type="submit" className="w-full">
                            Create Account
                        </Button>

                    </div>
                </form>

            </div>
        </div>
    );
};

export default SignUp;
