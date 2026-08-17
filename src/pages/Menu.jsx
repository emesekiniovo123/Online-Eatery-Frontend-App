//useState → stores data that can change while the page is running.
//useEffect → performs side effects, such as fetching meals from the backend.
//useMemo → optimizes calculations by remembering a previous result until its dependencies change.
import { useEffect, useMemo, useState } from "react";
//when the user clicks Add to Cart,
//  this component can add the selected meal to the global cart.
import { useCart } from "../context/CartContext";
//This imports the service responsible for communicating with the backend menu API.
import menuService from "../services/menuService";
//MealCard → displays an individual meal.
import MealCard from "../components/MealCard";
//SearchBar → allows the user to search.
import SearchBar from "../components/SearchBar";
//CategoryFilter → allows the user to select a category;
import CategoryFilter from "../components/CategoryFilter";

//This defines a function that generates a unique identifier for a meal.
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

  //This retrieves the backend URL from the Vite environment variable:
  const apiBase = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");
  if (image.startsWith("/")) {
    return `${apiBase}${image}`;
  }

  return image;
};

//Its purpose is to convert different backend meal formats
//into one consistent frontend format
const normalizeMeal = (meal) => ({
  _id: buildMealId(meal),
  //Use meal name if it exist or Untitled meal
  name: meal?.name || "Untitled meal",

  description: meal?.description || meal?.details || "No description provided.",
  price: Number(meal?.price ?? meal?.amount ?? 0),
  category: meal?.category || meal?.mealType || "General",
  image: resolveImageUrl(meal?.image || meal?.img || meal?.photo),
  featured: Boolean(meal?.featured ?? meal?.isFeatured ?? false),
  available: Boolean(meal?.available ?? true),
});

//This function extracts meal data from the backend response.
const extractMeals = (payload) => {
  //The application supports multiple possible API response structures.
  const foodsSource =
    payload?.data?.foods ?? 
    payload?.foods ?? 
    payload?.data ??
     payload;

     //Checks whether the extracted data is actually an array.
  if (Array.isArray(foodsSource)) {
    return foodsSource.map(normalizeMeal);
  }

  if (Array.isArray(payload?.meals)) {
    return payload.meals.map(normalizeMeal);
  }
//If nothing valid is found, an empty array is returned.
  return [];
};
//This function gets all available meal categories.
const extractCategories = (meals) => {
  return [
    "All",
    ...new Set(meals.map((meal) => meal.category).filter(Boolean)),
  ];
};


//This component is responsible for:

//loading meals
//displaying meals
//searching meals
//filtering meals
//adding meals to the cart
const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [query, setQuery] = useState("");
  //Stores all meals received from the backend.
  const [meals, setMeals] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    //This variable tracks whether the component is still mounted.
    let isMounted = true;

    const loadMenu = async () => {
      try {
        //This is where the application requests the meals from the backend.
        const response = await menuService.getMeals();

        if (!isMounted) {
          return;
        }

        const normalizedMeals = extractMeals(response);
        //Stores the meals in React state.
        setMeals(normalizedMeals);
        //setCategories(extractCategories(normalizedMeals));
        setCategories(extractCategories(normalizedMeals));
      } catch {
        if (isMounted) {
          //The application resets the meals and categories instead of crashing.
          setMeals([]);
          setCategories(["All"]);
        }
      } finally {
        if (isMounted) {
          //The loading state is turned off.
          setLoading(false);
        }
      }
    };

    loadMenu();

    return () => {
      isMounted = false;
    };
  }, []);
//This calculates the meals that should actually be displayed.
  const filteredMeals = useMemo(() => {
    return meals.filter((meal) => {
      const matchesCategory =
        selectedCategory === "All" || meal.category === selectedCategory;
        //Converts the search text to lowercase.
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
