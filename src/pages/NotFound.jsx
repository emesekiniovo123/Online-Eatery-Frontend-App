import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="mx-auto flex min-h-[60vh] w-full max-w-2xl flex-col items-center justify-center rounded-[2rem] border border-dark-200 bg-white/80 p-8 text-center shadow-card">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary-500">404</p>
      <h1 className="mt-3 text-3xl font-semibold text-dark-900">Page not found</h1>
      <p className="mt-3 max-w-xl text-lg text-dark-600">
        The page you are looking for doesn’t exist or may have moved.
      </p>
      <Link to="/" className="mt-6 rounded-full bg-primary-400 px-6 py-3 text-sm font-semibold text-dark-900">
        Back to home
      </Link>
    </div>
  );
};

export default NotFound;
