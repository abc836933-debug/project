import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Addfacilities() {
  const [facilityname, setFacilityname] = useState("");
  const [selecteddisease, setSelecteddisease] = useState("");
  const [diseaselist, setDiseaselist] = useState([]);
  const hospid = sessionStorage.getItem("hospid");
  const [totalbeds, setTotalbeds] = useState("");
  const [availablebeds, setAvailablebeds] = useState("");
  const [totalicubeds, setTotalicubeds] = useState("");
  const [avaliableicubeds, setavaliableicubeds] = useState("");
  const [totalventilators, setTotalventilators] = useState("");
  const [availableventilators, setAvailableventilators] = useState("");
  const [facilitylist, setFacilitylist] = useState([]);
  const[status,setStatus]=useState('');
  useEffect(() => {
    displayalldiseases();
    getfacility();
  }, []);

  function addfacility(e) {
    /* Add Facility Details */
    e.preventDefault();
    const obj = {
      selecteddisease,
      facilityname,
      availablebeds,
      totalbeds,
      avaliableicubeds,
      totalicubeds,
      availableventilators, 
      totalventilators,
      status
    };
    axios
      .post(`http://localhost:8080/addfacility/${selecteddisease}/${hospid}`, obj)
      .then((res) => {
        toast.success(res.data);
        getfacility();
        clearAll();
      })
      .catch((err) => {
        toast.error(err.response.data);
      });
  }

  function clearAll() {
    setSelecteddisease("");
    setAvailablebeds("");
    setAvailableventilators("");
    setFacilityname("");
    setTotalbeds("");
    setTotalicubeds("");
    setTotalventilators("");
    setavaliableicubeds("");
    setStatus("");
  }

  function displayalldiseases() {
    /* Display All Diseases */
    axios
      .get("http://localhost:8080/displayalldiseases")
      .then((res) => {
        setDiseaselist(res.data);
      })
      .catch((err) => {
        toast.error(err.response.data);
      });
  }

  function getfacility() {
    /* Display Particular Facility Details */
    axios
      .get(`http://localhost:8080/getfacility/${hospid}`)
      .then((res) => {
        setFacilitylist(res.data);
      })
      .catch((err) => {
        toast.error(err.response.data);
      });
  }

  return (
    <div className="my-5 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Two-column layout */}
        <div className="lg:flex-row gap-6">
          {/* Form Section (Left) */}
          <div className="flex-1 bg-white dark:bg-gray-800 shadow-md p-6 rounded-md border border-emerald-500">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Add Facility
            </h1>
            <form>
              <label
                htmlFor="name"
                className="block text-gray-700 font-medium mb-2"
              >
                Select Diseases:
              </label>
              <select
                className="w-full border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-600 bg-white"
                value={selecteddisease}
                onChange={(e) => setSelecteddisease(e.target.value)}
              >
                <option value="">--Choose Options--</option>
                {diseaselist.map((item, index) => (
                  <option key={index} value={item.disesaseid}>
                    {item.disesaseid}-{item.diseasename}
                  </option>
                ))}
              </select>

              <label
                htmlFor="name"
                className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1"
              >
                Enter Facility Name:
              </label>
              <input
                type="text"
                value={facilityname}
                onChange={(e) => setFacilityname(e.target.value)}
                id="name"
                className="block w-full border border-blue-600 outline-emerald-800 px-3 py-2 text-sm rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white mb-4"
              />

              <label
                htmlFor="name"
                className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1"
              >
                Enter Total Beds:
              </label>
              <input
                type="text"
                value={totalbeds}
                onChange={(e) => setTotalbeds(e.target.value)}
                id="name"
                className="block w-full border border-blue-600 outline-emerald-800 px-3 py-2 text-sm rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white mb-4"
              />

              <label
                htmlFor="name"
                className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1"
              >
                Enter Available Beds:
              </label>
              <input
                type="text"
                value={availablebeds}
                onChange={(e) => setAvailablebeds(e.target.value)}
                id="name"
                className="block w-full border border-blue-600 outline-emerald-800 px-3 py-2 text-sm rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white mb-4"
              />

              <label
                htmlFor="name"
                className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1"
              >
                Enter Total ICU Beds:
              </label>
              <input
                type="text"
                value={totalicubeds}
                onChange={(e) => setTotalicubeds(e.target.value)}
                id="name"
                className="block w-full border border-blue-600 outline-emerald-800 px-3 py-2 text-sm rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white mb-4"
              />

              <label
                htmlFor="name"
                className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1"
              >
                Enter Available ICU Beds:
              </label>
              <input
                type="text"
                value={avaliableicubeds}
                onChange={(e) => setavaliableicubeds(e.target.value)}
                id="name"
                className="block w-full border border-blue-600 outline-emerald-800 px-3 py-2 text-sm rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white mb-4"
              />

              <label
                htmlFor="name"
                className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1"
              >
                Enter Total Ventilators:
              </label>
              <input
                type="text"
                value={totalventilators}
                onChange={(e) => setTotalventilators(e.target.value)}
                id="name"
                className="block w-full border border-blue-600 outline-emerald-800 px-3 py-2 text-sm rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white mb-4"
              />

              <label
                htmlFor="name"
                className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1"
              >
                Enter Available Ventilators:
              </label>
              <input
                type="text"
                value={availableventilators}
                onChange={(e) => setAvailableventilators(e.target.value)}
                id="name"
                className="block w-full border border-blue-600 outline-emerald-800 px-3 py-2 text-sm rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white mb-4"
              />
                  <div className="flex gap-4 mb-3">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="status"
                    value="Available"
                    checked={status === "Available"}
                    onChange={(e) => setStatus(e.target.value)}
                  />
                  Available
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="status"
                    value="Notavailable"
                    checked={status === "Notavailable"}
                    onChange={(e) => setStatus(e.target.value)}
                  />
                  Not Available
                </label>
              </div>

              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-600 transition rounded-md text-white font-semibold text-sm sm:text-md shadow-md"
                onClick={addfacility}
              >
                Add +
              </button>
            </form>
          </div>
          <br></br>

          {/* Card Section (Right) */}
          <div className="flex-1 bg-white dark:bg-gray-800 shadow-md p-6 rounded-md border border-gray-300">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Facility List
            </h2>

            {facilitylist.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {facilitylist.map((item, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 shadow-md rounded-xl p-5 hover:shadow-lg transition"
                  >
                     <img
                    src={item.hospitals2?.photo}
                    alt="hospital"
                    className="w-24 h-24 rounded-full border-2 border-white shadow-md object-cover"
                  />
                    <h3 className="text-lg font-bold text-blue-700 dark:text-blue-300 mb-2">Hospital: 
                       {item.hospitals2.name}
                    </h3>
                    <h3 className="text-lg font-bold text-red-700 dark:text-blue-300 mb-2">Facility: 
                      {item.facilityname}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                      <strong>Disease:</strong> {item.diseases1?.diseasename}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                      <strong>Description:</strong> {item.diseases1?.description}
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

                    
                    <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                      <div className="bg-white dark:bg-gray-600 p-2 rounded shadow-sm">
                        <strong>Total Beds:</strong> {item.totalbeds}
                      </div>
                      <div className="bg-white dark:bg-gray-600 p-2 rounded shadow-sm">
                        <strong>Available:</strong> {item.availablebeds}
                      </div>
                      <div className="bg-white dark:bg-gray-600 p-2 rounded shadow-sm">
                        <strong>ICU Total:</strong> {item.totalicubeds}
                      </div>
                      <div className="bg-white dark:bg-gray-600 p-2 rounded shadow-sm">
                        <strong>ICU Avail:</strong> {item.avaliableicubeds}
                      </div>
                      <div className="bg-white dark:bg-gray-600 p-2 rounded shadow-sm">
                        <strong>Ventilators:</strong> {item.totalventilators}
                      </div>
                      <div className="bg-white dark:bg-gray-600 p-2 rounded shadow-sm">
                        <strong>Available:</strong> {item.availableventilators}
                      </div>
                      
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-400">No Facilities added yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
