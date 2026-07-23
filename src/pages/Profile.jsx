import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import Button from "../components/Button";
import Input from "../components/Input";

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      address: user?.address || "",
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    setMessage("");
    try {
      await updateProfile(data);
      setMessage("Profile updated successfully.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-[2rem] border border-dark-200 bg-white/80 p-8 shadow-card">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary-500">
        Profile
      </p>
      <h1 className="mt-2 text-2xl font-semibold text-dark-900">
        Update your account details
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
        {message && (
          <p className="rounded-2xl bg-sage-50 p-3 text-sm text-sage-700">
            {message}
          </p>
        )}
        <Input
          label="Full name"
          name="name"
          register={register}
          error={errors.name}
          required
          {...register("name", { required: "Name is required" })}
        />
        <Input
          label="Email"
          name="email"
          type="email"
          register={register}
          error={errors.email}
          required
          {...register("email", { required: "Email is required" })}
        />
        <Input
          label="Phone"
          name="phone"
          placeholder="+1 555 0123"
          register={register}
          error={errors.phone}
          {...register("phone")}
        />
        <Input
          label="Address"
          name="address"
          placeholder="123 Market Street"
          register={register}
          error={errors.address}
          {...register("address")}
        />
        <Button type="submit" loading={loading}>
          Save changes
        </Button>
      </form>
    </div>
  );
};

export default Profile;
