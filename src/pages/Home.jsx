import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MealCard from "../components/MealCard";
import LoadingSpinner from "../components/LoadingSpinner";
import { useCart } from "../context/CartContext";
import menuService from "../services/menuService";
import { formatCurrency } from "../utils/formatCurrency";

const extractMeals = (payload) => {
  const foodsSource =
    payload?.data?.foods ?? payload?.foods ?? payload?.data ?? payload;

  if (Array.isArray(foodsSource)) {
    return foodsSource;
  }

  if (Array.isArray(payload?.meals)) {
    return payload.meals;
  }

  return [];
};

const normalizeMeal = (meal) => ({
  _id: meal?._id ?? meal?.id ?? meal?.mealId,
  name: meal?.name || "Untitled meal",
  description: meal?.description || meal?.details || "No description provided.",
  price: Number(meal?.price ?? meal?.amount ?? 0),
  category: meal?.category || meal?.mealType || "General",
  image:
    meal?.image ||
    meal?.img ||
    meal?.photo ||
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80",
  secondaryImage: meal?.secondaryImage || "",
  featured: Boolean(meal?.featured ?? meal?.isFeatured ?? false),
  available: meal?.available ?? true,
});

const highValuePerks = [
  {
    title: "Fast delivery",
    text: "Fresh picks delivered to your door in under 30 minutes.",
  },
  {
    title: "Chef-crafted",
    text: "Curated meals prepared with premium ingredients every day.",
  },
  {
    title: "Easy ordering",
    text: "Build your cart in seconds and track your order with ease.",
  },
];

const Home = () => {
  const { addToCart } = useCart();
  const [featuredMeals, setFeaturedMeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadFeaturedMeals = async () => {
      try {
        const response = await menuService.getMeals();
        if (!isMounted) return;

        const meals = extractMeals(response)
          .map(normalizeMeal)
          .filter((meal) => meal.available && meal.featured);
        setFeaturedMeals(meals.slice(0, 4));
      } catch {
        if (isMounted) {
          setFeaturedMeals([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadFeaturedMeals();

    return () => {
      isMounted = false;
    };
  }, []);

  const heroMeal = featuredMeals[0];

  return (
    <div className="space-y-12 pb-4">
      <section
        className="relative overflow-hidden rounded-[2rem] border border-dark-200 p-6 shadow-card sm:p-8 lg:p-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(15, 23, 42, 0.45), rgba(15, 23, 42, 0.55)), url('https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1600&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute -left-20 top-10 h-52 w-52 rounded-full bg-primary-200/50 blur-3xl" />
        <div className="absolute -right-10 bottom-0 h-48 w-48 rounded-full bg-sage-200/60 blur-3xl" />

        <div className="relative grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <span className="inline-flex rounded-full border border-white/30 bg-white/10 px-3 py-1 text-sm font-medium text-white backdrop-blur-sm">
              Online Eatery • Freshly crafted
            </span>

            <div className="space-y-4">
              <h1 className="max-w-xl text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
                Crave-worthy meals, served hot and fast.
              </h1>
              <p className="max-w-xl text-base text-white/85 sm:text-lg">
                Discover chef-inspired favorites, enjoy lightning-fast delivery,
                and build an order you’ll want to repeat.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                to="/menu"
                className="rounded-full bg-green-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-green-700"
              >
                Order now
              </Link>
              <Link
                to="/about"
                className="rounded-full border border-dark-200 bg-white/80 px-6 py-3 text-sm font-semibold text-dark-700 transition hover:border-primary-300 hover:text-primary-600"
              >
                Learn more
              </Link>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {[
                { value: "1200+", label: "Orders" },
                { value: "4.9/5", label: "Rating" },
                { value: "25 min", label: "AVG. delivery" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-white/80 bg-white/70 p-4 shadow-sm backdrop-blur-sm"
                >
                  <p className="text-xl font-semibold text-dark-900">
                    {item.value}
                  </p>
                  <p className="text-sm text-dark-500">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="relative w-full max-w-md overflow-hidden rounded-[2rem] border border-white/70 bg-white/80 p-3 shadow-glass">
              {heroMeal ? (
                <>
                  <img
                    src={heroMeal.image}
                    alt={heroMeal.name}
                    className="h-[260px] w-full rounded-[1.5rem] object-cover sm:h-[300px]"
                  />
                  <div className="absolute inset-x-8 bottom-7 rounded-[1.25rem] border border-white/70 bg-white/85 p-3 shadow-card backdrop-blur-sm">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary-600">
                          Chef’s pick
                        </p>
                        <h2 className="mt-1 text-lg font-semibold text-dark-900">
                          {heroMeal.name}
                        </h2>
                      </div>
                      <span className="rounded-full bg-primary-100 px-2.5 py-1 text-xs font-semibold text-primary-700">
                        {formatCurrency(heroMeal.price)}
                      </span>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex h-[220px] items-center justify-center rounded-[1.5rem] bg-dark-100 text-sm text-dark-600">
                  Loading featured meal...
                </div>
              )}
            </div>

            <div className="absolute left-3 top-3 rounded-full border border-primary-200 bg-white px-3 py-2 text-xs font-semibold text-primary-700 shadow-card sm:left-4 sm:top-6 sm:text-sm">
              Free delivery over $30
            </div>
            <div className="absolute bottom-4 right-3 rounded-full border border-sage-200 bg-white px-3 py-2 text-xs font-semibold text-sage-700 shadow-card sm:right-4 sm:bottom-8 sm:text-sm">
              Today’s special
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {highValuePerks.map((perk) => (
          <div
            key={perk.title}
            className="rounded-[1.5rem] border border-dark-200 bg-white/80 p-5 shadow-card"
          >
            <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-primary-100 text-lg text-primary-600">
              ✓
            </div>
            <h3 className="text-lg font-semibold text-dark-900">
              {perk.title}
            </h3>
            <p className="mt-2 text-sm text-dark-600">{perk.text}</p>
          </div>
        ))}
      </section>

      <section className="space-y-5">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.26em] text-primary-500">
              Featured
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-dark-900">
              Most-loved meals
            </h2>
          </div>
          <Link
            to="/menu"
            className="text-sm font-semibold text-primary-600 transition hover:text-primary-700"
          >
            Explore menu
          </Link>
        </div>

        {loading ? (
          <LoadingSpinner label="Loading featured meals..." />
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {featuredMeals.map((meal) => (
              <MealCard
                key={meal._id}
                meal={meal}
                onAddToCart={(selectedMeal) => addToCart(selectedMeal, 1)}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
