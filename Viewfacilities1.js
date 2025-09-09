import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Viewfacilities1() {
  const [selecteddisease, setSelecteddisease] = useState("");
  const [diseaselist, setDiseaselist] = useState([]);
  const [facilitylist, setFacilitylist] = useState([]);
  const [activeFacility, setActiveFacility] = useState(null); // For Post Report modal
  const [activeFacility1, setActiveFacility1] = useState(null); // For Feedback modal
  const [description, setDescription] = useState("");
  const [reportlist, setReportlist] = useState([]);
  const [ratings, setRating] = useState(0);

  const handleStarClick = (selectedRating) => {
    setRating(selectedRating);
  };

  useEffect(() => {
    displayalldiseases();
  }, []);

  useEffect(() => {
    if (selecteddisease) {
      displayfacility();
      setActiveFacility(null);
      setDescription("");
    }
  }, [selecteddisease]);

  function displayalldiseases() {
    axios
      .get("http://localhost:8080/displayalldiseases")
      .then((res) => setDiseaselist(res.data))
      .catch((err) => toast.error(err.response?.data || "Error fetching diseases"));
  }

  function displayfacility() {
    axios
      .get(`http://localhost:8080/displayfacility/${selecteddisease}`)
      .then((res) => setFacilitylist(res.data))
      .catch((err) => {
        toast.error(err.response?.data || "No facilities found");
        setFacilitylist([]);
      });
  }

  function postreport() {
    if (!activeFacility) return;

    const ursid = sessionStorage.getItem("ursid");
    if (!ursid) {
      toast.error("User not logged in");
      return;
    }

    axios
      .post(
        `http://localhost:8080/postreport/${activeFacility.facilityid}/${ursid}/${activeFacility.hospitals2?.hospitalid}`,
        { description, ratings }
      )
      .then((res) => {
        toast.success(res.data);
        setActiveFacility(null);
        setDescription("");
      })
      .catch((err) => toast.error(err.response?.data));
  }

  function displayreport(facilityid) {
    axios
      .get(`http://localhost:8080/displayreport/${facilityid}`)
      .then((res) => {
        setReportlist(res.data);
        setActiveFacility1(facilityid);
      })
      .catch((err) => toast.error(err.response?.data));
  }

  // Calculate average rating from reports
  const calculateAverageRating = (reports) => {
    if (!reports || reports.length === 0) return 0;
    const total = reports.reduce((sum, rep) => sum + (rep.ratings || 0), 0);
    return Math.round(total / reports.length);
  };

  return (
    <div className="my-5 px-4">
      <div className="container mx-auto max-w-7xl">
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-8 text-center">
          🏥 Search Facilities
        </h2>

        {/* Disease Selection */}
        <form className="grid md:grid-cols-2 gap-6 mb-10">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Select Disease:</label>
            <select
              className="w-full border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white shadow-sm"
              value={selecteddisease}
              onChange={(e) => setSelecteddisease(e.target.value)}
            >
              <option value="">--Choose Options--</option>
              {diseaselist.map((item) => (
                <option key={item.disesaseid} value={item.disesaseid}>
                  {item.disesaseid} - {item.diseasename}
                </option>
              ))}
            </select>
          </div>
        </form>

        {/* Facility Cards */}
        {facilitylist.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {facilitylist.map((item, index) => {
              const avgRating = calculateAverageRating(item.report1);

              return (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1 w-full p-6 flex flex-col justify-between"
                >
                  {/* Header */}
                  <div className="bg-gradient-to-r from-blue-600 to-green-400 text-white rounded-2xl p-5 flex items-center gap-5 mb-4">
                    <img
                      src={item.hospitals2?.photo}
                      alt="hospital"
                      className="w-24 h-24 rounded-full border-2 border-white shadow-md object-cover"
                    />
                    <div>
                      <h3 className="text-xl font-bold">{item.hospitals2?.name}</h3>
                      <p className="text-md opacity-90">Facility: {item.facilityname}</p>
                    </div>
                  </div>

                  {/* Body */}
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                      <strong>Disease:</strong> {item.diseases1?.diseasename}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                      <strong>Description:</strong> {item.diseases1?.description}
                    </p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      <strong className="text-blue-600 dark:text-blue-400">Status:</strong>{" "}
                      <span style={{ color: item.status === "Available" ? "green" : "red", fontWeight: "bold" }}>
                        {item.status}
                      </span>
                    </p>

                    <div className="grid grid-cols-2 gap-4 text-sm mt-5">
                      <div className="bg-blue-50 dark:bg-gray-700 p-3 rounded-lg shadow-sm">
                        <strong>Total Beds:</strong>
                        <p className="text-blue-700 font-bold">{item.totalbeds}</p>
                      </div>
                      <div className="bg-green-50 dark:bg-gray-700 p-3 rounded-lg shadow-sm">
                        <strong>Available Beds:</strong>
                        <p className="text-green-600 font-bold">{item.availablebeds}</p>
                      </div>
                      <div className="bg-blue-50 dark:bg-gray-700 p-3 rounded-lg shadow-sm">
                        <strong>ICU Total:</strong>
                        <p className="text-blue-700 font-bold">{item.totalicubeds}</p>
                      </div>
                      <div className="bg-green-50 dark:bg-gray-700 p-3 rounded-lg shadow-sm">
                        <strong>ICU Available:</strong>
                        <p className="text-green-600 font-bold">{item.avaliableicubeds}</p>
                      </div>
                      <div className="bg-red-50 dark:bg-gray-700 p-3 rounded-lg shadow-sm">
                        <strong>Ventilators:</strong>
                        <p className="text-red-600 font-bold">{item.totalventilators}</p>
                      </div>
                      <div className="bg-green-50 dark:bg-gray-700 p-3 rounded-lg shadow-sm">
                        <strong>Available:</strong>
                        <p className="text-green-600 font-bold">{item.availableventilators}</p>
                      </div>

                      {/* Average Rating */}
                      <div className="bg-yellow-50 dark:bg-gray-700 p-3 rounded-lg shadow-sm col-span-2 flex items-center gap-1">
                        <strong>Average Rating:</strong>
                        {Array.from({ length: 5 }, (_, i) => (
                          <span key={i} style={{ color: i < avgRating ? "gold" : "gray", fontSize: "20px" }}>
                            ★
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Buttons */}
                    <div className="mt-6 flex justify-center space-x-4">
                      <button
                        className="px-6 py-2 rounded-lg bg-gradient-to-r from-red-900 to-orange-600 text-white font-semibold shadow-md hover:from-red-600 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-1 transition-all duration-300"
                        onClick={() => setActiveFacility(item)}
                      >
                        Post Report
                      </button>
                      <button
                        className="px-6 py-2 rounded-lg bg-gradient-to-r from-green-900 to-green-600 text-white font-semibold shadow-md hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-1 transition-all duration-300"
                        onClick={() => displayreport(item.facilityid)}
                      >
                        View User's Feedbacks
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          selecteddisease && (
            <p className="text-center text-gray-500 mt-5">
              No facilities found for this disease.
            </p>
          )
        )}

        {/* Modal: Post Report */}
        {activeFacility && (
          <div className="fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-black bg-opacity-60 backdrop-blur-sm transition-opacity duration-300">
            <div className="relative m-4 p-4 w-2/5 min-w-[40%] max-w-[40%] rounded-lg bg-white shadow-sm">
              <div className="flex items-center pb-4 text-xl font-medium text-slate-800">
                Post Report - {activeFacility.facilityname}
              </div>
              <textarea
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-600 mb-4"
              />
              <div className="mb-4">
                <label className="mr-2">Rating:</label>
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    style={{ cursor: "pointer", color: star <= ratings ? "gold" : "gray", fontSize: "30px" }}
                    onClick={() => handleStarClick(star)}
                  >
                    ★
                  </span>
                ))}
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  className="rounded-md border py-2 px-4 text-sm text-slate-600 hover:bg-slate-100"
                  onClick={() => setActiveFacility(null)}
                >
                  Cancel
                </button>
                <button
                  className="rounded-md bg-green-600 py-2 px-4 text-sm text-white"
                  onClick={postreport}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal: View Feedback */}
        {activeFacility1 && (
          <div className="fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-black bg-opacity-60 backdrop-blur-sm transition-opacity duration-300">
            <div className="relative m-4 p-4 w-2/5 min-w-[40%] max-w-[40%] rounded-lg bg-white shadow-sm">
              <div className="flex items-center pb-4 text-xl font-medium text-slate-800">
                User Feedbacks
              </div>
              <div className="max-h-[400px] overflow-y-auto">
                {reportlist.length > 0 ? (
                  reportlist.map((rep, i) => (
                    <div key={i} className="p-3 border-b border-gray-200">
                      <p className="text-lg text-gray-700">
                        <strong className="text-red-500 font-bold">{rep.users1?.username}:</strong> {rep.description}
                      </p>
                      <p className="text-lg text-gray-700">
                        <strong className="text-red-500 font-bold">Rating:</strong>{" "}
                        {Array.from({ length: 5 }, (_, i) => (
                          <span key={i} style={{ color: i < rep.ratings ? "gold" : "gray", fontSize: "20px" }}>★</span>
                        ))}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No feedbacks found.</p>
                )}
              </div>
              <div className="flex justify-end pt-4">
                <button
                  className="rounded-md border py-2 px-4 text-sm text-slate-600 hover:bg-slate-100"
                  onClick={() => setActiveFacility1(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
