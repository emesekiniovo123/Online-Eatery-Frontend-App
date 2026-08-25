import { useEffect, useState } from "react";
import menuService from "../services/menuService";
import { formatCurrency } from "../utils/formatCurrency";
import { notify } from "../components/ToastProvider";

const getMenuItems = (response) => {
  const items = Array.isArray(response)
    ? response
    : response?.foods || response?.meals || response?.data || [];

  if (Array.isArray(items)) return items;
  if (Array.isArray(items?.foods)) return items.foods;
  if (Array.isArray(items?.meals)) return items.meals;
  if (Array.isArray(items?.data)) return items.data;

  return [];
};

const emptyForm = {
  name: "",
  description: "",
  price: "",
  category: "Main Course",
  image: "",
  secondaryImage: "",
  imageFile: null,
  secondaryImageFile: null,
  available: true,
};

const AdminMenu = () => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingMealId, setEditingMealId] = useState(null);
  const [formData, setFormData] = useState(emptyForm);

  const resetForm = () => {
    setFormData(emptyForm);
    setEditingMealId(null);
  };

  const loadMeals = async () => {
    try {
      const response = await menuService.getMeals();
      setMeals(getMenuItems(response));
    } catch (error) {
      notify(error.response?.data?.message || "Unable to load menu.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMeals();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);

    try {
      const payload = new FormData();
      payload.append("name", formData.name);
      payload.append("description", formData.description);
      payload.append("price", String(Number(formData.price)));
      payload.append("category", formData.category);
      payload.append("available", String(formData.available));
      if (formData.imageFile) payload.append("image", formData.imageFile);
      else if (formData.image) payload.append("image", formData.image);
      if (formData.secondaryImageFile) {
        payload.append("secondaryImage", formData.secondaryImageFile);
      } else if (formData.secondaryImage) {
        payload.append("secondaryImage", formData.secondaryImage);
      }

      if (editingMealId) {
        await menuService.updateMeal(editingMealId, payload);
        notify("Meal updated successfully.", "success");
      } else {
        await menuService.createMeal(payload);
        notify("Meal created successfully.", "success");
      }

      resetForm();
      await loadMeals();
    } catch (error) {
      notify(
        error.response?.data?.message ||
          (editingMealId ? "Unable to update meal." : "Unable to create meal."),
        "error",
      );
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (meal) => {
    setEditingMealId(meal._id);
    setFormData({
      name: meal.name || "",
      description: meal.description || "",
      price: meal.price ?? "",
      category: meal.category || "Main Course",
      image: meal.image || "",
      secondaryImage: meal.secondaryImage || "",
      imageFile: null,
      secondaryImageFile: null,
      available: Boolean(meal.available ?? true),
    });
  };

  const handleDelete = async (mealId) => {
    try {
      await menuService.deleteMeal(mealId);
      notify("Meal deleted successfully.", "success");
      if (editingMealId === mealId) resetForm();
      await loadMeals();
    } catch (error) {
      notify(
        error.response?.data?.message || "Unable to delete meal.",
        "error",
      );
    }
  };

  const handleToggleAvailability = async (meal) => {
    try {
      await menuService.updateMeal(meal._id, {
        available: !meal.available,
      });
      notify("Availability updated.", "success");
      await loadMeals();
    } catch (error) {
      notify(
        error.response?.data?.message || "Unable to update availability.",
        "error",
      );
    }
  };

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

      <form
        onSubmit={handleSubmit}
        className="rounded-[2rem] border border-dark-200 bg-white/80 p-5 shadow-card space-y-4"
      >
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-lg font-semibold text-dark-900">
            {editingMealId ? "Edit meal" : "Add a new meal"}
          </h2>
          {editingMealId && (
            <button
              type="button"
              onClick={resetForm}
              className="rounded-full border border-dark-200 px-4 py-2 text-sm font-semibold text-dark-700"
            >
              Cancel
            </button>
          )}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <input
            value={formData.name}
            onChange={(event) =>
              setFormData({ ...formData, name: event.target.value })
            }
            placeholder="Meal name"
            className="rounded-xl border border-dark-200 px-4 py-3 text-sm"
            required
          />
          <input
            value={formData.category}
            onChange={(event) =>
              setFormData({ ...formData, category: event.target.value })
            }
            placeholder="Category"
            className="rounded-xl border border-dark-200 px-4 py-3 text-sm"
            required
          />
          <input
            value={formData.price}
            onChange={(event) =>
              setFormData({ ...formData, price: event.target.value })
            }
            placeholder="Price"
            type="number"
            min="0"
            step="0.01"
            className="rounded-xl border border-dark-200 px-4 py-3 text-sm"
            required
          />
          <input
            value={formData.image}
            onChange={(event) =>
              setFormData({ ...formData, image: event.target.value })
            }
            placeholder="Image URL"
            className="rounded-xl border border-dark-200 px-4 py-3 text-sm"
          />
          <label className="rounded-xl border border-dark-200 px-4 py-3 text-sm text-dark-600">
            Primary image file
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              onChange={(event) =>
                setFormData({
                  ...formData,
                  imageFile: event.target.files?.[0] || null,
                })
              }
              className="mt-2 block w-full text-xs"
            />
          </label>
          <input
            value={formData.secondaryImage}
            onChange={(event) =>
              setFormData({ ...formData, secondaryImage: event.target.value })
            }
            placeholder="Secondary image URL"
            className="rounded-xl border border-dark-200 px-4 py-3 text-sm"
          />
          <label className="rounded-xl border border-dark-200 px-4 py-3 text-sm text-dark-600">
            Secondary image file
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              onChange={(event) =>
                setFormData({
                  ...formData,
                  secondaryImageFile: event.target.files?.[0] || null,
                })
              }
              className="mt-2 block w-full text-xs"
            />
          </label>
        </div>
        <textarea
          value={formData.description}
          onChange={(event) =>
            setFormData({ ...formData, description: event.target.value })
          }
          placeholder="Description"
          rows="3"
          className="w-full rounded-xl border border-dark-200 px-4 py-3 text-sm"
          required
        />
        <label className="flex items-center gap-2 text-sm text-dark-700">
          <input
            type="checkbox"
            checked={formData.available}
            onChange={() =>
              setFormData({ ...formData, available: !formData.available })
            }
          />
          Available
        </label>
        <button
          type="submit"
          disabled={saving}
          className="rounded-full bg-primary-400 px-5 py-3 text-sm font-semibold text-dark-900 disabled:opacity-60"
        >
          {saving ? "Saving..." : editingMealId ? "Update meal" : "Add meal"}
        </button>
      </form>

      <div className="space-y-4">
        {loading ? (
          <div className="rounded-[1.5rem] border border-dark-200 bg-white p-5 text-sm text-dark-600">
            Loading menu...
          </div>
        ) : (
          meals.map((meal) => (
            <div
              key={meal._id}
              className="flex flex-col gap-4 rounded-[1.5rem] border border-dark-200 bg-white p-5 shadow-card sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-semibold text-dark-900">{meal.name}</p>
                <p className="text-sm text-dark-500">
                  {meal.category} • {formatCurrency(Number(meal.price || 0))}
                </p>
                <p className="mt-1 text-xs text-dark-500">
                  {meal.available ? "Available" : "Unavailable"}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => handleEdit(meal)}
                  className="rounded-full border border-dark-200 px-4 py-2 text-sm font-semibold text-dark-700"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleToggleAvailability(meal)}
                  className="rounded-full border border-dark-200 px-4 py-2 text-sm font-semibold text-dark-700"
                >
                  {meal.available ? "Disable" : "Enable"}
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(meal._id)}
                  className="rounded-full bg-danger-500 px-4 py-2 text-sm font-semibold text-white"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminMenu;
