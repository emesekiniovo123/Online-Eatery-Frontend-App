//useState → manages error and loading states.
import { useState } from "react";
//useNavigate → redirects the user after login.
//useLocation → remembers where the user was trying to go.
import { Link, useNavigate, useLocation } from "react-router-dom";
//useForm → handles the login form.
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import Button from "../components/Button";
import Input from "../components/Input";
import { notify } from "../components/ToastProvider";

//Your Login component doesn't directly communicate with the backend here.
//  Instead, it calls: login(...) from your AuthContext.
//The AuthContext is responsible for handling the actual login process.
const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
//error: Stores an error message.
  const [error, setError] = useState("");
  //loading: Check if login req. is process
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
//data: contains the information entered by the user.
  const onSubmit = async (data) => {
    //When the user clicks Sign in: Loading becomes true.
    setLoading(true);
    setError("");

    try {
      await login({
        email: data.email,
        password: data.password,
      });

      notify("Signed in successfully", "success");
//It determines where the user should go after logging in.
      const from = location.state?.from?.pathname || "/";
      navigate(from, { replace: true });
      // Handling error if login failed
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.message ||
        "Unable to sign in";
//Show login failure message
      setError(message);
      notify(message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-6 rounded-[2rem] border border-dark-200 bg-white/80 p-8 shadow-card">
      <div className="space-y-2 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary-500">
          Welcome back
        </p>

        <h1 className="text-3xl font-semibold text-dark-900">
          Sign in to your account
        </h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {error && (
          <p className="rounded-2xl bg-danger-50 p-3 text-sm text-danger-600">
            {error}
          </p>
        )}

        <Input
          label="Email"
          name="email"
          type="email"
          placeholder="you@example.com"
          register={register}
          error={errors.email}
          required
          {...register("email", {
            required: "Email is required",
          })}
        />

        <Input
          label="Password"
          name="password"
          type="password"
          placeholder="Enter your password"
          register={register}
          error={errors.password}
          required
          {...register("password", {
            required: "Password is required",
          })}
        />

        <Button type="submit" fullWidth loading={loading}>
          Signin
        </Button>
      </form>

      <p className="text-center text-sm text-dark-600">
        New here?{" "}
        <Link to="/register" className="font-semibold text-primary-500">
          Signup
        </Link>
      </p>
    </div>
  );
};

export default Login;

