
// Create a reusable LoadingSpinner component.
//
// Props:
// label - Text displayed below the spinner.
// Default value is "Loading..."
const LoadingSpinner = ({ label = 'Loading...' }) => {

  // Return the loading spinner UI.
  return (

    // Main container.
    // Centers the spinner and text both vertically and horizontally.
    <div className="flex flex-col items-center justify-center gap-3 py-10 text-center">

      {/* Circular loading spinner */}
      <div
        className="h-10 w-10 animate-spin rounded-full border-4 border-primary-300 border-t-primary-500"
      />

      {/* Display loading message */}
      <p className="text-sm font-medium text-dark-600">
        {label}
      </p>

    </div>
  );
};

// Export the component so it can be used anywhere.
export default LoadingSpinner;