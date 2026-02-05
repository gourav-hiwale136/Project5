import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { bookAPI } from "../../api/api";

export default function PublishBook() {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    price: "",
    image: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await bookAPI.sell(formData);
      alert("✅ Book listed successfully!");
      navigate("/gallery");
    } catch (err) {
      alert("❌ " + (err.response?.data?.message || "Failed to list book"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "40px", maxWidth: "600px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "36px", color: "#dc2626", marginBottom: "30px" }}>
        📚 Publish New Book
      </h1>
      <form
        onSubmit={handleSubmit}
        style={{ background: "#f8fafc", padding: "30px", borderRadius: "16px" }}
      >
        <div style={{ marginBottom: "20px" }}>
          <label
            style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}
          >
            Title
          </label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "12px",
              border: "2px solid #e2e8f0",
              borderRadius: "8px",
            }}
            placeholder="Book title"
            required
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label
            style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}
          >
            Author
          </label>
          <input
            name="author"
            value={formData.author}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "12px",
              border: "2px solid #e2e8f0",
              borderRadius: "8px",
            }}
            placeholder="Author name"
            required
          />
        </div>

        <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
          <div style={{ flex: 1 }}>
            <label
              style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}
            >
              Price
            </label>
            <input
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "12px",
                border: "2px solid #e2e8f0",
                borderRadius: "8px",
              }}
              placeholder="250"
              required
            />
          </div>
          <div style={{ flex: 1 }}>
            <label
              style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}
            >
              Image URL
            </label>
            <input
              name="image"
              value={formData.image}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "12px",
                border: "2px solid #e2e8f0",
                borderRadius: "8px",
              }}
              placeholder="https://via.placeholder.com/300x400"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "16px",
            background: "#dc2626",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontSize: "18px",
            fontWeight: "bold",
          }}
        >
          {loading ? "Listing..." : "📤 List New Book"}
        </button>
      </form>
    </div>
  );
}
