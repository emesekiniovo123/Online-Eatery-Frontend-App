
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import Button from "../components/Button";
import Input from "../components/Input";
import { notify } from "../components/ToastProvider";

const Register = () => {
  const navigate = useNavigate();
  const { register: registerUser } = useAuth();

  // This stores an error message.
  const [error, setError] = useState("");

  // This tells the application whether registration is currently happening.
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // This function executes when the form passes validation and is submitted.
  const onSubmit = async (data) => {
    setLoading(true);
    setError("");

    try {
      await registerUser({
        fullName: data.name,
        email: data.email,
        phone: data.phone,
        address: data.address,
        password: data.password,
      });

      notify("Account created successfully", "success");
      navigate("/");
    } catch (err) {
      const message = err.message || "Unable to create account";
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
          Join us now
        </p>

        <h1 className="text-3xl font-semibold text-dark-900">
          Create your account here
        </h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {error && (
          <p className="rounded-2xl bg-danger-50 p-3 text-sm text-danger-600">
            {error}
          </p>
        )}

        {/* Full Name */}
        <Input
          label="Full name"
          name="name"
          placeholder="Jane Doe"
          register={register}
          error={errors.name}
          required
          {...register("name", {
            required: "Name is required",
          })}
        />

        {/* Email */}
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

        {/* Phone */}
        <Input
          label="Phone"
          name="phone"
          type="tel"
          placeholder="+234 801 234 5678"
          register={register}
          error={errors.phone}
          required
          {...register("phone", {
            required: "Phone number is required",
          })}
        />

        {/* Address */}
        <Input
          label="Address"
          name="address"
          placeholder="123 Market Street, Lagos"
          register={register}
          error={errors.address}
          required
          {...register("address", {
            required: "Address is required",
          })}
        />

        {/* Password */}
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
          Signin
        </Link>
      </p>
    </div>
  );
};

export default Register;

// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import { useAuth } from "../context/AuthContext";
// import Button from "../components/Button";
// import Input from "../components/Input";
// import { notify } from "../components/ToastProvider";

// const Register = () => {
//   const navigate = useNavigate();
//   const { register: registerUser } = useAuth();
//   //This stores an error message.
//   const [error, setError] = useState("");
//   //This tells the application whether registration is currently happening.
//   const [loading, setLoading] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   //This function executes when the form passes validation and is submitted.
//   const onSubmit = async (data) => {
//     setLoading(true);
//     setError("");

//     try {
//       await registerUser({
//         fullName: data.name,
//         email: data.email,
//         password: data.password,
//       });

//       notify("Account created successfully", "success");
//       navigate("/");
//     } catch (err) {
//       const message = err.message || "Unable to create account";
//       setError(message);
//       notify(message, "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="mx-auto flex w-full max-w-2xl flex-col gap-6 rounded-[2rem] border border-dark-200 bg-white/80 p-8 shadow-card">
//       <div className="space-y-2 text-center">
//         <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary-500">
//           Join us now
//         </p>
//         <h1 className="text-3xl font-semibold text-dark-900">
//           Create your account here
//         </h1>
//       </div>

//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//         {error && (
//           <p className="rounded-2xl bg-danger-50 p-3 text-sm text-danger-600">
//             {error}
//           </p>
//         )}
//         <Input
//           label="Full name"
//           name="name"
//           placeholder="Jane Doe"
//           register={register}
//           error={errors.name}
//           required
//           {...register("name", { required: "Name is required" })}
//         />
//         <Input
//           label="Email"
//           name="email"
//           type="email"
//           placeholder="you@example.com"
//           register={register}
//           error={errors.email}
//           required
//           {...register("email", { required: "Email is required" })}
//         ></Input>  
       
  
//         <Input
//           label="Password"
//           name="password"
//           type="password"
//           placeholder="Enter a password"
//           register={register}
//           error={errors.password}
//           required
//           {...register("password", {
//             required: "Password is required",
//             minLength: {
//               value: 6,
//               message: "Password must be at least 6 characters",
//             },
//           })}
//         />
//         <Button type="submit" fullWidth loading={loading}>
//           Create account 
//         </Button>
//       </form>

//       <p className="text-center text-sm text-dark-600">
//         Already registered?{" "}
//         <Link to="/login" className="font-semibold text-primary-500">
//           Signin
//         </Link>
//       </p>
//     </div>
//   );
// };

// export default Register;













