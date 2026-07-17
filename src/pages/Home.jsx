import { Link } from "react-router-dom";
import { mockMeals } from "../utils/mockData";
import { formatCurrency } from "../utils/formatCurrency";
import { useCart } from "../context/CartContext";

const featuredMeals = mockMeals.filter((meal) => meal.featured);

const Home = () => {
  const { addToCart } = useCart();

  return (
    <div className="space-y-10">
      <section className="grid items-center gap-8 overflow-hidden rounded-[2rem] bg-gradient-to-br from-primary-100 via-white to-sage-100 p-8 shadow-card lg:grid-cols-[1.2fr_0.8fr] lg:p-12">
        <div className="space-y-6">
          <span className="inline-flex rounded-full border border-primary-300 bg-white/70 px-3 py-1 text-sm font-medium text-primary-600">
            Online Eatery • Freshly Crafted
          </span>
          <div className="space-y-3">
            <h1 className="text-4xl font-semibold leading-tight text-dark-900 sm:text-5xl">
              Delicious meals, delivered fast to your door.
            </h1>
            <p className="max-w-2xl text-lg text-dark-600">
              Browse signature dishes, build your order, and enjoy a seamless
              food delivery experience.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/menu"
              className="rounded-full bg-dark-900 px-6 py-3 text-sm font-semibold text-white"
            >
              Order now
            </Link>
            <Link
              to="/about"
              className="rounded-full border border-dark-200 bg-white/80 px-6 py-3 text-sm font-semibold text-dark-700"
            >
              Learn more
            </Link>
          </div>
        </div>
        <div className="rounded-[2rem] border border-white/60 bg-white/70 p-6 shadow-glass">
          <div className="grid gap-4 sm:grid-cols-2">
            {featuredMeals.slice(0, 4).map((meal) => (
              <div
                key={meal._id}
                className="rounded-2xl border border-dark-200 bg-white p-4 shadow-sm"
              >
                <p className="text-sm font-semibold text-dark-900">
                  {meal.name}
                </p>
                <p className="mt-1 text-sm text-dark-500">
                  {formatCurrency(meal.price)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary-500">
              Featured
            </p>
            <h2 className="text-2xl font-semibold text-dark-900">
              Popular meals
            </h2>
          </div>
          <Link to="/menu" className="text-sm font-semibold text-primary-500">
            View all
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {featuredMeals.map((meal) => (
            <article
              key={meal._id}
              className="rounded-[1.5rem] border border-dark-200 bg-white p-5 shadow-card transition hover:-translate-y-1 hover:shadow-card-hover"
            >
              <img
                src={meal.image}
                alt={meal.name}
                className="h-40 w-full rounded-2xl object-cover"
              />
              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-dark-900">
                    {meal.name}
                  </h3>
                  <span className="text-sm font-semibold text-primary-500">
                    {formatCurrency(meal.price)}
                  </span>
                </div>
                <p className="text-sm text-dark-600">{meal.description}</p>
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
                    Add to cart
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
