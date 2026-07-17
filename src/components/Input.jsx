const Input = ({
  label,
  name,
  type = 'text',
  placeholder,
  register,
  error,
  required = false,
  disabled = false,
  className = '',
  ...props
}) => {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label
          htmlFor={name}
          className="text-sm font-medium text-dark-700"
        >
          {label}
          {required && <span className="text-danger-500 ml-1">*</span>}
        </label>
      )}
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        className={`w-full px-4 py-3 rounded-xl border text-sm transition-all duration-200
          bg-white/80 backdrop-blur-sm
          placeholder:text-dark-400
          focus:outline-none focus:ring-2 focus:ring-primary-400/50 focus:border-primary-400
          disabled:bg-dark-100 disabled:cursor-not-allowed
          ${error ? 'border-danger-400 focus:ring-danger-400/50' : 'border-dark-200 hover:border-dark-300'}
        `}
        {...(register ? register(name) : { name })}
        {...props}
      />
      {error && (
        <p className="text-xs text-danger-500 flex items-center gap-1 mt-0.5">
          <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
          {error.message}
        </p>
      )}
    </div>
  );
};

export default Input;
