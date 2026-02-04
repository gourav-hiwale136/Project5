import { useState, useEffect } from "react";
import { bookAPI } from "../../api/api";

export default function Trades() {
  const [trades, setTrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTrades();
  }, []);

  const fetchTrades = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await bookAPI.allSold();  // GET /api/book/allSoldBooks
      const data = Array.isArray(res.data) ? res.data : [];
      console.log("Trades API response:", res.data);
      setTrades(data);
    } catch (err) {
      console.error("Trades error:", err);
      setError("Failed to load trades");
      setTrades([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-200 border-t-green-600 mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-gray-800">Loading Trades...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-100 py-12">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">
            My Trades
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Books you've successfully sold to other users
          </p>
        </div>

        {error && (
          <div className="mb-12 p-6 bg-red-50 border-2 border-red-200 rounded-3xl max-w-2xl mx-auto mx-6">
            <p className="text-red-800 font-medium">{error}</p>
            <button onClick={fetchTrades} className="mt-4 bg-red-600 text-white px-6 py-2 rounded-xl hover:bg-red-700">
              🔄 Retry
            </button>
          </div>
        )}

        {trades.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-7xl mx-auto mb-8 opacity-20">💰</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">No Completed Trades</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
              List books for sale in Inventory to start earning!
            </p>
            <a href="/inventory" className="bg-gradient-to-r from-emerald-600 to-green-600 text-white px-8 py-4 rounded-2xl font-semibold shadow-xl hover:from-emerald-700 transition-all inline-block">
              📚 Go to Inventory
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {trades.map((trade) => (
              <div key={trade._id || Math.random()} className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all p-8 border border-gray-100 hover:border-emerald-200">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2 line-clamp-1">{trade.title || "Sold Book"}</h3>
                    <p className="text-gray-600 text-lg">{trade.author || "Unknown Author"}</p>
                  </div>
                  <span className="px-4 py-2 bg-emerald-100 text-emerald-800 rounded-2xl font-bold text-sm">
                    ✅ SOLD
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center p-4 bg-emerald-50 rounded-2xl">
                    <div className="text-3xl font-bold text-emerald-600">₹{trade.price || 0}</div>
                    <div className="text-sm text-emerald-700 font-medium">Earned</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-2xl">
                    <div className="text-lg font-bold text-gray-900">{trade.buyerName || "User"}</div>
                    <div className="text-sm text-gray-500">Buyer</div>
                  </div>
                </div>

                <div className="text-sm text-gray-500 bg-gray-50 p-4 rounded-xl">
                  <div><strong>Date:</strong> {trade.soldDate || "Recent"}</div>
                  <div><strong>Status:</strong> <span className="text-emerald-600 font-medium">Completed</span></div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center">
          <button
            onClick={fetchTrades}
            className="bg-gradient-to-r from-emerald-600 to-green-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-xl hover:from-emerald-700 hover:to-green-700 transition-all"
          >
            🔄 Refresh Trades
          </button>
        </div>
      </div>
    </div>
  );
}
