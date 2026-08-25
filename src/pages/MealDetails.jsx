import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import menuService from "../services/menuService";
import { formatCurrency } from "../utils/formatCurrency";

const resolveImageUrl = (image) => {
  if (!image) {
    return "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80";
  }

  if (/^https?:\/\//i.test(image)) {
    return image;
  }

  const apiBase = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");
  if (image.startsWith("/")) {
    return `${apiBase}${image}`;
  }

  return image;
};
//Normalizing the meal id from the backend 
// The ?? operator means use only meal id that is not null or undefined
const normalizeMeal = (meal) => ({
  _id: meal?._id || meal?.id || meal?.mealId,
  name: meal?.name || "Untitled meal",
  description: meal?.description || meal?.details || "No description provided.",
  price: Number(meal?.price ?? meal?.amount ?? 0),
  category: meal?.category || meal?.mealType || "General",
  //Your application looks for the image in three possible properties:
  image: resolveImageUrl(meal?.image || meal?.img || meal?.photo),
  secondaryImage: resolveImageUrl(meal?.secondaryImage),
});

const MealDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadMeal = async () => {
      try {

      //This is the line that connects this component to your backend/API service.
        const response = await menuService.getMealById(id);
        if (!isMounted) {
          return;
        }

        const mealPayload =
          response?.data?.food ??
          response?.food ??
          response?.data?.meal ??
          response?.meal ??
          response;
        setMeal(normalizeMeal(mealPayload));
      } catch {
        if (isMounted) {
          setMeal(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadMeal();

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="rounded-[2rem] border border-dark-200 bg-white/80 p-8 text-center shadow-card">
        <h1 className="text-2xl font-semibold text-dark-900">
          Loading meal details...
        </h1>
      </div>
    );
  }

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
      <div className="grid gap-3 sm:grid-cols-2">
        <img src={meal.image} alt={meal.name} className="h-80 w-full rounded-[1.5rem] object-cover" />
        {meal.secondaryImage && (
          <img src={meal.secondaryImage} alt={`${meal.name} alternate view`} className="h-80 w-full rounded-[1.5rem] object-cover" />
        )}
      </div>
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
