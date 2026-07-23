import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";

const ToastContext = createContext(null);

const toastStyles = {
  success: "border-emerald-200 bg-emerald-50 text-emerald-700",
  error: "border-rose-200 bg-rose-50 text-rose-700",
  info: "border-sky-200 bg-sky-50 text-sky-700",
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const handleToast = (event) => {
      const { message, type = "info" } = event.detail || {};
      if (!message) return;

      const id = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
      setToasts((current) => [...current, { id, message, type }]);

      window.setTimeout(() => {
        setToasts((current) => current.filter((toast) => toast.id !== id));
      }, 3000);
    };

    window.addEventListener("app:toast", handleToast);
    return () => window.removeEventListener("app:toast", handleToast);
  }, []);

  const value = useMemo(
    () => ({
      notify: (message, type = "info") => {
        window.dispatchEvent(
          new CustomEvent("app:toast", { detail: { message, type } }),
        );
      },
    }),
    [],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      {createPortal(
        <div className="fixed right-4 top-4 z-[9999] flex flex-col gap-2">
          {toasts.map((toast) => (
            <div
              key={toast.id}
              className={`rounded-2xl border px-4 py-3 text-sm shadow-lg ${toastStyles[toast.type] || toastStyles.info}`}
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

export const notify = (message, type = "info") => {
  window.dispatchEvent(
    new CustomEvent("app:toast", { detail: { message, type } }),
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
