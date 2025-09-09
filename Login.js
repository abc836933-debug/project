import { useState } from "react";
import Navbarss from "./Navbarss";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const users = ["Admin", "Users", "Hospitals"];
  const [emailid, setEmailid] = useState("");
  const [password, setPassword] = useState("");
  const [selecteduser, setSelecteduser] = useState("");
  const navigate = useNavigate();

  function handlelogincheck(e) {
    e.preventDefault();

    if (selecteduser === "Admin" || selecteduser === "admin") {
      axios
        .get(`http://localhost:8080/adminlogincheck/${emailid}/${password}`)
        .then((res) => {
          sessionStorage.setItem("admid", res.data.adminid);
          navigate("/Admindashboard");
        })
        .catch((err) => {
          toast.error(err.response?.data);
        });
    }
    if (selecteduser === "Users" || selecteduser === "users") {
      axios
        .get(`http://localhost:8080/userlogincheck/${emailid}/${password}`)
        .then((res) => {
          sessionStorage.setItem("ursid", res.data.userid);
          navigate("/Usersdashboard");
        })
        .catch((err) => {
          toast.error(err.response?.data);
        });
    }
    if (selecteduser === "Hospitals" || selecteduser === "hospitals") {
      axios
        .get(`http://localhost:8080/hospitallogincheck/${emailid}/${password}`)
        .then((res) => {
          sessionStorage.setItem("hospid", res.data.hospitalid);
          navigate("/Hospitaldashboard");
        })
        .catch((err) => {
          toast.error(err.response?.data);
        });
    }
  }

  return (
    <>
      <Navbarss />

      <div className="flex h-screen bg-gradient-to-r from-purple-300 via-white to-purple-200">
        {/* Left side illustration */}
        <div className="hidden lg:flex items-center justify-center flex-1 p-10">
          <img
            src="https://media.istockphoto.com/id/1368151370/photo/user-typing-login-and-password-cyber-security-concept.jpg?s=612x612&w=0&k=20&c=hZ14F6Fa4edYWwg0BduAj0is8gdcORsBBHpQcQbAPKc="
            alt="login illustration"
            className="rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Right side login form */}
        <div className="flex items-center justify-center flex-1">
          <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-10">
            <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white">
              Welcome Back 👋
            </h2>
            <p className="text-center text-gray-500 dark:text-gray-400 mb-6">
              Login to continue
            </p>

            <form onSubmit={handlelogincheck}>
              {/* Role Dropdown */}
              <div className="mb-4">
                <label
                  htmlFor="role"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Select Role
                </label>
                <select
                  id="role"
                  value={selecteduser}
                  onChange={(e) => setSelecteduser(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                  required
                >
                  <option value="">-- Choose Role --</option>
                  {users.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </div>

              {/* Email */}
              <div className="mb-4">
                <label
                  htmlFor="emailid"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="emailid"
                  value={emailid}
                  onChange={(e) => setEmailid(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                  required
                />
              </div>

              {/* Password */}
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                  required
                />
              </div>

              {/* Submit button */}
              <button
                type="submit"
                className="w-full py-2 px-4 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-md shadow-md transform transition hover:scale-105 duration-300"
              >
                Login
              </button>

              {/* Extra links */}
              <div className="flex justify-between mt-4 text-sm">
                <Link to="/Register" className="text-yellow-600 hover:underline">
                  New user? Register
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
