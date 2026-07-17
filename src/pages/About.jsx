const About = () => {
  return (
    <div className="space-y-6 rounded-[2rem] border border-dark-200 bg-white/80 p-8 shadow-card">
      <div className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary-500">About us</p>
        <h1 className="text-3xl font-semibold text-dark-900">Serving comfort food with modern convenience.</h1>
      </div>
      <p className="max-w-3xl text-lg text-dark-600">
        Online Eatery brings together fresh ingredients, thoughtful preparation, and fast delivery in one polished experience. From quick lunches to family dinners, the platform is designed to make ordering simple and delightful.
      </p>
      <div className="grid gap-4 md:grid-cols-3">
        {[
          ['24/7', 'Support'],
          ['15 min', 'Average prep'],
          ['4.9/5', 'Customer rating'],
        ].map(([value, label]) => (
          <div key={label} className="rounded-2xl bg-dark-900 p-5 text-white">
            <p className="text-2xl font-semibold">{value}</p>
            <p className="text-sm text-dark-300">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
