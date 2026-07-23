const SearchBar = ({ value, onChange, placeholder = 'Search meals' }) => {
  return (
    <label className="flex w-full items-center gap-2 rounded-full border border-dark-200 bg-white px-4 py-2.5 shadow-sm sm:max-w-sm">
      <span className="text-lg text-dark-400">🔎</span>
      <input
        type="search"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full border-none bg-transparent text-sm outline-none"
      />
    </label>
  );
};

export default SearchBar;
