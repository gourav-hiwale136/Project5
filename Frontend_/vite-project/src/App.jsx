import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Login from "./pages/auth/Login.jsx";
import Signup from "./pages/auth/Signup.jsx";
import Gallery from "./pages/user/Gallery.jsx";
import Inventory from "./pages/user/Inventory.jsx";
import Trades from "./pages/user/Trades.jsx";
import AdminDashboard from "./pages/admin/Dashboard.jsx";
import PublishBook from "./pages/admin/PublishBook.jsx";
import RemoveBook from "./pages/admin/RemoveBook.jsx";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/trades" element={<Trades />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/publish" element={<PublishBook />} />
          <Route path="/admin/remove" element={<RemoveBook />} />
          <Route path="*" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}
