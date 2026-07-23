import { NavLink } from 'react-router-dom';

const items = [
  { to: '/admin', label: 'Dashboard' },
  { to: '/admin/menu', label: 'Manage Menu' },
  { to: '/admin/orders', label: 'Manage Orders' },
];

const Sidebar = () => {
  return (
    <aside className="rounded-[2rem] border border-dark-200 bg-dark-900 p-6 text-white shadow-card">
      <div className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary-400">Admin panel</p>
        <h2 className="text-2xl font-semibold">Operations</h2>
      </div>
      <nav className="mt-8 space-y-2">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex rounded-2xl px-4 py-3 text-sm font-medium transition ${isActive ? 'bg-primary-400 text-dark-900' : 'text-dark-200 hover:bg-white/10 hover:text-white'}`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
