import { useState } from 'react';
import { Outlet, NavLink, useNavigate, Navigate } from 'react-router-dom';
import {
  LayoutDashboard, Calendar, Users, Clock, UserCircle, Sparkles,
  Image, Tag, CreditCard, Star, BarChart3, Settings, LogOut,
  Menu, X, ChevronLeft
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import ToastContainer from '../components/ui/Toast';

const menuItems = [
  { to: '/admin', icon: LayoutDashboard, label: 'Dashboard', end: true },
  { to: '/admin/bookings', icon: Calendar, label: 'Bookings' },
  { to: '/admin/customers', icon: Users, label: 'Customers' },
  { to: '/admin/timeslots', icon: Clock, label: 'Time Slots' },
  { to: '/admin/artists', icon: UserCircle, label: 'Artists' },
  { to: '/admin/services', icon: Sparkles, label: 'Services' },
  { to: '/admin/gallery', icon: Image, label: 'Gallery' },
  { to: '/admin/offers', icon: Tag, label: 'Offers' },
  { to: '/admin/payments', icon: CreditCard, label: 'Payments' },
  { to: '/admin/reviews', icon: Star, label: 'Reviews' },
  { to: '/admin/reports', icon: BarChart3, label: 'Reports' },
  { to: '/admin/settings', icon: Settings, label: 'Settings' },
];

export default function AdminLayout() {
  const { admin, logoutAdmin, settings } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  if (!admin) {
    return <Navigate to="/admin/login" replace />;
  }

  const handleLogout = () => {
    logoutAdmin();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={`admin-sidebar fixed lg:static inset-y-0 left-0 z-50 bg-charcoal-900 text-white flex flex-col
          ${collapsed ? 'w-20' : 'w-64'} 
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          transition-all duration-300`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-white/10">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center text-sm font-bold">
                L
              </div>
              <span className="font-display font-semibold text-sm truncate">Admin Panel</span>
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex p-1.5 rounded-lg hover:bg-white/10"
          >
            <ChevronLeft size={18} className={collapsed ? 'rotate-180' : ''} />
          </button>
          <button className="lg:hidden p-1.5" onClick={() => setSidebarOpen(false)}>
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
          {menuItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors ${
                  isActive
                    ? 'bg-pink-500 text-white'
                    : 'text-gray-300 hover:bg-white/10 hover:text-white'
                }`
              }
            >
              <item.icon size={18} className="shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        <div className="p-3 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm text-gray-300 hover:bg-white/10 hover:text-white"
          >
            <LogOut size={18} />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-4 lg:px-6 sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button className="lg:hidden p-2 rounded-lg hover:bg-gray-100" onClick={() => setSidebarOpen(true)}>
              <Menu size={20} />
            </button>
            <h1 className="font-display font-semibold text-lg text-charcoal-800 hidden sm:block">
              {settings.shopName} — Admin
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full font-medium">
              Demo Mode
            </span>
            <div className="w-8 h-8 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center text-sm font-semibold">
              A
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
      <ToastContainer />
    </div>
  );
}
