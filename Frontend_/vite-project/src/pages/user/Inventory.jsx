import { useState, useEffect } from "react";
import { bookAPI } from "../../api/api";

export default function Inventory() {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
  try {
    setLoading(true);
    setError("");
    const res = await bookAPI.inventory();
    const data = Array.isArray(res) ? res : [];  // ✅ FIXED: res, not res.data
    console.log("Inventory API response:", res);
    setInventory(data);
  } catch (err) {
    console.error("Inventory error:", err);
    setError("Failed to load inventory");
    setInventory([]);
  } finally {
    setLoading(false);
  }
};


  // 🔧 SAFE MAP: Only if array AND has length
  const renderBooks = () => {
    if (!Array.isArray(inventory) || inventory.length === 0) {
      return (
        <div className="text-center py-24">
          <div className="text-7xl mx-auto mb-8 opacity-20">📚</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">No Books in Inventory</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
            Buy books from Gallery to see them here.
          </p>
          <a href="/gallery" className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold shadow-xl hover:from-indigo-700 transition-all inline-block">
            🛒 Browse Marketplace
          </a>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {inventory.map((book) => (
          <div key={book._id || Math.random()} className="bg-white rounded-3xl shadow-xl p-8 border">
            <h3 className="text-xl font-bold text-gray-900 mb-2">{book.title || "Untitled"}</h3>
            <p className="text-gray-600 mb-4">{book.author || "Unknown"}</p>
            <p className="text-2xl font-bold text-emerald-600">₹{book.price || 0}</p>
          </div>
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-200 border-t-blue-600 mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-gray-800">Loading Inventory...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-12">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">
            My Inventory
          </h1>
          {error && (
            <div className="mt-8 p-6 bg-red-50 border-2 border-red-200 rounded-3xl max-w-2xl mx-auto">
              <p className="text-red-800 font-medium">{error}</p>
              <button
                onClick={fetchInventory}
                className="mt-4 bg-red-600 text-white px-6 py-2 rounded-xl hover:bg-red-700"
              >
                🔄 Retry
              </button>
            </div>
          )}
        </div>
        {renderBooks()}
      </div>
    </div>
  );
}
