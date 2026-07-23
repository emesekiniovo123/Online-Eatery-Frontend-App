const CategoryFilter = ({ options, selected, onSelect }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => {
        const isActive = option === selected;
        return (
          <button
            key={option}
            type="button"
            onClick={() => onSelect(option)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${isActive ? 'bg-primary-400 text-dark-900' : 'border border-dark-200 bg-white text-dark-700 hover:border-primary-300'}`}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
};

export default CategoryFilter;
