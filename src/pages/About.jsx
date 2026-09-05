const About = () => {
  return (
    <div className="space-y-6 rounded-[2rem] border border-dark-200 bg-white/80 p-8 shadow-card">
      <div className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary-500">
          About us
        </p>
        <h1 className="text-3xl font-semibold text-dark-900">
          A smarter way to order your favorite meals.
        </h1>
      </div>
      <p className="max-w-3xl text-lg text-dark-600">
        Online Eatery is a full-stack food ordering platform designed to connect
        customers with delicious meals through a simple, secure, and convenient
        digital experience.
      </p>
      <p className="max-w-3xl text-lg text-dark-600">
        Customers can explore menus, manage their carts, place orders, choose
        flexible payment options, and keep track of their orders from one place.
        Our goal is to combine great food with reliable technology to make online
        ordering fast, effortless, and enjoyable.
      </p>
      <p className="text-lg font-semibold text-dark-900">
        Order with confidence. Enjoy every bite.
      </p>
      <div className="grid justify-items-center gap-4 md:grid-cols-3">
        {[
          ["24/7", "Support"],
          ["15 min", "Average prep"],
          ["4.9/5", "Customer rating"],
        ].map(([value, label]) => (
          //The key helps React identify each element efficiently when the list changes.
          //  In this case, the labels are unique, so I use them as the keys.
          <div
            key={label}
            className="w-full max-w-xs rounded-2xl bg-sage-700 p-4 text-center text-white"
          >
            <p className="text-2xl font-semibold">{value}</p>
            <p className="text-sm text-dark-300">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
