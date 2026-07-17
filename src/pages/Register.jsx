import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import Button from "../components/Button";
import Input from "../components/Input";

const Register = () => {
  const navigate = useNavigate();
  const { register: registerUser } = useAuth();
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
      await registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
      });
      navigate("/");
    } catch (err) {
      setError(err.message || "Unable to create account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-6 rounded-[2rem] border border-dark-200 bg-white/80 p-8 shadow-card">
      <div className="space-y-2 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary-500">
          Join us
        </p>
        <h1 className="text-3xl font-semibold text-dark-900">
          Create your account
        </h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {error && (
          <p className="rounded-2xl bg-danger-50 p-3 text-sm text-danger-600">
            {error}
          </p>
        )}
        <Input
          label="Full name"
          name="name"
          placeholder="Jane Doe"
          register={register}
          error={errors.name}
          required
          {...register("name", { required: "Name is required" })}
        />
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
          placeholder="Enter a password"
          register={register}
          error={errors.password}
          required
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
        />
        <Button type="submit" fullWidth loading={loading}>
          Create account
        </Button>
      </form>

      <p className="text-center text-sm text-dark-600">
        Already registered?{" "}
        <Link to="/login" className="font-semibold text-primary-500">
          Sign in
        </Link>
      </p>
    </div>
  );
};

export default Register;
