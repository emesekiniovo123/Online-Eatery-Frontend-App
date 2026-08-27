const Contact = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-4 rounded-[2rem] border border-dark-200 bg-white/80 p-8 shadow-card">
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
      <div className="flex justify-center">
        <div className="w-full max-w-md rounded-[1.5rem] bg-green-600 p-6 text-white">
          <div className="space-y-4 text-center">
            <div>
              <p className="text-sm text-white">Email</p>
              <p className="font-medium">ng@onlineeatery.com</p>
            </div>
            <div>
              <p className="text-sm text-white">Phone</p>
              <p className="font-medium">+234 7012555687</p>
            </div>
            <div>
              <p className="text-sm text-white">Address</p>
              <p className="font-medium">
                No. 3 Masaka, Karu LGA, Nasarawa State.{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
