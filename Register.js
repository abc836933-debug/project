import { useState } from "react";
import Navbarss from "./Navbarss";
import axios from "axios";
import { toast } from "react-toastify";

export default function Register() {
  const [username, setUsername] = useState("");
  const [emailid, setEmailid] = useState("");
  const [password, setPassword] = useState("");

  function userregister(e) {
    e.preventDefault();
    const obj = { username, emailid, password };
    axios
      .post("http://localhost:8080/userregister", obj)
      .then((res) => {
        toast.success(res.data);
        clearAll();
      })
      .catch((err) => {
        toast.error(err.response?.data || "Registration failed!");
      });
  }

  function clearAll() {
    setEmailid("");
    setPassword("");
    setUsername("");
  }

  return (
    <>
      <Navbarss />
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-indigo-100 px-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
          {/* Title */}
          <h1 className="text-3xl font-bold text-center text-indigo-700 mb-6">
            ✨ User Registration
          </h1>

          {/* Form */}
          <form onSubmit={userregister} className="space-y-5">
            {/* Username */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-gray-700 mb-1"
              >
                Username
              </label>
              <input
                type="text"
                id="name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full border border-indigo-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 rounded-lg px-3 py-2 outline-none text-gray-800 shadow-sm"
                placeholder="Enter your name"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="emailid"
                className="block text-sm font-semibold text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="emailid"
                value={emailid}
                onChange={(e) => setEmailid(e.target.value)}
                className="w-full border border-indigo-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 rounded-lg px-3 py-2 outline-none text-gray-800 shadow-sm"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-indigo-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 rounded-lg px-3 py-2 outline-none text-gray-800 shadow-sm"
                placeholder="Enter your password"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-lg font-semibold rounded-lg shadow-md transition transform hover:scale-[1.02]"
            >
              Register
            </button>
          </form>

          {/* Extra Info */}
          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-indigo-600 font-medium hover:underline">
              Login here
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
