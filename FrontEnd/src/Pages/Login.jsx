import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login({ setLogged }) {
  const [form, setForm] = useState({ Username: "", Password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3002/Auth/Login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

      const data = await res.json();
      localStorage.setItem("token",data.token)
      setLogged(true);
    } catch (err) {
      console.error("Login failed:", err);
      alert("Login failed, check your username or password");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow w-80 space-y-4"
      >
        <h2 className="text-xl font-bold text-center">Login</h2>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Username</label>
          <input
            type="text"
            name="Username"
            value={form.Username}
            onChange={handleChange}
            placeholder="Enter your username"
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Password</label>
          <input
            type="password"
            name="Password"
            value={form.Password}
            onChange={handleChange}
            placeholder="Enter your password"
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>
      <p style={{ marginTop: "10px" }}>
        Don’t have an account?{" "}
        <Link to="/register" style={{ color: "blue", textDecoration: "underline" }}>
          Register
        </Link>
      </p>
    </div>
  );
}
