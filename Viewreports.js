import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Viewreports() {
  const hospid = sessionStorage.getItem("hospid"); // ✅ use getItem
  const [reportlist, setReportlist] = useState([]);

  useEffect(() => {
    getreport();
  }, []);

  function getreport() {
    axios
      .get(`http://localhost:8080/getreport/${hospid}`)
      .then((res) => {
        setReportlist(res.data);
      })
      .catch((err) => {
        toast.error(err.response?.data || "Error fetching reports");
      });
  }

  return (
    <div className="container mx-auto max-w-6xl px-6 py-10">
      <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-8 text-center">
        📝 User Reports
      </h2>

      {reportlist.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reportlist.map((rep, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-800 shadow-md border border-gray-200 dark:border-gray-700 rounded-xl p-5 hover:shadow-lg transition"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center font-bold text-red-600">
                  {rep.users1?.username?.charAt(0).toUpperCase()}
                </div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-200 text-lg">
                  {rep.users1?.username || "Anonymous"}
                </h3>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                {rep.description}
              </p>
              <span className="text-xs text-gray-500 italic">
                Report ID: {rep.reportid}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No Reports found.</p>
      )}
    </div>
  );
}
