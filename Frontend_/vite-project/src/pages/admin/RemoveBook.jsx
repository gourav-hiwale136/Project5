import { useState, useEffect } from "react";
import { bookAPI } from "../../api/api";

export default function RemoveBook() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await bookAPI.getAll();
        setBooks(res.data);
      } catch (err) {
        console.error("Failed to load books:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  const handleDelete = async (bookId) => {
    if (!window.confirm("Are you sure you want to remove this book?")) return;
    try {
      await bookAPI.remove(bookId);
      setBooks((prev) => prev.filter((b) => b._id !== bookId));
    } catch (err) {
      alert(err.response?.data?.message || "Delete failed");
    }
  };

  if (loading) return <p className="text-center py-8">Loading books...</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Remove Book</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {books.length === 0 ? (
          <p>No books to remove.</p>
        ) : (
          books.map((book) => (
            <div
              key={book._id}
              className="border border-gray-300 rounded-lg p-4 shadow-sm flex justify-between items-center"
            >
              <div>
                <h3 className="text-lg font-semibold">{book.title}</h3>
                <p className="text-gray-600">{book.author}</p>
                <p className="text-sm text-gray-500">
                  Price: ₹{book.price}
                </p>
              </div>
              <button
                onClick={() => handleDelete(book._id)}
                className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
