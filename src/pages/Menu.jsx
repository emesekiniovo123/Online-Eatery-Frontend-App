import { useEffect, useMemo, useState } from "react";
import { useCart } from "../context/CartContext";
import menuService from "../services/menuService";
import MealCard from "../components/MealCard";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";

const buildMealId = (meal) => {
  return (
    meal?._id ??
    meal?.id ??
    meal?.mealId ??
    meal?.slug ??
    `${meal?.name ?? "meal"}-${Date.now()}-${Math.random().toString(16).slice(2)}`
  );
};

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

const normalizeMeal = (meal) => ({
  _id: buildMealId(meal),
  name: meal?.name || "Untitled meal",
  description: meal?.description || meal?.details || "No description provided.",
  price: Number(meal?.price ?? meal?.amount ?? 0),
  category: meal?.category || meal?.mealType || "General",
  image: resolveImageUrl(meal?.image || meal?.img || meal?.photo),
  featured: Boolean(meal?.featured ?? meal?.isFeatured ?? false),
  available: Boolean(meal?.available ?? true),
});

const extractMeals = (payload) => {
  const foodsSource =
    payload?.data?.foods ?? payload?.foods ?? payload?.data ?? payload;

  if (Array.isArray(foodsSource)) {
    return foodsSource.map(normalizeMeal);
  }

  if (Array.isArray(payload?.meals)) {
    return payload.meals.map(normalizeMeal);
  }

  return [];
};

const extractCategories = (meals) => {
  return [
    "All",
    ...new Set(meals.map((meal) => meal.category).filter(Boolean)),
  ];
};

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [meals, setMeals] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    let isMounted = true;

    const loadMenu = async () => {
      try {
        const response = await menuService.getMeals();

        if (!isMounted) {
          return;
        }

        const normalizedMeals = extractMeals(response);
        setMeals(normalizedMeals);
        setCategories(extractCategories(normalizedMeals));
      } catch {
        if (isMounted) {
          setMeals([]);
          setCategories(["All"]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadMenu();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredMeals = useMemo(() => {
    return meals.filter((meal) => {
      const matchesCategory =
        selectedCategory === "All" || meal.category === selectedCategory;
      const lowerQuery = query.toLowerCase();
      const matchesQuery =
        !query ||
        meal.name.toLowerCase().includes(lowerQuery) ||
        meal.description.toLowerCase().includes(lowerQuery);

      return matchesCategory && matchesQuery;
    });
  }, [meals, query, selectedCategory]);

  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] border border-dark-200 bg-white/80 p-6 shadow-card">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary-500">
              Menu
            </p>
            <h1 className="text-3xl font-semibold text-dark-900">
              Choose from our fresh selection
            </h1>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <SearchBar
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            <select
              value={selectedCategory}
              onChange={(event) => setSelectedCategory(event.target.value)}
              className="rounded-full border border-dark-200 bg-white px-4 py-2.5 text-sm outline-none"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mt-4">
          <CategoryFilter
            options={categories}
            selected={selectedCategory}
            onSelect={setSelectedCategory}
          />
        </div>
      </div>

      {loading ? (
        <div className="rounded-[2rem] border border-dark-200 bg-white/80 p-8 text-center text-dark-600">
          Loading meals from the backend...
        </div>
      ) : (
        <>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredMeals.map((meal) => (
              <MealCard key={meal._id} meal={meal} onAddToCart={addToCart} />
            ))}
          </div>

          {filteredMeals.length === 0 && (
            <div className="rounded-[2rem] border border-dashed border-dark-300 bg-white/60 p-8 text-center text-dark-600">
              No meals match your current filters.
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Menu;
