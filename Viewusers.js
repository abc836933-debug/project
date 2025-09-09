import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Viewusers()
 {
  const [userslist, setUserslist] = useState([]);

  useEffect(() => {
    displayallusers();
  }, []);

  function displayallusers() {
    axios
      .get("http://localhost:8080/displayallusers")
      .then((res) => {
        setUserslist(res.data);
      })
      .catch((err) => {
        toast.error(err.response?.data || "Error fetching users");
      });
  }

  return (
    <div className="my-5 px-4">
      <div className="container mx-auto max-w-7xl">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          User List
        </h2>

        {/* Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {userslist.map((item, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-5 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition"
            >
              <div className="flex items-center gap-4">
                <img
                  src="https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"
                  alt="pic"
                  className="w-20 h-20 rounded-full object-cover border"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {item.username}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    <span className="font-medium">User ID:</span> {item.userid}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    <span className="font-medium">Email:</span> {item.emailid}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
