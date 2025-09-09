import { Outlet, NavLink } from "react-router-dom";

export default function Admindashboard() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-orange-400 via-yellow-400 to-orange-300 text-black flex flex-col shadow-2xl">
      

        <nav className="flex-1 px-4 py-6 space-y-2">
          {[
            { to: "Addcity", label: "🏙️ Add City" },
            { to: "Addarea", label: "📍 Add Area" },
            { to: "Addhospitals", label: "🏥 Add Hospitals" },
             { to: "Adddiseases", label: "🏥 Add Diseases" },
            { to: "Viewusers", label: "👥 View Users" },
            { to: "Viewfacility", label: "⚙️ View Facility" },
          ].map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 transform ${
                  isActive
                    ? "bg-white text-purple-700 font-bold shadow-md scale-105"
                    : "hover:bg-gray-200 hover:scale-105"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}

          <NavLink
            to="/"
            className="flex items-center gap-3 px-4 py-3 rounded-lg bg-red-500 hover:bg-red-600 transition-all mt-6 font-semibold shadow-lg"
          >
            🚪 Log Out
          </NavLink>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-800">
            Welcome, Admin Dashboard...👋
          </h2>
        </div>

    
          <Outlet />
      </main>
    </div>
  );
}
