//useEffect allows React to perform a side effect.
import { useEffect } from 'react';

//useLocation() gives us information about the current URL like /menu, /cart, etc.
import { useLocation } from 'react-router-dom';

//This creates a reusable custom hook.
const useScrollToTop = () => {

//This gets the current route. E.g https://example.com/menu
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  },
  //It means:
//Run this effect whenever pathname changes.
   [pathname]);
};
//This allows other components to import and use the hook.
export default useScrollToTop;
