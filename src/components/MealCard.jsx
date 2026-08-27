import { Link } from "react-router-dom";
import { formatCurrency } from "../utils/formatCurrency";

const MealCard = ({ meal, onAddToCart }) => {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-dark-200 bg-white shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-card-hover">
      <div
        className={
          meal.secondaryImage
            ? "grid grid-cols-2 gap-1"
            : "overflow-hidden bg-dark-100"
        }
      >
        <img
          src={meal.image}
          alt={meal.name}
          className={
            meal.secondaryImage
              ? "h-44 w-full object-cover"
              : "h-52 w-full object-cover transition duration-300 group-hover:scale-[1.02]"
          }
        />
        {meal.secondaryImage && (
          <img
            src={meal.secondaryImage}
            alt={`${meal.name} alternate view`}
            className="h-44 w-full object-cover"
          />
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <h3 className="text-lg font-semibold text-dark-900">{meal.name}</h3>
            <p className="mt-1 text-sm text-dark-500">{meal.category}</p>
          </div>
          <span className="shrink-0 rounded-full bg-primary-100 px-2.5 py-1 text-xs font-semibold text-primary-700">
            {formatCurrency(meal.price)}
          </span>
        </div>

        <p className="mt-3 flex-1 text-sm leading-6 text-dark-600">
          {meal.description}
        </p>

        <div className="mt-5 flex gap-3">
          <Link
            to={`/menu/${meal._id}`}
            className="flex min-h-[42px] flex-1 items-center justify-center rounded-full border border-dark-200 px-4 py-2 text-center text-sm font-semibold text-dark-700 transition hover:border-primary-300 hover:text-primary-600"
          >
            Details
          </Link>
          <button
            type="button"
            onClick={() => onAddToCart(meal, 1)}
            className="flex min-h-[42px] flex-1 items-center justify-center rounded-full bg-primary-400 px-4 py-2 text-sm font-semibold text-dark-900 transition hover:bg-primary-500"
          >
            Add
          </button>
        </div>
      </div>
    </article>
  );
};

export default MealCard;
