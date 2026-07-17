import { mockMeals } from "../utils/mockData";
import { formatCurrency } from "../utils/formatCurrency";

const AdminMenu = () => {
  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] border border-dark-200 bg-white/80 p-6 shadow-card">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary-500">
          Admin
        </p>
        <h1 className="mt-2 text-2xl font-semibold text-dark-900">
          Manage menu
        </h1>
      </div>
      <div className="space-y-4">
        {mockMeals.map((meal) => (
          <div
            key={meal._id}
            className="flex flex-col gap-4 rounded-[1.5rem] border border-dark-200 bg-white p-5 shadow-card sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="font-semibold text-dark-900">{meal.name}</p>
              <p className="text-sm text-dark-500">
                {meal.category} • {formatCurrency(meal.price)}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                className="rounded-full border border-dark-200 px-4 py-2 text-sm font-semibold text-dark-700"
              >
                Edit
              </button>
              <button
                type="button"
                className="rounded-full bg-danger-500 px-4 py-2 text-sm font-semibold text-white"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminMenu;
