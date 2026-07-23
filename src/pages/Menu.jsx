import { useMemo, useState } from "react";
import { useCart } from "../context/CartContext";
import { mockCategories, mockMeals } from "../utils/mockData";
import MealCard from "../components/MealCard";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [query, setQuery] = useState("");
  const { addToCart } = useCart();

  const filteredMeals = useMemo(() => {
    return mockMeals.filter((meal) => {
      const matchesCategory = selectedCategory === "All" || meal.category === selectedCategory;
      const lowerQuery = query.toLowerCase();
      const matchesQuery = !query || meal.name.toLowerCase().includes(lowerQuery) || meal.description.toLowerCase().includes(lowerQuery);

      return matchesCategory && matchesQuery;
    });
  }, [query, selectedCategory]);

  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] border border-dark-200 bg-white/80 p-6 shadow-card">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary-500">Menu</p>
            <h1 className="text-3xl font-semibold text-dark-900">Choose from our fresh selection</h1>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <SearchBar value={query} onChange={(event) => setQuery(event.target.value)} />
            <select value={selectedCategory} onChange={(event) => setSelectedCategory(event.target.value)} className="rounded-full border border-dark-200 bg-white px-4 py-2.5 text-sm outline-none">
              {mockCategories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="mt-4">
          <CategoryFilter options={mockCategories} selected={selectedCategory} onSelect={setSelectedCategory} />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filteredMeals.map((meal) => (
          <MealCard key={meal._id} meal={meal} onAddToCart={addToCart} />
        ))}
      </div>

      {filteredMeals.length === 0 && (
        <div className="rounded-[2rem] border border-dashed border-dark-300 bg-white/60 p-8 text-center text-dark-600">No meals match your current filters.</div>
      )}
    </div>
  );
};

export default Menu;
