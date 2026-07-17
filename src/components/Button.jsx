const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  type = 'button',
  disabled = false,
  loading = false,
  fullWidth = false,
  onClick,
  className = '',
  ...props
}) => {
  const baseClasses =
    'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary:
      'bg-primary-400 text-dark-900 hover:bg-primary-500 focus:ring-primary-400 shadow-md hover:shadow-lg active:scale-[0.97]',
    secondary:
      'bg-dark-800 text-white hover:bg-dark-700 focus:ring-dark-600 shadow-md hover:shadow-lg active:scale-[0.97]',
    outline:
      'border-2 border-primary-400 text-primary-500 hover:bg-primary-50 focus:ring-primary-400 active:scale-[0.97]',
    ghost:
      'text-dark-600 hover:bg-dark-100 focus:ring-dark-300',
    danger:
      'bg-danger-500 text-white hover:bg-danger-600 focus:ring-danger-400 shadow-md hover:shadow-lg active:scale-[0.97]',
    success:
      'bg-sage-600 text-white hover:bg-sage-700 focus:ring-sage-500 shadow-md hover:shadow-lg active:scale-[0.97]',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm gap-1.5',
    md: 'px-6 py-2.5 text-sm gap-2',
    lg: 'px-8 py-3.5 text-base gap-2.5',
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${
        fullWidth ? 'w-full' : ''
      } ${className}`}
      {...props}
    >
      {loading && (
        <svg
          className="animate-spin -ml-1 h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      )}
      {children}
    </button>
  );
};

export default Button;
