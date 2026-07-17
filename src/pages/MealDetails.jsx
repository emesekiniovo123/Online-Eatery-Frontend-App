import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { mockMeals } from "../utils/mockData";
import { formatCurrency } from "../utils/formatCurrency";

const MealDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();

  const meal = useMemo(() => mockMeals.find((item) => item._id === id), [id]);

  if (!meal) {
    return (
      <div className="rounded-[2rem] border border-dark-200 bg-white/80 p-8 text-center shadow-card">
        <h1 className="text-2xl font-semibold text-dark-900">Meal not found</h1>
        <Link
          to="/menu"
          className="mt-4 inline-flex text-sm font-semibold text-primary-500"
        >
          Browse meals
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-8 rounded-[2rem] border border-dark-200 bg-white/80 p-6 shadow-card lg:grid-cols-[0.9fr_1.1fr] lg:p-8">
      <img
        src={meal.image}
        alt={meal.name}
        className="h-80 w-full rounded-[1.5rem] object-cover"
      />
      <div className="space-y-5">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary-500">
            Dish details
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-dark-900">
            {meal.name}
          </h1>
        </div>
        <p className="text-lg text-dark-600">{meal.description}</p>
        <div className="rounded-[1.25rem] border border-dark-200 bg-cream p-4">
          <p className="text-sm text-dark-500">Category</p>
          <p className="mt-1 font-semibold text-dark-900">{meal.category}</p>
        </div>
        <div className="flex items-center justify-between rounded-[1.25rem] border border-dark-200 p-4">
          <div>
            <p className="text-sm text-dark-500">Price</p>
            <p className="text-2xl font-semibold text-dark-900">
              {formatCurrency(meal.price)}
            </p>
          </div>
          <button
            type="button"
            onClick={() => addToCart(meal, 1)}
            className="rounded-full bg-primary-400 px-6 py-3 text-sm font-semibold text-dark-900"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default MealDetails;
