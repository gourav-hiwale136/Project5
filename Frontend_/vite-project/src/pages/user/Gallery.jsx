import { useState, useEffect } from "react";
import { bookAPI } from "../../api/api";

export default function Gallery() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await bookAPI.getAll();
      const data = Array.isArray(res.data) ? res.data : [];
      setBooks(data);
    } catch (err) {
      setError("Failed to load books. Check backend on port 5555.");
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  const handleBuy = async (bookId) => {
    try {
      await bookAPI.buy(bookId);
      alert("✅ Book purchased successfully!");
      fetchBooks();
    } catch (err) {
      alert("❌ " + (err.response?.data?.message || "Purchase failed"));
    }
  };

  const handleSell = async (book) => {
    // Block SOLD books
    if (book.status === "sold") {
      alert(`❌ "${book.title}" is already sold!`);
      return;
    }

    try {
      const sellData = {
        title: book.title || "Untitled Book",
        author: book.author || "Unknown Author",
        price: Number(book.price) || 0,
        image: book.image || "https://via.placeholder.com/300x400/4F46E5/FFFFFF?text=Book"
      };
      
      await bookAPI.sell(sellData);
      alert(`✅ "${book.title}" listed for sale!`);
      fetchBooks();
    } catch (err) {
      alert("❌ " + (err.response?.data?.message || "Sell failed"));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mx-auto mb-6"></div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Loading Books...</h2>
          <p className="text-xl text-gray-600">Fetching marketplace</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-12">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 bg-clip-text text-transparent mb-6">
            Book Marketplace
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Browse, buy, and sell books with our community marketplace
          </p>
          
          {error && (
            <div className="mt-8 p-6 bg-red-50 border-2 border-red-200 rounded-3xl max-w-2xl mx-auto">
              <p className="text-red-800 font-medium text-lg">{error}</p>
              <button
                onClick={fetchBooks}
                className="mt-4 bg-red-600 text-white px-8 py-3 rounded-2xl font-semibold hover:bg-red-700 transition-all"
              >
                🔄 Retry
              </button>
            </div>
          )}
        </div>

        {/* Books Grid */}
        {books.length === 0 && !loading ? (
          <div className="text-center py-32">
            <div className="text-8xl mx-auto mb-8 opacity-10">📚</div>
            <h2 className="text-4xl font-bold text-gray-800 mb-6">No Books Available</h2>
            <p className="text-xl text-gray-600 mb-10 max-w-lg mx-auto">
              Be the first to list books in our marketplace
            </p>
            <button
              onClick={fetchBooks}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-10 py-5 rounded-3xl font-bold text-xl shadow-2xl hover:from-indigo-700 hover:shadow-3xl transition-all"
            >
              🔄 Refresh Books
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {books.map((book) => (
              <div 
                key={book._id} 
                className={`group bg-white rounded-3xl shadow-xl p-8 border transition-all duration-300 overflow-hidden ${
                  book.status === "sold"
                    ? "opacity-60 border-gray-300 bg-gray-50 cursor-not-allowed"
                    : "hover:shadow-2xl hover:-translate-y-2 hover:border-indigo-200 border-gray-100"
                }`}
              >
                {/* Book Image */}
                <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl mb-6 overflow-hidden group-hover:scale-105 transition-transform duration-300">
                  <img 
                    src={book.image || "https://via.placeholder.com/300x400/4F46E5/FFFFFF?text=Book"} 
                    alt={book.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Book Info */}
                <div className="space-y-4 mb-8">
                  <div className="flex items-start justify-between">
                    <h3 className="text-xl font-bold text-gray-900 leading-tight line-clamp-2 group-hover:text-indigo-600 transition-colors">
                      {book.title || "Untitled Book"}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      book.status === "sold"
                        ? "bg-gray-200 text-gray-700"
                        : "bg-emerald-100 text-emerald-800"
                    }`}>
                      {book.status === "sold" ? "SOLD" : "AVAILABLE"}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 line-clamp-2">{book.author || "Unknown Author"}</p>
                  
                  <div className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-700 bg-clip-text text-transparent">
                    ₹{book.price || 0}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Buy Button */}
                  <button
                    onClick={() => handleBuy(book._id)}
                    disabled={book.status === "sold"}
                    className={`py-4 px-4 rounded-2xl font-semibold text-lg shadow-xl transition-all transform ${
                      book.status === "sold"
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed opacity-75 shadow-none"
                        : "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 hover:shadow-2xl hover:-translate-y-1 active:scale-95"
                    }`}
                  >
                    {book.status === "sold" ? "❌ SOLD" : "🛒 Buy Now"}
                  </button>

                  {/* Sell Button */}
                  <button
                    onClick={() => handleSell(book)}
                    disabled={book.status === "sold"}
                    className={`py-4 px-4 rounded-2xl font-semibold text-lg shadow-xl transition-all transform ${
                      book.status === "sold"
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed opacity-75 shadow-none"
                        : "bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 hover:shadow-2xl hover:-translate-y-1 active:scale-95"
                    }`}
                  >
                    {book.status === "sold" ? "⚠️ SOLD" : "💰 Sell"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Refresh Button */}
        <div className="text-center mt-20">
          <button
            onClick={fetchBooks}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-12 py-5 rounded-3xl font-bold text-xl shadow-2xl hover:from-indigo-700 hover:shadow-3xl transition-all"
          >
            🔄 Refresh Marketplace
          </button>
        </div>
      </div>
    </div>
  );
}
