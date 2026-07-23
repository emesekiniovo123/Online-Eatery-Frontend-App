import { Link } from 'react-router-dom';
import { formatCurrency } from '../utils/formatCurrency';

const MealCard = ({ meal, onAddToCart }) => {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-dark-200 bg-white shadow-card transition hover:-translate-y-1 hover:shadow-card-hover">
      <img src={meal.image} alt={meal.name} className="h-40 w-full object-cover" />
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="text-lg font-semibold text-dark-900">{meal.name}</h3>
            <p className="mt-1 text-sm text-dark-500">{meal.category}</p>
          </div>
          <span className="text-sm font-semibold text-primary-500">{formatCurrency(meal.price)}</span>
        </div>
        <p className="mt-3 flex-1 text-sm text-dark-600">{meal.description}</p>
        <div className="mt-5 flex gap-3">
          <Link to={`/menu/${meal._id}`} className="flex-1 rounded-full border border-dark-200 px-4 py-2 text-center text-sm font-semibold text-dark-700">
            Details
          </Link>
          <button type="button" onClick={() => onAddToCart(meal, 1)} className="flex-1 rounded-full bg-primary-400 px-4 py-2 text-sm font-semibold text-dark-900">
            Add
          </button>
        </div>
      </div>
    </article>
  );
};

export default MealCard;
