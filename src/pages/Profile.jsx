import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="rounded-[2rem] border border-dark-200 bg-white/80 p-8 shadow-card">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary-500">
        Profile
      </p>
      <h1 className="mt-2 text-2xl font-semibold text-dark-900">
        Your account details
      </h1>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-[1.25rem] border border-dark-200 bg-cream p-4">
          <p className="text-sm text-dark-500">Name</p>
          <p className="mt-1 font-semibold text-dark-900">
            {user?.name || "Demo Customer"}
          </p>
        </div>
        <div className="rounded-[1.25rem] border border-dark-200 bg-cream p-4">
          <p className="text-sm text-dark-500">Email</p>
          <p className="mt-1 font-semibold text-dark-900">
            {user?.email || "customer@eatery.com"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
