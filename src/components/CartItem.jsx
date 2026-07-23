import { formatCurrency } from "../utils/formatCurrency";

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  return (
    <div className="flex flex-col gap-4 rounded-[1.25rem] border border-dark-200 p-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="font-semibold text-dark-900">{item.name}</p>
        <p className="text-sm text-dark-500">{formatCurrency(item.price)}</p>
      </div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => onUpdateQuantity(item._id, item.quantity - 1)}
          className="rounded-full border border-dark-200 px-3 py-1 text-sm"
        >
          −
        </button>
        <span className="min-w-8 text-center font-semibold">
          {item.quantity}
        </span>
        <button
          type="button"
          onClick={() => onUpdateQuantity(item._id, item.quantity + 1)}
          className="rounded-full border border-dark-200 px-3 py-1 text-sm"
        >
          +
        </button>
        <button
          type="button"
          onClick={() => onRemove(item._id)}
          className="ml-2 text-sm font-semibold text-danger-500"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;
