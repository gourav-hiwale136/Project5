import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("Token");

  if (!token) {
    return (
      <nav className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 shadow-2xl">
        <div className="container mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold text-white">📚 BookStore</h1>
        </div>
      </nav>
    );
  }

  // In Navbar.jsx
const getRole = () => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.role || "user";  // ← If no "role: admin" in JWT → "user"
  } catch {
    return "user";
  }
};

// {role === "admin" && (  // ← Only shows Admin link if role === "admin"
//   <Link to="/admin/dashboard">Admin</Link>
// )}


  const role = getRole();
  const isActive = (path) => location.pathname === path ? "bg-white/20 shadow-lg" : "";

  const logout = () => {
    localStorage.removeItem("Token");
    navigate("/login");
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-xl border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link
            to="/gallery"
            className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
          >
            📚 BookStore
          </Link>

          <div className="flex items-center gap-2">
            <Link
              to="/gallery"
              className={`px-4 py-2 rounded-xl font-medium transition-all ${isActive("/gallery")}`}
            >
              Gallery
            </Link>
            <Link
              to="/inventory"
              className={`px-4 py-2 rounded-xl font-medium transition-all ${isActive("/inventory")}`}
            >
              Inventory
            </Link>
            <Link
              to="/trades"
              className={`px-4 py-2 rounded-xl font-medium transition-all ${isActive("/trades")}`}
            >
              Trades
            </Link>

            {role === "admin" && (
              <div className="flex gap-1">
                <Link
                  to="/admin/dashboard"
                  className="px-3 py-2 bg-red-100 text-red-700 rounded-xl font-medium hover:bg-red-200 transition-all"
                >
                  Admin
                </Link>
              </div>
            )}

            <button
              onClick={logout}
              className="px-6 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-medium hover:from-red-600 hover:to-red-700 shadow-lg hover:shadow-xl transition-all"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
