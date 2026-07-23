const LoadingSpinner = ({ label = 'Loading...' }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-10 text-center">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary-300 border-t-primary-500" />
      <p className="text-sm font-medium text-dark-600">{label}</p>
    </div>
  );
};

export default LoadingSpinner;
