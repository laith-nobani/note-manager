import { useState } from "react";

export default function CreateContent({refreshData}) {
  const [form, setForm] = useState({ Title: "", Content: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!form.Title.trim() || !form.Content.trim()) {
      setMessage("Please fill in both title and content");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const token1 = localStorage.getItem("token");
      console.log("Using token:", token1); 
      if (!token1) {
        throw new Error("No authentication token found. Please login.");
      }
      
      const response = await fetch("http://localhost:3002/Note/CreateNote", {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${token1}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form),
        mode: "cors"
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || `HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      setMessage("Note created successfully!");
      refreshData();
      setForm({ Title: "", Content: "" });
      
      console.log("Created note:", result);
      
    } catch (error) {
      console.error("Error creating note:", error);
      setMessage(error.message || "Failed to create note");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-600 py-8 px-4">
      <div className="flex flex-col items-center justify-start">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-4xl space-y-6"
        >
          <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Create Note 
          </h2>
          
          {message && (
            <div className={`p-4 rounded-lg border ${
              message.includes("successfully") 
                ? "bg-green-50 text-green-800 border-green-200" 
                : "bg-red-50 text-red-800 border-red-200"
            }`}>
              {message}
            </div>
          )}
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              name="Title"
              value={form.Title}
              onChange={handleChange}
              placeholder="Enter title"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 transition-all duration-200"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Content
            </label>
            <textarea
              name="Content"
              value={form.Content}
              onChange={handleChange}
              placeholder="Enter your content"
              rows="6"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 resize-none transition-all duration-200"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 rounded-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 ${
              loading ? "opacity-60 cursor-not-allowed" : "hover:shadow-lg hover:-translate-y-0.5"
            }`}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating...
              </div>
            ) : (
              "Create Note"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
