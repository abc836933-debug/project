import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Bed, Activity, HeartPulse } from "lucide-react"; // icons

export default function Viewfacility() {
  const [facilitylist, setfacilitylist] = useState([]);

  useEffect(() => {
    displayallfacility();
  }, []);

  function displayallfacility() {
    axios
      .get("http://localhost:8080/displayallfacility")
      .then((res) => {
        setfacilitylist(res.data);
      })
      .catch((err) => {
        toast.error(err.response?.data || "Error fetching facilities");
      });
  }

  return (
    <div className="my-5 px-4">
      <div className="container mx-auto max-w-7xl">
        <h2 className="text-3xl font-extrabold text-blue-700 dark:text-blue-300 mb-6 text-center">
          🏥 Facility List
        </h2>

        {facilitylist.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {facilitylist.map((item, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-gray-700 border border-gray-200 dark:border-gray-600 shadow-lg rounded-2xl p-6 hover:scale-105 transform transition duration-300"
              >
                {/* Hospital Header */}
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={item.hospitals2?.photo}
                    alt="hospital"
                    className="w-24 h-24 rounded-full border shadow-sm object-cover"
                  />
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {item.hospitals2?.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-300">
                      {item.facilityname}
                    </p>
                  </div>
                </div>

                {/* Disease Info */}
                <div className="mb-3">
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    <strong className="text-blue-600 dark:text-blue-400">Disease:</strong>{" "}
                    {item.diseases1?.diseasename}
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    <strong className="text-blue-600 dark:text-blue-400">Description:</strong>{" "}
                    {item.diseases1?.description}
                  </p>
                 <p className="text-sm text-gray-700 dark:text-gray-300">
  <strong className="text-blue-600 dark:text-blue-400">Status:</strong>{" "}
  <span
    style={{
      color: item.status === "Available" ? "green" : "red",
      fontWeight: "bold"
    }}
  >
    {item.status}
  </span>
</p>

                </div>

                {/* Facility Stats */}
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2 bg-white dark:bg-gray-600 p-3 rounded-lg shadow-sm">
                    <Bed size={18} className="text-blue-500" />
                    <span>
                      <strong>Beds:</strong> {item.totalbeds}{" "}
                      <span className="text-green-600 dark:text-green-400 font-semibold">
                        ({item.availablebeds} avail)
                      </span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2 bg-white dark:bg-gray-600 p-3 rounded-lg shadow-sm">
                    <Activity size={18} className="text-red-500" />
                    <span>
                      <strong>ICU:</strong> {item.totalicubeds}{" "}
                      <span className="text-green-600 dark:text-green-400 font-semibold">
                        ({item.avaliableicubeds} avail)
                      </span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2 bg-white dark:bg-gray-600 p-3 rounded-lg shadow-sm col-span-2">
                    <HeartPulse size={18} className="text-purple-500" />
                    <span>
                      <strong>Ventilators:</strong> {item.totalventilators}{" "}
                      <span className="text-green-600 dark:text-green-400 font-semibold">
                        ({item.availableventilators} avail)
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-400">No facilities added yet.</p>
        )}
      </div>
    </div>
  );
}
