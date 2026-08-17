
// Import React hooks and Context API.
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

// Import createPortal to render notifications outside the normal component tree.
import { createPortal } from "react-dom";

// Create a Context for sharing toast functionality globally.
const ToastContext = createContext(null);

// Define styles for different toast types.
const toastStyles = {
  success: "border-emerald-200 bg-emerald-50 text-emerald-700",
  error: "border-rose-200 bg-rose-50 text-rose-700",
  info: "border-sky-200 bg-sky-50 text-sky-700",
};

// Provider component.
export const ToastProvider = ({ children }) => {

  // Store all active toast notifications.
  const [toasts, setToasts] = useState([]);

  // Listen for custom toast events.
  useEffect(() => {

    const handleToast = (event) => {

      // Extract message and type.
      const { message, type = "info" } = event.detail || {};

      // Ignore empty messages.
      if (!message) return;

      // Generate unique ID.
      const id = `${Date.now()}-${Math.random().toString(16).slice(2)}`;

      // Add toast.
      setToasts((current) => [
        ...current,
        { id, message, type }
      ]);

      // Automatically remove after 3 seconds.
      window.setTimeout(() => {
        setToasts((current) =>
          current.filter((toast) => toast.id !== id)
        );
      }, 3000);
    };

    // Listen for "app:toast" events.
    window.addEventListener("app:toast", handleToast);

    // Cleanup when component unmounts.
    return () =>
      window.removeEventListener("app:toast", handleToast);

  }, []);

  // Memoize the notify function.
  const value = useMemo(
    () => ({

      notify: (message, type = "info") => {

        window.dispatchEvent(

          new CustomEvent("app:toast", {
            detail: { message, type },
          })

        );

      },

    }),
    [],
  );

  return (

    <ToastContext.Provider value={value}>

      {children}

      {/* Render notifications using Portal */}
      {createPortal(

        <div className="fixed right-4 top-4 z-[9999] flex flex-col gap-2">

          {toasts.map((toast) => (

            <div
              key={toast.id}
              className={`rounded-2xl border px-4 py-3 text-sm shadow-lg
              ${toastStyles[toast.type] || toastStyles.info}`}
            >

              {toast.message}

            </div>

          ))}

        </div>,

        document.body,

      )}

    </ToastContext.Provider>

  );
};

// Global helper function.
export const notify = (
  message,
  type = "info"
) => {

  window.dispatchEvent(

    new CustomEvent("app:toast", {
      detail: { message, type },
    }),

  );

};

// Custom hook.
export const useToast = () => {

  const context = useContext(ToastContext);

  if (!context) {

    throw new Error(
      "useToast must be used within a ToastProvider"
    );

  }

  return context;

};