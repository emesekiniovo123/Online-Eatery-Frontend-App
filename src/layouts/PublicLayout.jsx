import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import useScrollToTop from '../hooks/useScrollToTop';

const PublicLayout = () => {
  useScrollToTop();

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      <main className="mx-auto flex min-h-[calc(100vh-18rem)] w-full max-w-7xl flex-col px-4 py-8 sm:px-6 lg:px-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default PublicLayout;
