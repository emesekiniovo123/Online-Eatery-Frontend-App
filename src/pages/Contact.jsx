const Contact = () => {
  return (
    <div className="grid gap-6 rounded-[2rem] border border-dark-200 bg-white/80 p-8 shadow-card lg:grid-cols-[1fr_0.8fr]">
      <div className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary-500">
          Contact
        </p>
        <h1 className="text-3xl font-semibold text-dark-900">
          We’d love to hear from you.
        </h1>
        <p className="text-lg text-dark-600">
          Reach out for catering requests, large orders, or feedback about our
          service.
        </p>
      </div>
      <div className="rounded-[1.5rem] bg-dark-900 p-6 text-white">
        <div className="space-y-4">
          <div>
            <p className="text-sm text-dark-400">Email</p>
            <p className="font-medium">hello@onlineeatery.com</p>
          </div>
          <div>
            <p className="text-sm text-dark-400">Phone</p>
            <p className="font-medium">+1 (800) 555-0148</p>
          </div>
          <div>
            <p className="text-sm text-dark-400">Address</p>
            <p className="font-medium">28 Market Street, Downtown</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
