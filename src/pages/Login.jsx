import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import Button from "../components/Button";
import Input from "../components/Input";
import { mockUsers } from "../utils/mockData";
import { notify } from "../components/ToastProvider";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    setError("");

    try {
      const match = mockUsers.find(
        (user) => user.email === data.email && user.password === data.password,
      );

      if (!match) {
        throw new Error("Invalid email or password");
      }

      await login({
        email: data.email,
        password: data.password,
        user: match,
      });
      notify("Signed in successfully", "success");
      const from = location.state?.from?.pathname || "/";
      navigate(from, { replace: true });
    } catch (err) {
      const message = err.message || "Unable to sign in";
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
          {...register("email", { required: "Email is required" })}
        />
        <Input
          label="Password"
          name="password"
          type="password"
          placeholder="Enter your password"
          register={register}
          error={errors.password}
          required
          {...register("password", { required: "Password is required" })}
        />
        <Button type="submit" fullWidth loading={loading}>
          Sign in
        </Button>
      </form>

      <p className="text-center text-sm text-dark-600">
        New here?{" "}
        <Link to="/register" className="font-semibold text-primary-500">
          Create an account
        </Link>
      </p>
    </div>
  );
};

export default Login;
