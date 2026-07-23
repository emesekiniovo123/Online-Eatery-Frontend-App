const Modal = ({ open, title, children, onClose }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-dark-950/70 px-4">
      <div className="w-full max-w-lg rounded-[2rem] border border-dark-200 bg-white p-6 shadow-card">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-dark-900">{title}</h3>
          <button type="button" onClick={onClose} className="rounded-full border border-dark-200 px-3 py-1 text-sm text-dark-700">Close</button>
        </div>
        <div className="mt-5">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
