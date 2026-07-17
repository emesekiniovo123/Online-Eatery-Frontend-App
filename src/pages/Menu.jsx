import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { mockCategories, mockMeals } from "../utils/mockData";
import { formatCurrency } from "../utils/formatCurrency";

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [query, setQuery] = useState("");
  const { addToCart } = useCart();

  const filteredMeals = useMemo(() => {
    return mockMeals.filter((meal) => {
      const matchesCategory =
        selectedCategory === "All" || meal.category === selectedCategory;
      const lowerQuery = query.toLowerCase();
      const matchesQuery =
        !query ||
        meal.name.toLowerCase().includes(lowerQuery) ||
        meal.description.toLowerCase().includes(lowerQuery);

      return matchesCategory && matchesQuery;
    });
  }, [query, selectedCategory]);

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
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search meals"
              className="rounded-full border border-dark-200 bg-white px-4 py-2.5 text-sm outline-none ring-0"
            />
            <select
              value={selectedCategory}
              onChange={(event) => setSelectedCategory(event.target.value)}
              className="rounded-full border border-dark-200 bg-white px-4 py-2.5 text-sm outline-none"
            >
              {mockCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filteredMeals.map((meal) => (
          <article
            key={meal._id}
            className="rounded-[1.5rem] border border-dark-200 bg-white p-5 shadow-card"
          >
            <img
              src={meal.image}
              alt={meal.name}
              className="h-40 w-full rounded-2xl object-cover"
            />
            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-lg font-semibold text-dark-900">
                  {meal.name}
                </h3>
                <span className="text-sm font-semibold text-primary-500">
                  {formatCurrency(meal.price)}
                </span>
              </div>
              <p className="text-sm text-dark-600">{meal.description}</p>
              <div className="flex items-center justify-between text-sm text-dark-500">
                <span>{meal.category}</span>
                <span>⭐ 4.8</span>
              </div>
              <div className="flex gap-3">
                <Link
                  to={`/menu/${meal._id}`}
                  className="flex-1 rounded-full border border-dark-200 px-4 py-2 text-center text-sm font-semibold text-dark-700"
                >
                  Details
                </Link>
                <button
                  type="button"
                  onClick={() => addToCart(meal, 1)}
                  className="flex-1 rounded-full bg-primary-400 px-4 py-2 text-sm font-semibold text-dark-900"
                >
                  Add
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {filteredMeals.length === 0 && (
        <div className="rounded-[2rem] border border-dashed border-dark-300 bg-white/60 p-8 text-center text-dark-600">
          No meals match your current filters.
        </div>
      )}
    </div>
  );
};

export default Menu;
